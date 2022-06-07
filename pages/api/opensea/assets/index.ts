import type { NextApiRequest, NextApiResponse } from 'next';
import { conf, adjustdQueryParams } from '../../../../lib/openseaAPIConfig';

const getOpenSeaAssets = async (
    _owner: string = '', _token_ids: string[] = [], _asset_contract_address: string = '', _asset_contract_addresses: string[] = [],
    _order_by: string = '', _order_direction: string = '', _offset: number = 0, _limit: number = 10, _collection: string = '', _include_orders: string = 'false') => {
    const options = {
        method: 'GET',
    };
    const queryParams = {
        owner: _owner, // the address of the owner of the assets
        token_ids: _token_ids, // An array of token IDs to search for (e.g. ?token_ids=1&token_ids=209). Will return a list of assets with token_id matching any of the IDs in this array.
        asset_contract_address: _asset_contract_address, // The NFT contract address for the assets
        asset_contract_addresses: _asset_contract_addresses, // An array of contract addresses to search for (e.g. ?asset_contract_addresses=0x1...&asset_contract_addresses=0x2...). Will return a list of assets with contracts matching any of the addresses in this array. If "token_ids" is also specified, then it will only return assets that match each (address, token_id) pairing, respecting order.
        order_by: _order_by, // How to order the assets returned. By default, the API returns the fastest ordering. Options you can set are sale_date (the last sale's transaction's timestamp), sale_count (number of sales), and sale_price (the last sale's total_price)
        order_direction: _order_direction, // Can be asc for ascending or desc for descending
        offset: _offset, // Offset
        limit: _limit, // Limit. Defaults to 20, capped at 50.
        collection: _collection, // Limit responses to members of a collection. Case sensitive and must match the collection slug exactly. Will return all assets from all contracts in a collection. For more information on collections, see our collections documentation.
        include_orders: _include_orders // A flag determining if order information should be included in the response. Note: As of May 25, orders from the Seaport contract will be returned in the seaport_sell_orders field, instead of the sell_orders field. Please refer to the Seaport Order model for schema details.
    };
    const url = `${conf.baseURL}assets` + adjustdQueryParams(queryParams);
    // console.log('url');
    // console.log(url);
    const response =
        await fetch(url, options)
            .then(response => response.json())
            .catch(err => console.error(err));
    return response;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    const ownerQuery: string = req.query.owner?.toString();
    const tokenIdsQuery: string[] = req.query.tokenIds?.toString().split(',');
    const contractAddressQuery: string = req.query.contactAddress?.toString();
    const contractAddressesQuery: string[] = req.query.tokenIds?.toString().split(',');
    // const orderByQuery: 'sale_date' | 'sale_count' | 'sale_price' = req.query.contactAddress?.toString();
    const orderByQuery: string = req.query.contactAddress?.toString();
    // const orderDirectionQuery: 'asc' | 'desc' = req.query.orderDirection?.toString();
    const orderDirectionQuery: string = req.query.orderDirection?.toString();
    const offsetQuery: number = parseInt(req.query.offset?.toString());
    const limitQuery: number = parseInt(req.query.limit?.toString());
    const collectionQuery: string = req.query.collection?.toString();
    const includeOrdersQuery: string = req.query.includeOrders?.toString();;


    const assets = await getOpenSeaAssets(ownerQuery, tokenIdsQuery, contractAddressQuery, contractAddressesQuery, orderByQuery, orderDirectionQuery,
        offsetQuery, limitQuery, collectionQuery, includeOrdersQuery);
    res.status(200).json(assets);
}