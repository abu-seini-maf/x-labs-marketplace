import Header from '../../components/header';
import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import NFTImage from '../../components/nft/NFTImage';
import GeneralDetails from '../../components/nft/GeneralDetails';
import ItemActivity from '../../components/nft/ItemActivity';
import Purchase from '../../components/nft/Purchase';
import { useMarketplace, useNFTCollection } from '@thirdweb-dev/react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetStaticPaths } from 'next';

const style = {
    wrapper: `flex flex-col items-center container-lg text-[#e5e8eb] pt-[70px]`,
    container: `container p-6`,
    topContent: `flex`,
    nftImgContainer: `flex-1 mr-4`,
    detailsContainer: `flex-[2] ml-4`,
}

const Nft = () => {
    const [selectedNft, setSelectedNft] = useState();
    const [listings, setListings]: any = useState([]);
    const router = useRouter();
    const marketPlaceModule = useMarketplace('0xbbaF1C300a7C51c56a29852a745a36DA34e577cB');

    useEffect(() => {
        if (!marketPlaceModule) return
            ; (async () => {
                setListings(await marketPlaceModule.getAll());
            })()
    }, [marketPlaceModule]);

    useEffect(() => {
        if (!listings) return;
        ; (async () => {
            const nfts = listings;
            const selectedNftItem = nfts.find((nft: any) => nft.id === router.query.nftId);
            setSelectedNft(selectedNftItem);
        })()
    }, [listings]);

    return (
        <div>
            <Header />
            <div className={style.wrapper}>
                <div className={style.container}>
                    <div className={style.topContent}>
                        <div className={style.nftImgContainer}>
                            <NFTImage selectedNft={selectedNft} />
                        </div>
                        <div className={style.detailsContainer}>
                            <GeneralDetails selectedNft={selectedNft} />
                            <Purchase
                                isListed={router.query.isListed}
                                selectedNft={selectedNft}
                                listings={listings}
                                marketPlaceModule={marketPlaceModule}
                            />
                        </div>
                    </div>
                    <ItemActivity />
                </div>
            </div>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

    return {
        paths: [], //indicates that no page needs be created at build time
        fallback: 'blocking' //indicates the type of fallback
    }
}

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...await serverSideTranslations(locale, ['header', 'nft']),
    },
});

export default Nft;