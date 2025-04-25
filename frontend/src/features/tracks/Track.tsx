import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Spinner from '../../UI/Spinner/Spinner.tsx';
import { Grid, ListItem, Typography} from '@mui/material';
import {useEffect} from "react";
import { useParams} from "react-router-dom";
import {selectTrackLoading, selectTracks} from "./trackSlice.ts";
import {fetchAllTracks} from "./trackThunk.ts";
import {fetchAlbumById} from "../albums/albumThunk.ts";
import {selectAlbumById} from "../albums/albumSlice.ts";
import {fetchArtistById} from "../artists/artistThunk.ts";
import {selectArtistById} from "../artists/artistSlice.ts";

const Track = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const tracks = useAppSelector(selectTracks)
    const loading = useAppSelector(selectTrackLoading)
    const album = useAppSelector(selectAlbumById)
    const artist = useAppSelector(selectArtistById)


    useEffect(() => {
        if (id) {
            dispatch(fetchAllTracks(id))
            dispatch(fetchAlbumById(id))
        }
    }, [id, dispatch])

    useEffect(() => {
        if (album) {
            dispatch(fetchArtistById(album.artist))
        }
    }, [dispatch, album])


    return (
        <>
            {loading ? <Spinner /> :
                (tracks.length === 0 ?
                        <Typography variant='h4' color='textDisabled' mt={2}>No tracks</Typography> :
                        <Grid container direction='column' spacing={3} mt={2}>
                            {album && artist &&
                                <Typography variant='h4' fontWeight='bold' align="center">
                                    {artist.name} - {album.title}
                                </Typography>
                            }

                            {tracks.map((track, index) => {

                                return (
                                    <ListItem key={index} style={{ display: "flex", flexDirection: "column", border: '1px solid green', width: '20%', marginBottom: '10px', gap: '20px' }}>

                                        <Grid sx={{ flexGrow: '1' }}>
                                            <Typography variant='h5' fontWeight='bold'>
                                                {track.title}
                                            </Typography>
                                        </Grid>

                                        <Typography variant='caption' fontWeight='bold'>
                                            {track.duration} - {track.trackCount}
                                        </Typography>
                                    </ListItem>
                                );
                            })}
                        </Grid>
                )}
        </>
    );
};

export default Track;