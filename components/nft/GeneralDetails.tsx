import { AiFillHeart } from 'react-icons/ai';
import { MdRefresh } from 'react-icons/md';
import { RiShareBoxLine } from 'react-icons/ri';
import { FiMoreVertical } from 'react-icons/fi';
import { GiShare } from 'react-icons/gi';
import { useEffect, useState } from 'react';
import { client } from "../../lib/sanityClient";
import { useTranslation } from 'next-i18next';

const style = {
    wrapper: `flex`,
    infoContainer: `h-36 flex flex-col flex-1 justify-between mb-6`,
    accent: `text-[#2081e2]`,
    nftTitle: `text-3xl font-extrabold`,
    otherInfo: `flex`,
    ownedBy: `text-[#8a939b] mr-4`,
    likes: `flex items-center text-[#8a939b]`,
    likeIcon: `mr-1`,
    actionButtonsContainer: `w-44`,
    actionButtons: `flex container justify-between text-[1.4rem] border-2 rounded-lg`,
    actionButton: `my-2`,
    divider: `border-r-2`,
}

const GeneralDetails = ({ selectedNft }: any) => {
    
    const [collection, setCollection]: any = useState({});
    const NFTCollectionAddress = selectedNft?.assetContractAddress;
    const { t } = useTranslation('nft');

    const fetchCollectionData = async (sanityClient = client) => {
        const query = `*[_type == "marketItems" && contractAddress == "${NFTCollectionAddress}" ] {
          "imageUrl": profileImage.asset->url,
          "bannerImageUrl": bannerImage.asset->url,
          volumeTraded,
          createdBy,
          contractAddress,
          "creator": createdBy->userName,
          title, floorPrice,
          "allOwners": owners[]->,
          description
        }`

        const collectionData = await sanityClient.fetch(query);

        // the query returns 1 object inside of an array
        await setCollection(collectionData[0]);
    }

    useEffect(() => {
        fetchCollectionData();
    }, [NFTCollectionAddress]);

    return (
        <div className={style.wrapper}>
            <div className={style.infoContainer}>
                <div className={style.accent}>{collection?.title}</div>
                <div className={style.nftTitle}>{selectedNft?.asset.name}</div>
                <div className={style.otherInfo}>
                    <div className={style.ownedBy}>
                        {t('createdBy')} <span className={style.accent}>{collection?.creator}</span>
                    </div>
                    {/* <div className={style.likes}>
                        <AiFillHeart className={style.likeIcon} /> 2.3K favorites
                    </div> */}
                </div>
            </div>
            <div className={style.actionButtonsContainer}>
                <div className={style.actionButtons}>
                    <div className={`${style.actionButton} ml-2`}>
                        <MdRefresh />
                    </div>
                    <div className={style.divider} />
                    <div className={style.actionButton}>
                        <RiShareBoxLine />
                    </div>
                    <div className={style.divider} />
                    <div className={style.actionButton}>
                        <GiShare />
                    </div>
                    <div className={style.divider} />
                    <div className={`${style.actionButton} mr-2`}>
                        <FiMoreVertical />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GeneralDetails;