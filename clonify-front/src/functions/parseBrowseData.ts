import { Track, ArtistShort, Album, Artist, Playlist } from './spotifyTypes';

function parseTracks(searchResults: Array<any>) : Array<Track> {
    const res: Array<Track> = [];
    searchResults.forEach((track: any) => {
        const artistList: Array<ArtistShort> = [];
        track.artists.forEach((artist: any) => {
            const artistObj: ArtistShort = {
                id: artist.id,
                name: artist.name,
            };
            if (artist.images) {
                artistObj.image = artist.images[0].url;
            }
            artistList.push(artistObj);
        });
        const trackObj: Track = {
            id: track.id,
            name: track.name,
            album: track.album.name,
            artists: artistList,
            duration_ms: track.duration_ms,
        };
        if (track.album.images) {
            trackObj.image = track.album.images[0].url;
        }
        res.push(trackObj);
    })
    return res;
}


function parseArtists(searchResults: Array<any>) : Array<Artist> {
    const res: Array<Artist> = [];
    searchResults.forEach((artist: any) => {
        const artistObj: Artist = {
            id: artist.id,
            name: artist.name,
            genres: artist.genres,
            popularity: artist.popularity,
        };
        if (artist.images && artist.images.length > 0) {
            artistObj.image = artist.images[0].url;
        }
        res.push(artistObj);
    });
    return res;
}

function parseAlbums(searchResults: Array<any>) : Array<Album> {
    const res: Array<Album> = [];
    searchResults.forEach((album: any) => {
        const artistList: Array<string> = [];
        album.artists.forEach((artist: any) => {
            artistList.push(artist.name);
        });
        const albumObj: Album = {
            id: album.id,
            name: album.name,
            type: album.album_type,
            artists: artistList,
            release_date: album.release_date,
        };
        if (album.images) {
            albumObj.image = album.images[0].url;
        }
        res.push(albumObj);
    });
    return res;
}

function parsePlaylists(searchResults: Array<any>) : Array<Playlist> {
    const res: Array<Playlist> = [];
    searchResults.forEach((playlist: any) => {
        const playlistObj: Playlist = {
            id: playlist.id,
            name: playlist.name,
            owner: playlist.owner.display_name,
        };
        if (playlist.images) {
            playlistObj.image = playlist.images[0].url;
        }
        res.push(playlistObj);
    });
    return res;
}

export { parseTracks, parseAlbums, parseArtists, parsePlaylists }