import {createAsyncThunk} from "@reduxjs/toolkit";
import {IArtist} from "../../types";
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