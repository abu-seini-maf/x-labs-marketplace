import { useEffect, useState } from 'react';
import { HiTag } from 'react-icons/hi';
import { IoMdWallet } from 'react-icons/io';
import toast, { Toaster } from 'react-hot-toast';
import { useAddress } from '@thirdweb-dev/react';
import { useTranslation } from 'next-i18next';
import ExchangeConvertor from './ExchangeConvertor';

const style = {
    button: `mr-8 flex items-center py-2 px-12 rounded-lg cursor-pointer`,
    buttonIcon: `text-xl`,
    buttonText: `ml-2 text-lg font-semibold`,
}

const MakeOffer = ({ isListed, selectedNft, listings, marketPlaceModule }: any) => {
    const [selectedMarketNft, setSelectedMarketNft]: any = useState();
    const [enableButton, setEnableButton] = useState(false);
    const address = useAddress();
    const { t } = useTranslation('nft');

    useEffect(() => {
        if (!listings || isListed === 'false') return
            ; (async () => {
                setSelectedMarketNft(
                    listings.find((marketNft: any) => marketNft?.id === selectedNft?.id)
                )
            })()
    }, [selectedNft, listings, isListed]);

    useEffect(() => {
        if (!selectedMarketNft || !selectedNft) return

        setEnableButton(true)
    }, [selectedMarketNft, selectedNft]);

    const confirmPurchase = (toastHandler = toast) =>
        toastHandler.success(t('purchaseSuccess'), {
            style: {
                background: '#04111d',
                color: '#fff',
            },
        });

    const showPurchaseFaliure = (toastHandler = toast) =>
        toastHandler.error(t('purchaseError'), {
            style: {
                background: '#04111d',
                color: '#fff',
            },
        });

    const buyItem = async (
        listingId: number = Number(selectedMarketNft?.id),
        quantityDesired = 1,
        module = marketPlaceModule
    ) => {
        // console.log(address);
        await module
            .buyoutListing(listingId, quantityDesired)
            .then((success: any) => {
                console.log(success);
                confirmPurchase();
            })
            .catch((error: any) => {
                console.error(error);
                showPurchaseFaliure();
            });
    };

    return (
        <div className="flex h-20 w-full items-center rounded-lg border border-[#151c22] bg-[#303339] px-12 justify-between">
            <Toaster position="top-center" reverseOrder={false} />
            <div className='mx-[20px]'>
                {t('price')} <span>
                    {selectedNft?.buyoutCurrencyValuePerToken.displayValue} {selectedNft?.buyoutCurrencyValuePerToken.symbol}
                </span>
                <ExchangeConvertor currentPrice={selectedNft?.buyoutCurrencyValuePerToken.displayValue} currentCoin={selectedNft?.buyoutCurrencyValuePerToken.symbol} />
            </div>
            {isListed === 'true' ? (
                <>
                    <div
                        onClick={() => {
                            enableButton ? buyItem(Number(selectedMarketNft.id), 1) : null
                        }}
                        className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}
                    >
                        <IoMdWallet className={style.buttonIcon} />
                        <div className={style.buttonText}>{t('buyNow')}</div>
                    </div>
                    <div
                        className={`${style.button} border border-[#151c22]  bg-[#363840] hover:bg-[#4c505c]`}
                    >
                        <HiTag className={style.buttonIcon} />
                        <div className={style.buttonText}>{t('makeOffer')}</div>
                    </div>
                </>
            ) : (
                <div className={`${style.button} bg-[#2081e2] hover:bg-[#42a0ff]`}>
                    <IoMdWallet className={style.buttonIcon} />
                    <div className={style.buttonText}>{t('listItem')}</div>
                </div>
            )}
        </div>
    );
}

export default MakeOffer;
