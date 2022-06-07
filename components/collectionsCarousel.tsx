import React, { useEffect, useState } from "react";
import { useTranslation } from 'next-i18next';
import CollectionItem from "./collectionItem";

const style = {
    wrapper: `relative`,
    // container: `before:content-[''] before:bg-red-500 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://lh3.googleusercontent.com/ujepnqpnL0nDQIHsWxlCXzyw4pf01yjz1Jmb4kAQHumJAPrSEj0-e3ABMZlZ1HEpJoqwOcY_kgnuJGzfXbd2Tijri66GXUtfN2MXQA=s250')] before:bg-cover before:bg-center before:opacity-30 before:blur`,
    contentWrapper: `flex h-screen relative justify-start flex-wrap items-start p-16`,
    // copyContainer: `w-1/2`,
    // title: `relative text-white text-[46px] font-semibold`,
    // description: `text-[#8a939b] container-[400px] text-2xl mt-[0.8rem] mb-[2.5rem]`,
    // ctaContainer: `flex`,
    // accentedButton: ` relative text-lg font-semibold px-12 py-4 bg-[#2181e2] rounded-lg mr-5 text-white hover:bg-[#42a0ff] cursor-pointer`,
    // button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
    // cardContainer: `rounded-[3rem]`,
    // infoContainer: `h-20 bg-[#313338] p-4 rounded-b-lg flex items-center text-white`,
    // author: `flex flex-col justify-center ml-4`,
    // name: ``,
    // infoIcon: `flex justify-end items-center flex-1 text-[#8a939b] text-3xl font-bold`,
    sectionHeader: `font-bold text-[#ffffff] text-4xl`,
    collectionsContainer: `self-center justify-self-center text-[#ffffff] flex flex-wrap`,
    loading: `font-bold text-[#ffffff] text-2xl`
}

const CollectionsCarousel = ({ collections }: any) => {
    // console.log(collections);

    return (
        <section className={style.wrapper}>
            <div className={style.contentWrapper}>
                <h4 className={style.sectionHeader}>
                    OpenSea Collections
                </h4>
                <div className={style.collectionsContainer}>
                    {collections?.map((collection: any, id: any) => (
                        <>
                            {/* <div key={id}>
                                {collection.name}
                            </div> */}
                            <CollectionItem key={collection?.collection?.slug}
                                address={collection?.collection?.slug}
                                bannerImage={collection?.collection?.banner_image_url}
                                profileImage={collection?.collection?.image_url}
                                title={collection?.collection?.name}
                                description={collection?.collection?.description}
                                creator={collection?.collection?.slug}
                                type='opensea' />
                        </>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CollectionsCarousel;