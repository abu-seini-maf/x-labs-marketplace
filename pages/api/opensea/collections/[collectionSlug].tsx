import type { NextApiRequest, NextApiResponse } from 'next';
import { conf } from '../../../../lib/openseaAPIConfig';

const getOpenSeaCollection = async (
    slug: string) => {
    const options = {
        method: 'GET',
    };
    const url = `${conf.baseURL}collection/${slug}`;
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
    const slug = req.query.collectionSlug;
    const collections = await getOpenSeaCollection(slug as string);
    // console.log(collections);
    res.status(200).json(collections);
}