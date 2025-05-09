import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Spinner from '../../UI/Spinner/Spinner.tsx';
import {Button, Grid, ListItem, Typography} from '@mui/material';
import {useEffect} from "react";
import { useParams} from "react-router-dom";
import {selectTrackLoading, selectTracks} from "./trackSlice.ts";
import {deleteTrack, fetchAllTracks, patchTrack} from "./trackThunk.ts";
import {fetchAlbumById} from "../albums/albumThunk.ts";
import {selectAlbumById} from "../albums/albumSlice.ts";
import {fetchArtistById} from "../artists/artistThunk.ts";
import {selectArtistById} from "../artists/artistSlice.ts";
import {addTrackToHistory} from "../trackHistory/trackHistoryThunk.ts";
import {selectUser} from "../users/UserSlice.ts";

const Track = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const tracks = useAppSelector(selectTracks)
    const loading = useAppSelector(selectTrackLoading)
    const album = useAppSelector(selectAlbumById)
    const artist = useAppSelector(selectArtistById)
    const user = useAppSelector(selectUser)


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

    const isAdmin = user?.role === 'admin';

    const handleDelete = async (TrackId: string) => {
        if (id) {
            await dispatch(deleteTrack(TrackId))
            dispatch(fetchAllTracks(id))
        }
    }
    const handlePatch = async (TrackId: string) => {
        if (id) {
            await dispatch(patchTrack(TrackId))
            dispatch(fetchAllTracks(id))
        }
    }
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
                                if (!track.isPublished && !isAdmin) {
                                    return null;
                                }
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
                                        {user ?
                                            <Button onClick={() => dispatch(addTrackToHistory(track._id))}>Play</Button>
                                            : null
                                        }
                                        {isAdmin && !track.isPublished &&
                                            <Button onClick={() => handlePatch(track._id)} variant='contained' color='success'>Publish</Button>
                                        }
                                        {isAdmin && track.isPublished &&
                                            <Button onClick={() => handleDelete(track._id)} variant='contained' color='error'>Delete</Button>
                                        }
                                    </ListItem>
                                );
                            })}
                        </Grid>
                )}
        </>
    );
};

export default Track;