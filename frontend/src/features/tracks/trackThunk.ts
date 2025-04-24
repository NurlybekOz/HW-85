import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITrack} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllTracks = createAsyncThunk<ITrack[], string>(
    'tracks/fetchAllTracks',
    async (albumId) => {
        const response = await axiosApi<ITrack[]>('/tracks?album=' + albumId)
        return response.data || [];
    }
)