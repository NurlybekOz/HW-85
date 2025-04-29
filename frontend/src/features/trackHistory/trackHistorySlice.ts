import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {ITrackHistory} from "../../types";
import {addTrackToHistory, fetchTrackHistory} from "./trackHistoryThunk.ts";

interface TrackState {
    items: ITrackHistory[];
    fetchLoading: boolean;
}

const initialState: TrackState = {
    items: [],
    fetchLoading: false,
}

export const trackHistorySlice = createSlice({
    name: "trackHistory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTrackHistory.pending, (state) => {
            state.fetchLoading = true;
        }).addCase(fetchTrackHistory.fulfilled, (state, {payload: tracks}) => {
            state.items = tracks;
            state.fetchLoading = false;
        }).addCase(fetchTrackHistory.rejected, (state) => {
            state.fetchLoading = false;
        })

            .addCase(addTrackToHistory.pending, (state) => {
                state.fetchLoading = false;
            }).addCase(addTrackToHistory.fulfilled, (state) => {
            state.fetchLoading = false;
            }).addCase(addTrackToHistory.rejected, (state) => {
            state.fetchLoading = false;
             })



    }
})

export const tracksHistoryReducer = trackHistorySlice.reducer;
export const selectTracksHistory = (state: RootState) => state.trackHistory.items;
export const selectTracksHistoryLoading = (state: RootState) => state.trackHistory.fetchLoading;
