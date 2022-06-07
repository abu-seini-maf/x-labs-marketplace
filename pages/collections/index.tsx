import Header from "../../components/header";
import React, { useState, useEffect, useMemo } from "react";
import { client } from "../../lib/sanityClient";
import CollectionItem from '../../components/collectionItem';
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const style = {
    wrapper: 'overflow-hidden'
};

const collections = () => {
    const [collections, setCollections]: any = useState([]);

    const fetchCollectionData = async (sanityClient = client) => {
        const query = `*[_type == "marketItems" ] {
          "imageUrl": profileImage.asset->url,
          "bannerImageUrl": bannerImage.asset->url,
          volumeTraded,
          createdBy,
          contractAddress,
          "creator": createdBy->userName,
          title, floorPrice,
          "allOwners": owners[]->,
          description
        }`;

        const collectionData = await sanityClient.fetch(query);
        await setCollections(collectionData);
    }

    useEffect(() => {
        fetchCollectionData();
    }, []);

    return (
        <div className={style.wrapper}>
            <Header />

            <div className="flex flex-wrap pt-[70px] justify-center items-center">
            {collections.map((collection: any) => (
                <CollectionItem key={collection.contractAddress}
                address={collection.contractAddress}
                bannerImage={collection.bannerImageUrl}
                profileImage={collection.imageUrl}
                title={collection.title}
                description={collection.description}
                creator={collection.creator} />
            ))}
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