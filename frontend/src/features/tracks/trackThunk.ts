import {createAsyncThunk} from "@reduxjs/toolkit";
import {ITrack, TrackMutation} from "../../types";
import axiosApi from "../../axiosApi.ts";

export const fetchAllTracks = createAsyncThunk<ITrack[], string>(
    'tracks/fetchAllTracks',
    async (albumId) => {
        const response = await axiosApi<ITrack[]>('/tracks?album=' + albumId)
        return response.data || [];
    }
)
export const createTrack = createAsyncThunk<
    void,
    TrackMutation
>(
    'tracks/createTrack',
    async (trackToAdd) => {
        const response = await axiosApi.post('/tracks', trackToAdd)
        return response.data;
    }
    )

export const patchTrack = createAsyncThunk<
    void,
    string
>(
    'tracks/patchTrack',
    async (trackId) => {
        const response = await axiosApi.patch(`/admin/tracks/${trackId}`)
        return response.data;
    }
)
export const deleteTrack = createAsyncThunk<
    void,
    string
>(
    'tracks/deleteTrack',
    async (trackId) => {
        const response = await axiosApi.delete(`/admin/tracks/${trackId}`)
        return response.data;
    }
)

