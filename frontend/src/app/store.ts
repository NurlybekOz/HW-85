import {combineReducers, configureStore} from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage'
import {FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE, persistReducer, persistStore} from "redux-persist";
import {artistsReducer} from "../features/artists/artistSlice.ts";
import {albumsReducer} from "../features/albums/albumSlice.ts";
import {tracksReducer} from "../features/tracks/trackSlice.ts";
import {usersReducer} from "../features/users/UserSlice.ts";
import {tracksHistoryReducer} from "../features/trackHistory/trackHistorySlice.ts";


const usersPersistConfig = {
    key: 'store: Users',
    storage,
    whitelist: ['user'],
};

const rootReducer = combineReducers({
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
    trackHistory: tracksHistoryReducer,
    users: persistReducer(usersPersistConfig, usersReducer)
})

export const store = configureStore({
    reducer:
    rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
