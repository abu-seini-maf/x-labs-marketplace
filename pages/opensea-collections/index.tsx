import Header from "../../components/header";
import React, { useState, useEffect, useMemo } from "react";
import { client } from "../../lib/sanityClient";
import CollectionItem from '../../components/collectionItem';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { getCollectionBasedonType } from '../../services/collections';

const style = {
    wrapper: 'overflow-hidden',
    contentWrapper: `p-16 pt-[100px]`,
    sectionHeader: `font-bold text-[#ffffff] text-4xl`,
};

const collections = () => {
    const cultrureCollectionSub = getCollectionBasedonType('culture', 4);
    const fashionCollectionSub = getCollectionBasedonType('fashion', 4);
    const lifestyleCollectionSub = getCollectionBasedonType('lifestyle', 4);
    const [cultureCollections, setCultureCollections]: any = useState([]);
    const [fashionCollections, setFashionCollections]: any = useState([]);
    const [lifestyleCollections, setLifestyleCollections]: any = useState([]);

    useEffect(() => {
        ; (async () => {
            (await lifestyleCollectionSub).subscribe((res: any) => { setLifestyleCollections(res) });
            (await cultrureCollectionSub).subscribe(res => setCultureCollections(res));
            (await fashionCollectionSub).subscribe(res => setFashionCollections(res));
        })();
    }, []);

    return (
        <div className={style.wrapper}>
            <Header />
            <div className={style.contentWrapper}>
                <h4 className={style.sectionHeader}>
                    Lifestyle Collections
                </h4>
                <div className="flex flex-wrap pt-[30px] pb-[70px] items-center">
                    {lifestyleCollections.map((collection: any) => (
                        <CollectionItem key={collection?.collection?.slug}
                            address={collection?.collection?.slug}
                            bannerImage={collection?.collection?.banner_image_url}
                            profileImage={collection?.collection?.image_url}
                            title={collection?.collection?.name}
                            description={collection?.collection?.description}
                            creator={collection?.collection?.slug}
                            type='opensea' />
                    ))}
                </div>

                <h4 className={style.sectionHeader}>
                    Culture Collections
                </h4>
                <div className="flex flex-wrap pt-[30px] pb-[70px] items-center">
                    {cultureCollections.map((collection: any) => (
                        <CollectionItem key={collection?.collection?.slug}
                            address={collection?.collection?.slug}
                            bannerImage={collection?.collection?.banner_image_url}
                            profileImage={collection?.collection?.image_url}
                            title={collection?.collection?.name}
                            description={collection?.collection?.description}
                            creator={collection?.collection?.slug}
                            type='opensea' />
                    ))}
                </div>

                <h4 className={style.sectionHeader}>
                    Fashion Collections
                </h4>
                <div className="flex flex-wrap pt-[30px] pb-[70px] items-center">
                    {fashionCollections.map((collection: any) => (
                        <CollectionItem key={collection?.collection?.slug}
                            address={collection?.collection?.slug}
                            bannerImage={collection?.collection?.banner_image_url}
                            profileImage={collection?.collection?.image_url}
                            title={collection?.collection?.name}
                            description={collection?.collection?.description}
                            creator={collection?.collection?.slug}
                            type='opensea' />
                    ))}
                </div>
            </div>

        </div>
    );
};

export const getStaticProps = async ({ locale }: any) => ({
    props: {
        ...await serverSideTranslations(locale, ['header', 'collection']),
    },
});

export default collections;