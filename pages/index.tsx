import type { NextPage } from 'next';
// import Head from 'next/head'
// import Image from 'next/image'
import Header from '../components/header';
import Hero from '../components/hero';
import { useEffect, useState } from 'react';
import { client } from '../lib/sanityClient';
import toast, { Toaster } from 'react-hot-toast';
import { useAddress, useDisconnect, useMetamask } from '@thirdweb-dev/react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import CollectionsCarousel from '../components/collectionsCarousel';
import { getAllfeaturedCollections } from '../services/collections';

const style = {
  wrapper: ``,
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  button: `border border-[#282b2f] bg-[#2081e2] p-[0.8rem] text-xl font-semibold rounded-lg cursor-pointer text-black`,
  details: `text-lg text-center text=[#282b2f] font-semibold mt-4`,
}

const Home: NextPage = () => {
  const address = useAddress();
  const connectWallet  = useMetamask();
  // const disconnectWallet = useDisconnect();
  const router = useRouter();
  const { t } = useTranslation('common');
  const featuredCollections =  getAllfeaturedCollections();

  const welcomeUser = (userName: string, toastHandler = toast) => {
    toastHandler.success(
      `${t('welcomeBack')}${userName !== 'Unnamed' ? ` ${userName}` : ''}!`,
      {
        style: {
          background: '#04111d',
          color: '#fff',
        },
      }
    )
  }

  useEffect(() => {
    if (!address) return;
    ;(async () => {
      const userDoc = {
        _type: 'users',
        _id: address,
        userName: 'Unnamed',
        walletAddress: address,
      }

      const result = await client.createIfNotExists(userDoc);

      welcomeUser(result.userName);
    })()
  }, [address]);

  // useEffect(() => {
  //   if (!router.locale) return;
  //   const newLocale = router.locale;
  //   const body = document.querySelector("body");
  //   if (body) {
  //     if (newLocale === "ar") {
  //       body.dir = "rtl";
  //     } else {
  //       body.dir = "ltr";
  //     }
  //   }
  //   router.push(router.pathname, router.pathname, { locale: newLocale });
  // }, [router]);

  const [collections, setCollections] = useState([]);

  useEffect(() => {
    ;(async () => {
      // const collectionData: any = await fetch('api/opensea/collections').then(response => response.json());
      // setCollections(collectionData.collections);
      // const collectionData: any = getAllfeaturedCollections();
      // setCollections(collectionData.collection);
      // console.log('collectionData index ');
      // console.log(collectionData);
      (await featuredCollections).subscribe((result: any) => {
        setCollections(result);
      });
      
    })();
}, []);

  return (
    <div className={style.wrapper}>
      <Toaster position="top-center" reverseOrder={false} />
      {address ? (
        <>
          <Header />
          <Hero />
          <CollectionsCarousel collections={collections}/>
        </>
      ) : (
        <div className={style.walletConnectWrapper}>
          <button
            className={style.button}
            onClick={() => connectWallet()}
          >
            {t('connectWallet')}
          </button>
          <div className={style.details}>
            {t('youNeedChrome')}
            <br /> {t('runApp')}
          </div>
        </div>
      )}
    </div>
  )
}

export const getStaticProps = async ({ locale } :any) => ({
  props: {
    ...await serverSideTranslations(locale, ['common', 'header', 'hero']),
  },
})

export default Home
