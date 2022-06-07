import { Listbox, Transition } from '@headlessui/react'
import { useState, Fragment, useEffect } from 'react';
import { API_CONF } from '../../lib/serverConf';

const classNames = (...classes: any) => {
    return classes.filter(Boolean).join(' ');
}
const coins = [
    { id: 1, name: 'BTC' },
    { id: 2, name: 'USD' },
    { id: 3, name: 'AED' },
    { id: 4, name: 'JOD' },
    { id: 5, name: 'ETH' },
    { id: 6, name: 'SOL' },
];

const ExchangeConvertor = ({currentPrice, currentCoin}: any) => {
    const currentNFTPrice = currentPrice;
    const currentSymbol = currentCoin;
    const [selected, setSelected] = useState(coins[3]);
    const [conversion, setConversion] = useState(0);

    const getExchangeRate = async (convertTo: string, currentPrice: string, currentSymbol: string) => {
        const exchange = await fetch(`${API_CONF.base}/api/exchange?amount=${currentPrice}&symbol=${currentSymbol}&convert=${convertTo}`).then(response => response.json());
        await setConversion(exchange.data.quote[convertTo].price);
    }

    useEffect(() => {
        if (!currentNFTPrice || !currentSymbol || !selected) return;
        getExchangeRate(selected.name, currentNFTPrice, currentSymbol);
    }, [selected, currentNFTPrice, currentSymbol]);

    return (
        <>
        <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
                <>
                    <Listbox.Label className="block text-sm font-medium text-white">Convert to</Listbox.Label>
                    <div className="mt-1 relative">
                        <Listbox.Button className="relative w-full bg-[#363840] border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-[#2081e2] focus:border-[#2081e2] sm:text-sm">
                            <span className="flex items-center">
                                <span className="ml-3 block truncate">{selected.name}</span>
                            </span>
                            <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                {/* <SelectorIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute z-10 mt-1 w-full bg-[#363840] shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {coins.map((coin) => (
                                    <Listbox.Option
                                        key={coin.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-white bg-[#2081e2]' : 'text-white',
                                                'cursor-default select-none relative py-2 pl-3 pr-9'
                                            )
                                        }
                                        value={coin}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <div className="flex items-center">
                                                    <span
                                                        className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                    >
                                                        {coin.name}
                                                    </span>
                                                </div>

                                                {selected ? (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4'
                                                        )}
                                                    >
                                                        {/* <CheckIcon className="h-5 w-5" aria-hidden="true" /> */}
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
        <span>
        {(Math.round(conversion * 100) / 100).toFixed(2)} {selected.name}
        </span>
        </>
    );
}

export default ExchangeConvertor;