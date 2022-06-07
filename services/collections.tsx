import { dictionary } from '../lib/openseaAPIConfig';
import { of, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { API_CONF } from '../lib/serverConf';

export const getAllfeaturedCollections = async () =>  {
    return forkJoin(
        dictionary.map(item => {
            const request = fetch(`${API_CONF.base}/api/opensea/collections/${item.slug}`).then(response => response.json());
            // request.then(res => console.log(res));
            return request;
        })
    );
}

export const getCollectionBasedonType = async (type: string, limit?: number) => {
    const filteredDictionary = dictionary.filter(item => item.type === type).slice(0,limit);
    return forkJoin(
        filteredDictionary.map(item => {
            return fetch(`${API_CONF.base}/api/opensea/collections/${item.slug}`).then(response => response.json());
        })
    );
}