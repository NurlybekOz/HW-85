import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Spinner from '../../UI/Spinner/Spinner.tsx';
import {Grid, ListItem, Typography} from '@mui/material';
import {useEffect} from "react";
import {selectAlbumById} from "../albums/albumSlice.ts";
import {fetchArtistById} from "../artists/artistThunk.ts";
import {selectTracksHistory, selectTracksHistoryLoading} from "./trackHistorySlice.ts";
import {fetchTrackHistory} from "./trackHistoryThunk.ts";
import dayjs from "dayjs";

const TrackHistory = () => {
    const dispatch = useAppDispatch()
    const tracks = useAppSelector(selectTracksHistory)
    const loading = useAppSelector(selectTracksHistoryLoading)
    const album = useAppSelector(selectAlbumById)


    useEffect(() => {
        dispatch(fetchTrackHistory())
    },  [dispatch])

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

                            {tracks.map((track, index) => {

                                return (
                                    <ListItem key={index} style={{ display: "flex", flexDirection: "column", border: '1px solid green', width: '20%', marginBottom: '10px', gap: '20px' }}>
                                        <Grid sx={{ flexGrow: '1' }}>
                                            <Typography variant='h5' fontWeight='bold'>
                                                {track.track.album.artist.name}
                                            </Typography>
                                            <Typography variant='caption' fontWeight='bold'>
                                                {track.track.title} - {dayjs(track.datetime).format('DD.MM.YYYY HH:mm')}

                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                );
                            })}
                        </Grid>
                )}
        </>
    );
};

export default TrackHistory;