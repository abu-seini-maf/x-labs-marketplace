import Link from "next/link";
import Image from 'next/image';
import React from "react";
import xlabsLogo from "../assets/x-labsLogo.svg";
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';
import { useTranslation } from 'next-i18next';
import { MdOutlineLanguage } from 'react-icons/md';
import { useRouter } from "next/router";

const style = {
    wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex justify-between fixed z-10`,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
    searchBar: `flex flex-1 mx-[0.8rem] max-w-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    headerItems: ` flex items-center justify-end`,
    headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
    headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
}

const Header = () => {
    const { t } = useTranslation('header');
    const router = useRouter();

    const changeLocale = () => {
        const currentLocale = router.locale;
        const body = document.querySelector("body");
        if (body) {
            if (currentLocale === "ar") {
                body.dir = "ltr";
            } else {
                body.dir = "rtl";
            }
        }
        router.push(router.asPath, router.asPath, { locale: currentLocale === 'ar' ? 'en' : 'ar' });
    };

    return (
        <div className={style.wrapper}>
            <Link href="/">
                <div className={style.logoContainer}>
                    <Image src={xlabsLogo} height={40} width={100} />
                    {/* <div className={style.logoText}>X Labs</div> */}
                </div>
            </Link>
            <div className={style.searchBar}>
                <div className={style.searchIcon}>
                    <AiOutlineSearch />
                </div>
                <input
                    className={style.searchInput}
                    placeholder={t('searchPlaceHolder')}
                />
            </div>
            <div className={style.headerItems}>
                <Link href="/collections">
                    <div className={style.headerItem}> {t('collections')} </div>
                </Link>
                <Link href="/opensea-collections">
                    <div className={style.headerItem}> opensea {t('collections')} </div>
                </Link>
                {/* <div className={style.headerItem}> Resources </div>
                <div className={style.headerItem}> Create </div> */}
                <div className={style.headerIcon}>
                    <CgProfile />
                </div>
                <div className={style.headerIcon}>
                    <MdOutlineAccountBalanceWallet />
                </div>
                <div className={style.headerIcon} onClick={() => {
                    changeLocale();
                }}>
                    <MdOutlineLanguage />
                </div>
            </div>
        </div>
    )
};

export default Header;