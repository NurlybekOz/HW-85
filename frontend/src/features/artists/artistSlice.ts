import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {IArtist} from "../../types";
import {fetchAllArtists, fetchArtistById} from "./artistThunk.ts";

interface ArtistState {
    items: IArtist[];
    item: IArtist | null;
    fetchLoading: boolean;
}

const initialState: ArtistState = {
    items: [],
    item: null,
    fetchLoading: false,
}

export const artistSlice = createSlice({
    name: "artists",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllArtists.pending, (state) => {
            state.fetchLoading = true;
        })
            .addCase(fetchAllArtists.fulfilled, (state, {payload: artists}) => {
            state.items = artists;
            state.fetchLoading = false;
        })
            .addCase(fetchAllArtists.rejected, (state) => {
            state.fetchLoading = false;
        })


            .addCase(fetchArtistById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchArtistById.fulfilled, (state, {payload: artist}) => {
                state.fetchLoading = false;
                state.item = artist
            })
            .addCase(fetchArtistById.rejected, (state) => {
            state.fetchLoading = false;
            })
    }
})

export const artistsReducer = artistSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistById = (state: RootState) => state.artists.item;
export const selectArtistLoading = (state: RootState) => state.artists.fetchLoading;
