import { Container, Typography } from '@mui/material';
import './App.css'
import AppToolbar from './UI/AppToolbar/AppToolbar';
import {Route, Routes} from 'react-router-dom';
import Artist from "./features/artists/Artist.tsx";
import Album from "./features/albums/Album.tsx";
import Track from "./features/tracks/Track.tsx";

const App = () => (
    <>
        <header>
            <AppToolbar/>
        </header>
        <main>
            <Container>
                <Routes>
                    <Route path="/" element={<Artist/>}/>
                    <Route path="/artists" element={<Artist/>}/>
                    <Route path="/albums/:id" element={<Album/>}/>
                    <Route path="/tracks/:id" element={<Track/>}/>
                    <Route path="*" element={<Typography variant="h4">Not found page</Typography>}/>
                </Routes>
            </Container>
        </main>
    </>
);

export default App
