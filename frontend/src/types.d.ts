export interface IArtist {
    _id: string;
    name: string;
    image: string | null;
    information: string;
}
export interface IAlbum {
    _id: string;
    title: string;
    artist: string;
    createdDate: string;
    image: string | null;
}

export interface ITrack {
    _id: string;
    title: string;
    album: string;
    duration: string;
    trackCount: number;
}