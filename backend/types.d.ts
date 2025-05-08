export interface ArtistWithoutId {
    name: string;
    image: string | null;
    information: string;
}
export interface IArtist {
    name: string;
    image: string | null;
    isPublished: boolean;
    information: string;
}
export interface IAlbum {
    title: string;
    artist: Artist;
    isPublished: boolean;
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
    isPublished: boolean;
}
export interface TrackWithoutId {
    title: string;
    album: string;
    duration: string;
    trackCount: number;

}
export interface UserFields {
    username: string;
    password: string;
    role: string;
    token: string;
}