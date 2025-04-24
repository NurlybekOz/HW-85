import {createAsyncThunk} from "@reduxjs/toolkit";
import {IAlbum} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllAlbums = createAsyncThunk<IAlbum[], string>(
    'albums/fetchAllAlbums',
    async (artistId) => {
        const response = await axiosApi<IAlbum[]>('/albums?artist=' + artistId)
        return response.data || [];
    }
)
export const fetchAlbumById = createAsyncThunk<IAlbum, string>(
    'artists/fetchAlbumById',
    async (id) => {
        const response = await axiosApi<IAlbum>(`/albums/${id}`)
        return response.data || {};
    }
)