import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtistLoading, selectArtists} from "./artistSlice.ts";
import Spinner from '../../UI/Spinner/Spinner.tsx';
import {Button, Grid, Typography} from '@mui/material';
import {apiUrl} from "../../../globalConstants.ts";
import {fetchAllArtists} from "./artistThunk.ts";
import {useEffect} from "react";
import { Link } from "react-router-dom";

const Artist = () => {
    const dispatch = useAppDispatch()
    const artists = useAppSelector(selectArtists)
    const loading = useAppSelector(selectArtistLoading)

    useEffect(() => {
        dispatch(fetchAllArtists())
    }, [dispatch])

    return (
        <>
            {loading ? <Spinner /> :
                (artists.length === 0 ?
                        <Typography variant='h4' color='textDisabled'>No artists</Typography> :
                        <Grid container direction='row' spacing={3} mt={2}>
                            {artists.map((artist, index) => (
                                <Button key={index}  component={Link} to={`/albums/${artist._id}`} style={{ display: "flex", flexDirection: "column", border: '1px solid green', width: '20%', marginBottom: '10px', gap: '20px', color: 'black' }}>
                                    {artist.image ?
                                        <Grid sx={{ width: '200px', height: '200px' }}>
                                            <img src={apiUrl + '/' + artist.image} alt={artist.name} style={{ width: '100%', height: '100%' }} />
                                        </Grid>
                                        : null}

                                    <Grid sx={{ flexGrow: '1' }}>
                                        <Typography variant='h5' fontWeight='bold'>
                                            {artist.name}
                                        </Typography>
                                    </Grid>
                                </Button>
                            ))}
                        </Grid>
                )}
        </>

    );
};

export default Artist;