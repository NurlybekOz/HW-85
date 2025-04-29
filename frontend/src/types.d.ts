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
export interface RegisterMutation {
    username: string;
    password: string;
}

export interface User {
    _id: string;
    username: string;
    token: string;
}

export interface ValidationError {
    errors: {
        [key: string]: {
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}
export interface LoginMutation {
    username: string;
    password: string;
}
export interface GlobalError {
    error: string;
}
export interface ITrackHistory {
    _id: string;
    track: ITrack;
    datetime: string;
}