import { useRouter } from "next/router";
import React, { useState, useEffect, useMemo } from "react";
import Header from "../../components/header";
import { client } from "../../lib/sanityClient";
import { AiOutlineInstagram, AiOutlineTwitter } from "react-icons/ai";
import { CgWebsite } from "react-icons/cg";
import { HiDotsVertical } from 'react-icons/hi';
import NFTCard from "../../components/NFTCard";
import ethIcon from '../../assets/ethIcon.svg';
import Image from 'next/image';
import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import { GetStaticPaths } from "next";
import { API_CONF } from '../../lib/serverConf';


const style = {
    bannerImageContainer: `h-[20vh] w-screen overflow-hidden flex justify-center items-center pt-[70px]`,
    bannerImage: `w-full object-cover`,
    infoContainer: `w-screen px-4`,
    midRow: `w-full flex justify-center text-white`,
    endRow: `w-full flex justify-end text-white`,
    profileImg: `w-40 h-40 object-cover rounded-full border-2 border-[#202225] mt-[-4rem]`,
    socialIconsContainer: `flex text-3xl mb-[-2rem]`,
    socialIconsWrapper: `w-44`,
    socialIconsContent: `flex container justify-between text-[1.4rem] border-2 rounded-lg px-2`,
    socialIcon: `my-2`,
    divider: `border-r-2`,
    title: `text-5xl font-bold mb-4`,
    createdBy: `text-lg mb-4`,
    statsContainer: `w-[44vw] flex justify-between py-4 border border-[#151b22] rounded-xl mb-4`,
    collectionStat: `w-1/4`,
    statValue: `text-3xl font-bold w-full flex items-center justify-center`,
    ethLogo: `h-6 mr-2`,
    statName: `text-lg w-full text-center mt-1`,
    description: `text-[#8a939b] text-xl w-max-1/4 flex-wrap mt-4`,
}

const Collection = () => {
    const router = useRouter();
    const { slug, collectionType }: any = router.query;
    const [collection, setCollection]: any = useState({});
    // const nftCollectionModule = useNFTCollection(collectionId);
    // const marketPlaceModule = useMarketplace('0xbbaF1C300a7C51c56a29852a745a36DA34e577cB');
    const [nfts, setNfts]: any = useState([]);
    // const [listings, setListings]: any = useState([]);
    const { t } = useTranslation('collection');
    const listings: [] = [];

    // useEffect(() => {
    //     if (!marketPlaceModule) return;
    //     ; (async () => {
    //         setListings(await marketPlaceModule.getAll());
    //     })()
    // }, [marketPlaceModule]);

    // useEffect(() => {
    //     if (!listings || !nftCollectionModule) return;
    //     ; (async () => {
    //         const collectionNFTs = await nftCollectionModule.getAll();
    //         let filteredListings = listings.filter((o1: any) => collectionNFTs.some(o2 => o1.asset.name === o2.metadata.name));
    //         const nfts = filteredListings.map(((listing: any) => {
    //             return {
    //                 ...listing.asset,
    //                 id: listing.id
    //             }
    //         }));
    //         setNfts(nfts);
    //     })();
    // }, [listings, nftCollectionModule]);



    // const fetchCollectionData = async (sanityClient = client) => {
    //     const query = `*[_type == "marketItems" && contractAddress == "${collectionId}" ] {
    //       "imageUrl": profileImage.asset->url,
    //       "bannerImageUrl": bannerImage.asset->url,
    //       volumeTraded,
    //       createdBy,
    //       contractAddress,
    //       "creator": createdBy->userName,
    //       title, floorPrice,
    //       "allOwners": owners[]->,
    //       description
    //     }`

    //     const collectionData = await sanityClient.fetch(query);

    //     // the query returns 1 object inside of an array
    //     await setCollection(collectionData[0]);
    // }

    const fetchOpenseaCollectionData = async () => {
        const collectionData = await fetch(`${API_CONF.base}/api/opensea/collections/${slug}`).then(response => response.json());
        await setCollection(collectionData.collection);
    }

    const fetchOpenseaCollectionAssets = async () => {
        const nfts = await fetch(`${API_CONF.base}/api/opensea/assets?collection=${slug}&limit=20`).then(response => response.json());
        await setNfts(nfts.assets);
        console.log(nfts.assets);
    }

    useEffect(() => {
        fetchOpenseaCollectionData();
        fetchOpenseaCollectionAssets();
    }, [slug]);

    

    return (
        <div className="overflow-hidden">
            <Header />
            <div className={style.bannerImageContainer}>
                <img
                    className={style.bannerImage}
                    src={
                        collection?.banner_image_url
                            ? collection.banner_image_url
                            : 'https://via.placeholder.com/200'
                    }
                    alt="banner"
                />
            </div>
            <div className={style.infoContainer}>
                <div className={style.midRow}>
                    <img
                        className={style.profileImg}
                        src={
                            collection?.image_url
                                ? collection.image_url
                                : 'https://via.placeholder.com/200'
                        }
                        alt="profile image"
                    />
                </div>
                <div className={style.endRow}>
                    <div className={style.socialIconsContainer}>
                        <div className={style.socialIconsWrapper}>
                            <div className={style.socialIconsContent}>
                                <div className={style.socialIcon}>
                                    <CgWebsite />
                                </div>
                                <div className={style.divider} />
                                <div className={style.socialIcon}>
                                    <AiOutlineInstagram />
                                </div>
                                <div className={style.divider} />
                                <div className={style.socialIcon}>
                                    <AiOutlineTwitter />
                                </div>
                                <div className={style.divider} />
                                <div className={style.socialIcon}>
                                    <HiDotsVertical />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.title}>{collection?.name}</div>
                </div>
                <div className={style.midRow}>
                    <div className={style.createdBy}>
                        {t('createdBy')}{' '}
                        <span className="text-[#2081e2]">{collection?.creator}</span>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.statsContainer}>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>{collection?.stats?.count}</div>
                            <div className={style.statName}>{t('items')}</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                {collection?.stats?.num_owners ? collection?.stats?.num_owners : ''}
                            </div>
                            <div className={style.statName}>{t('owners')}</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                <Image
                                    src={ethIcon}
                                    alt="eth"
                                    className={style.ethLogo}
                                    height={20} width={30}
                                />
                                {(Math.round(collection?.stats?.floor_price * 100) / 100).toFixed(2)}
                                
                            </div>
                            <div className={style.statName}>{t('floorPrice')}</div>
                        </div>
                        <div className={style.collectionStat}>
                            <div className={style.statValue}>
                                <Image
                                    src={ethIcon}
                                    alt="eth"
                                    className={style.ethLogo}
                                    height={20} width={30}
                                />
                                {(Math.round(collection?.stats?.total_volume) / 100).toFixed(2)}K
                                
                            </div>
                            <div className={style.statName}>{t('volumeTraded')}</div>
                        </div>
                    </div>
                </div>
                <div className={style.midRow}>
                    <div className={style.description}>{collection?.description}</div>
                </div>
            </div>
            <div className="flex flex-wrap ">
                {nfts?.map((nftItem: any, id: any) => (
                    <NFTCard
                        key={id}
                        nftItem={nftItem}
                        title={collection?.title}
                        listings={listings}
                    />
                ))}
            </div>
        </div>
    );
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...await serverSideTranslations(locale, ['header', 'collecion', 'nftCard']),
    },
});

export default Collection;