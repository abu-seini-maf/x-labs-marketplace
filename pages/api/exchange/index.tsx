import type { NextApiRequest, NextApiResponse } from 'next';

// bfca0d19-4adf-4132-a8e6-caae5c10b239 = API key
// https://pro-api.coinmarketcap.com/v1
//  key header name = X-CMC_PRO_API_KEY
// API to use: /v1/tools/price-conversion


const getExchangeRate = async (amount: string, symbol: string, convert: string) => {
    const options = {
        method: 'GET',
        headers: {
            'CMC_PRO_API_KEY': 'bfca0d19-4adf-4132-a8e6-caae5c10b239'
        }
    };
    const url = `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?amount=${amount}&symbol=${symbol}&convert=${convert}&CMC_PRO_API_KEY=bfca0d19-4adf-4132-a8e6-caae5c10b239`;
    const response =
        await fetch(url, options)
            .then(response => response.json())
            .catch(err => console.error(err));
    
    return response;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const amountQuery = req.query.amount?.toString();
    const idQuery = req.query.id;
    const symbolQuery = req.query.symbol?.toString();
    const timeQuery = req.query.time;
    const convertQuery = req.query.convert?.toString();
    // const convertQuery = 'BTC,USD,AED,JOD,ETH,SOL';
    const converIdQuery = req.query.convert_id;

    const collections = await getExchangeRate(amountQuery, symbolQuery, convertQuery);
    res.status(200).json(collections);
}