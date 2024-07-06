import getClientData from "./getClientData";

const getToken = async () => {
    console.log("getToken function called");
    const client_key = localStorage.getItem('client_id');
    const client_secret = localStorage.getItem('client_secret');
    if (!client_key || !client_secret) {
        getClientData();
        return;
    }
    const results: Response = (await fetch('https://accounts.spotify.com/api/token', { 
        method: 'POST', 
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_key + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    }));
    const data = await results.json();
    localStorage.setItem('spotify_access_token', data.access_token);
}

const getSearch = async (query: string, type: Array<string>): Promise<any> => {
    if (localStorage.getItem('spotify_access_token')) {
        if (query && type) {
            const body: URLSearchParams = new URLSearchParams();
            body.append('q', query);
            body.append('type', type.join(','));
            const results: Response = (await fetch(`https://api.spotify.com/v1/search?` + new URLSearchParams({
                q: query,
                type: type + ',track',
            }), {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('spotify_access_token')
                },
                
            }));
            if (results.status === 200) {
                const data: Promise<any> = await results.json();           
                return data;
            }
        }
    }
}

const getArtist = async (id: string | undefined): Promise<any> => {
    return getRequest(id, `https://api.spotify.com/v1/artists/${id}`);
}

const getArtistTracks = async (id: string | undefined): Promise<any> => {
    return getRequest(id, `https://api.spotify.com/v1/artists/${id}/top-tracks`);
};

const getArtistAlbums = async (id: string | undefined): Promise<any> => {
    return getRequest(id, `https://api.spotify.com/v1/artists/${id}/albums`);
};

const getTrack = async (id: string | undefined): Promise<any> => {
    return getRequest(id, `https://api.spotify.com/v1/tracks/${id}`);
}


const getRequest = async (id: string | undefined, url: string): Promise<any> => {
    if (!id) {
        console.log("No ID provided");
        return false;
    }
    if (localStorage.getItem('spotify_access_token') == null) {
        getToken();
    }
    const results: Response = (await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('spotify_access_token')
        }
    }));
    if (results.status === 200) {
        const data: Promise<any> = await results.json();
        return data;
    }
    return false;
}

const getAlbum = async (id: string | undefined): Promise<any> => {
    return getRequest(id, `https://api.spotify.com/v1/albums/${id}`);
}

const getArtistImage = async (id: string | undefined): Promise<any> => {
    const data = await getArtist(id);
    if (!data) {
        return false
    }
    return data.images[0].url;
}

 
export { getToken, getSearch, getArtist, getArtistTracks, getArtistAlbums, getTrack, getAlbum, getArtistImage};
