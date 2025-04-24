import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {ITrack} from "../../types";
import {fetchAllTracks} from "./trackThunk.ts";

interface TrackState {
    items: ITrack[];
    fetchLoading: boolean;
}

const initialState: TrackState = {
    items: [],
    fetchLoading: false,
}

export const trackSlice = createSlice({
    name: "tracks",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllTracks.pending, (state) => {
            state.fetchLoading = true;
        }).addCase(fetchAllTracks.fulfilled, (state, {payload: tracks}) => {
            state.items = tracks;
            state.fetchLoading = false;
        }).addCase(fetchAllTracks.rejected, (state) => {
            state.fetchLoading = false;
        })

    }
})

export const tracksReducer = trackSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTrackLoading = (state: RootState) => state.tracks.fetchLoading;
