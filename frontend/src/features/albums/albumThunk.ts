import {createAsyncThunk} from "@reduxjs/toolkit";
import {AlbumMutation, IAlbum} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllAlbums = createAsyncThunk<IAlbum[], string | null>(
    'albums/fetchAllAlbums',
    async (artistId) => {
        const url = artistId ? `/albums?artist=${artistId}` : '/albums';
        const response = await axiosApi<IAlbum[]>(url)
        return response.data || [];
    }
)
export const fetchAlbumById = createAsyncThunk<IAlbum, string>(
    'albums/fetchAlbumById',
    async (id) => {
        const response = await axiosApi<IAlbum>(`/albums/${id}`)
        return response.data || {};
    }
)

export const createAlbum = createAsyncThunk<
    void,
    AlbumMutation
>(
    'albums/createAlbum',
    async (albumToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(albumToAdd) as (keyof AlbumMutation)[];

        keys.forEach(key => {
            const value = albumToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/albums', formData)
    }
)
export const patchAlbum = createAsyncThunk<
    void,
    string
>(
    'albums/patchAlbum',
    async (albumId) => {
        const response = await axiosApi.patch(`/admin/albums/${albumId}`)
        return response.data;
    }
)
export const deleteAlbum = createAsyncThunk<
    void,
    string
>(
    'albums/deleteAlbum',
    async (albumId) => {
        const response = await axiosApi.delete(`/admin/albums/${albumId}`)
        return response.data;
    }
)