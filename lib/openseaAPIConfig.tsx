export const conf = {
    // "baseURL": "https://testnets-api.opensea.io/api/v1/"
    "baseURL": "https://api.opensea.io/api/v1/"
};

export const adjustdQueryParams = (object: any): string => {
    let queryString = '?';
    for (const [key, value] of Object.entries(object)) {
        if (value) {
            if (typeof (value) === 'object' && Array.isArray(value)) {
                value.forEach((ele: string) => {
                    queryString += `${key}=${value}&`;
                });
            } else {
                queryString += `${key}=${value}&`;
            }
        }
    }
    return queryString.slice(0, -1);
}

export const dictionary =
    [
        {
            "name": "Bored Ape Yacht Club",
            "slug": "boredapeyachtclub",
            "type": "culture"
        },
        {
            "name": "World of Women",
            "slug": "world-of-women-nft",
            "type": "culture",
        },
        {
            "name": "RTFKT - MNLTH",
            "slug": "rtfkt-mnlth",
            "type": "fashion",
        },
        {
            "name": "RTKT x Nike: Crypto Kicks",
            "slug": "rtfkt-nike-cryptokicks",
            "type": "fashion",
        },
        {
            "name": "Playboy Rabitars",
            "slug": "playboyrabbitars",
            "type": "lifestyle"
        },
    ];

// export const dictionary = [
//     {
//         "name": "DEGENKIDZ",
//         "slug": "degenkidz",
//         "type": "lifestyle"
//     },
//     {
//         "name": "UninvitedElephant",
//         "slug": "uninvitedelephant-test",
//         "type": "culture"
//     },
//     {
//         "name": "Love Death Robot & AI",
//         "slug": "love-death-robot-ai-vol-1",
//         "type": "culture"
//     },
//     {
//         "name": "The African Beauty Grand",
//         "slug": "the-african-beauty-v3",
//         "type": "fashion"
//     },
//     {
//         "name": "Azuki God V2",
//         "slug": "azuki-god-v2",
//         "type": "fashion"
//     },
//     {
//         "name": "Kith Friends",
//         "slug": "kith-friends-shrxozqjen",
//         "type": "lifestyle"
//     }
// ];