import Router from 'next/router';
import { useTranslation } from 'next-i18next';

const style = {
    wrapper: `bg-[#303339] flex-auto w-[14rem] h-[22rem] my-10 mx-5 rounded-2xl overflow-hidden cursor-pointer max-w-[433px]`,
    imgContainer: `h-1/2 w-full overflow-hidden object-cover`,
    bannerImage: `object-cover w-full`,
    profileImgContainer: ` overflow-hidden  flex justify-center items-center`,
    profileImg: `w-[44px] h-[44px] rounded-full absolute`,
    details: `p-3`,
    info: `flex justify-between text-[#e4e8eb] drop-shadow-xl flex-col items-center mt-[30px]`,
    collectionName: `font-normal text-lg text-[#8a939b]`,
    collectionCreator: `font-semibold text-sm text-[#2081e2]`,
    collectionCreatorSpan: `font-normal text-[#8a939b]`,
    collectionDescription: `font-normal text-lg mt-2 text-center`,

}

const CollectionItem = ({ address, bannerImage, profileImage, title, description, creator, type }: any) => {
    const { t } = useTranslation('collection');

    return (
        <div className={style.wrapper}
            onClick={() => {
                if (type !== 'opensea') {
                    Router.push({
                        pathname: `/collections/${address}`,
                        query: { collectionType: type },
                    })
                } else {
                    Router.push({
                        pathname: `/opensea-collections/${address}`,
                        query: { collectionType: type },
                    })
                }
            }}>
            <div className={style.imgContainer}>
                <img src={bannerImage} alt={title} className={style.bannerImage} />
            </div>
            <div className={style.profileImgContainer}>
                <img src={profileImage} alt={title} className={style.profileImg} />
            </div>
            <div className={style.details}>
                <div className={style.info}>
                    <div className={style.collectionName}>{title}</div>
                    <div className={style.collectionCreator}> <span className={style.collectionCreatorSpan}>{t('by')}</span> {creator} </div>
                    <div className={style.collectionDescription}>{description}</div>
                </div>
            </div>
        </div>
    );
}

export default CollectionItem;