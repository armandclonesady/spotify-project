export type Track = {
    id: string,
    name: string,
    image?: string,
    album?: string,
    artists: Array<any>,
    duration_ms: number,
}

export type Album = {
    id: string,
    name: string,
    type: string,
    artists?: Array<string>,
    tracks?: Array<Track>,
    image?: string,
    release_date: string,
}

export type Artist = {
    
}