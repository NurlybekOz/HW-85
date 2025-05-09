import {createAsyncThunk} from "@reduxjs/toolkit";
import {ArtistMutation, IArtist} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllArtists = createAsyncThunk<IArtist[], void>(
    'artists/fetchAllArtists',
    async () => {
        const response = await axiosApi<IArtist[]>('/artists')
        return response.data || [];
    }
)
export const fetchArtistById = createAsyncThunk<IArtist, string>(
    'artists/fetchArtistById',
    async (id) => {
        const response = await axiosApi<IArtist>(`/artists/${id}`)
        return response.data || {};
    }
)
export const createArtist = createAsyncThunk<
    void,
    ArtistMutation
>(
    'artists/createArtist',
    async (artistToAdd) => {
        const formData = new FormData();
        const keys = Object.keys(artistToAdd) as (keyof ArtistMutation)[];

        keys.forEach(key => {
            const value = artistToAdd[key] as string;
            if (value !== null) {
                formData.append(key, value);
            }
        });

        await axiosApi.post('/artists', formData)
    }
)
export const patchArtist = createAsyncThunk<
    void,
    string
>(
    'artists/patchArtist',
    async (artistId) => {
        const response = await axiosApi.patch(`/admin/artists/${artistId}`)
        return response.data;
    }
)
export const deleteArtist = createAsyncThunk<
    void,
    string
>(
    'artists/deleteArtist',
    async (artistId) => {
        const response = await axiosApi.delete(`/admin/artists/${artistId}`)
        return response.data;
    }
)