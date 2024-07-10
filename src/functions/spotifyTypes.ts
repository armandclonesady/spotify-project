export type Album = {
    id: string,
    name: string,
    type: string,
    artists?: Array<string>,
    tracks?: Array<Track>,
    image?: string,
    release_date?: string,
}

export type Artist = {
    id: string,
    name: string,
    image?: string,
    genres?: Array<string>,
    popularity?: number,
}

export type Playlist = {
    id: string,
    name: string,
    owner: string,  
    image?: string,
}

export type Track = {
    id: string,
    name: string,
    image?: string,
    album?: string,
    artists: Array<any>,
    duration_ms: number,
}

export type ArtistShort = {
    id: string,
    name: string,
    image?: string,
}