export interface IArtist {
    name: string;
    image: string | null;
    information: string;
}
export interface IAlbum {
    title: string;
    artist: Artist;
    createdDate: string;
    image: string | null;
}
export interface AlbumWithoutId {
    title: string;
    artist: string;
    createdDate: string;
    image: string | null;
}
export interface ITrack {
    title: string;
    album: Album;
    duration: string;
    trackCount: number;
}
export interface TrackWithoutId {
    title: string;
    album: string;
    duration: string;
}
export interface UserFields {
    username: string;
    password: string;
    token: string;
}