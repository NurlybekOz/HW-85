import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITrackHistory} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], void>(
    'track_history/fetchTrackHistory',
    async () => {
        const response = await axiosApi<ITrackHistory[]>('/track_history');
        return response.data || [];
    }
);


export const addTrackToHistory = createAsyncThunk<void, string>(
    'track_history/addTrackToHistory',
    async (trackToAdd) => {
        await axiosApi.post('/track_history', {track: trackToAdd});
    }
);