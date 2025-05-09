import { Container, Typography } from '@mui/material';
import './App.css'
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Artist from "./features/artists/Artist.tsx";
import Album from "./features/albums/Album.tsx";
import Track from "./features/tracks/Track.tsx";
import Register from "./features/users/Register.tsx";
import Login from './features/users/Login.tsx';
import TracksHistory from "./features/trackHistory/TracksHistory.tsx";
import NewAlbum from "./features/albums/NewAlbum.tsx";
import { selectUser } from './features/users/UserSlice.ts';
import { useAppSelector } from './app/hooks.ts';
import ProtectedRoute from './UI/ProtectedRoute/ProtectedRoute.tsx';
import NewTrack from "./features/tracks/NewTrack.tsx";
import NewArtist from "./features/artists/NewArtist.tsx";

const App = () => {
    const user = useAppSelector(selectUser)
    return (
        <>
            <header>
                < AppToolbar />
            </header>
            <main>
                <Container>
                    <Routes>
                        <Route path="/" element={<Artist/>}/>
                        <Route path="/register" element={<Register/>}/>
                        <Route path="/track_history" element={<TracksHistory/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/albums/new" element={
                            <ProtectedRoute isAllowed={Boolean(user)}>
                                <NewAlbum/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/tracks/new" element={
                            <ProtectedRoute isAllowed={Boolean(user)}>
                                <NewTrack/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/artists/new" element={
                            <ProtectedRoute isAllowed={Boolean(user)}>
                                <NewArtist/>
                            </ProtectedRoute>
                        }/>
                        <Route path="/artists" element={<Artist/>}/>
                        <Route path="/albums/:id" element={<Album/>}/>
                        <Route path="/tracks/:id" element={<Track/>}/>
                        <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                    </Routes>
                </Container>
            </main>
        </>
        )

};

export default App
