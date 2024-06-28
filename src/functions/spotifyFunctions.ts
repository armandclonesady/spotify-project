const getToken = async () => {
    console.log("getToken function called");
    const client_key = localStorage.getItem('client_id');
    const client_secret = localStorage.getItem('client_secret');
    if (!client_key || !client_secret) {
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
    console.log(data);
    localStorage.setItem('spotify_access_token', data.access_token);
}

const getSearch = async (query: string, type: string) => {
    if (localStorage.getItem('spotify_access_token')) {
        console.log("getSearch function called");
        if (query && type) {

            const body: URLSearchParams = new URLSearchParams();
            body.append('q', query);
            body.append('type', type);

            const results: Response = (await fetch(`https://api.spotify.com/v1/search?` + new URLSearchParams({
                q: query,
                type: type
            }), {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('spotify_access_token')
                },
                
            }));

            const data = await results.json();
            return data;
        }
    }
}

export { getToken, getSearch };