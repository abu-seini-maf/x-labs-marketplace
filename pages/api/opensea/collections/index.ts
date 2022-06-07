import type { NextApiRequest, NextApiResponse } from 'next';
import { conf, adjustdQueryParams } from '../../../../lib/openseaAPIConfig';

const getOpenSeaCollections = async (
    _owner: string = '', _offset: number = 10, _limit: number = 10) => {
    const options = {
        method: 'GET',
    };
    const queryParams = {
        asset_owner: _owner, // A wallet address. If specified, will return collections where the owner owns at least one asset belonging to smart contracts in the collection. The number of assets the account owns is shown as owned_asset_count for each collection.
        offset: _offset, // For pagination. Number of contracts offset from the beginning of the result list.
        limit: _limit, // For pagination. Maximum number of contracts to return.
    };
    const url = `${conf.baseURL}collections` + adjustdQueryParams(queryParams);
    
    const response =
        await fetch(url, options)
            .then(response => response.json())
            // .then(response => {return response})
            .catch(err => console.error(err));
    return response;
}


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const collections = await getOpenSeaCollections('', 0, 30);
    res.status(200).json(collections);
}