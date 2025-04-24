import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../app/store.ts";
import {IAlbum} from "../../types";
import {fetchAlbumById, fetchAllAlbums} from "./albumThunk.ts";

interface AlbumState {
    items: IAlbum[];
    item: IAlbum | null;
    fetchLoading: boolean;
}

const initialState: AlbumState = {
    items: [],
    item: null,
    fetchLoading: false,
}

export const albumSlice = createSlice({
    name: "albums",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchAllAlbums.pending, (state) => {
            state.fetchLoading = true;
        }).addCase(fetchAllAlbums.fulfilled, (state, {payload: albums}) => {
            state.items = albums;
            state.fetchLoading = false;
        }).addCase(fetchAllAlbums.rejected, (state) => {
            state.fetchLoading = false;
        })


            .addCase(fetchAlbumById.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchAlbumById.fulfilled, (state, {payload: album}) => {
                state.fetchLoading = false;
                state.item = album
            })
            .addCase(fetchAlbumById.rejected, (state) => {
                state.fetchLoading = false;
            })

    }
})

export const albumsReducer = albumSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumById = (state: RootState) => state.albums.item;
export const selectAlbumLoading = (state: RootState) => state.albums.fetchLoading;
