import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import {selectArtistLoading, selectArtists} from "./artistSlice.ts";
import Spinner from '../../UI/Spinner/Spinner.tsx';
import {Button, Grid, Typography} from '@mui/material';
import {apiUrl} from "../../../globalConstants.ts";
import {deleteArtist, fetchAllArtists, patchArtist} from "./artistThunk.ts";
import {useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {selectUser} from "../users/UserSlice.ts";

const Artist = () => {
    const dispatch = useAppDispatch()
    const artists = useAppSelector(selectArtists)
    const loading = useAppSelector(selectArtistLoading)
    const user = useAppSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchAllArtists())
    }, [dispatch])

    const isAdmin = user?.role === 'admin';

    const handleDelete = async (ArtistId: string) => {
            await dispatch(deleteArtist(ArtistId))
            dispatch(fetchAllArtists())
            navigate('/')
    }
    const handlePatch = async (ArtistId: string) => {
            await dispatch(patchArtist(ArtistId))
            dispatch(fetchAllArtists())
            navigate('/')
    }

    return (
        <>
            {loading ? <Spinner /> :
                (artists.length === 0 ?
                        <Typography variant='h4' color='textDisabled'>No artists</Typography> :
                        <Grid container direction='row' spacing={3} mt={2}>
                            {artists.map((artist, index) => {
                                if (!artist.isPublished && !isAdmin) {
                                return null;
                                }
                                return (
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
                                        {isAdmin && !artist.isPublished &&
                                            <Button onClick={() => handlePatch(artist._id)} variant='contained' color='success'>Publish</Button>
                                        }
                                        {isAdmin && artist.isPublished &&
                                            <Button onClick={() => handleDelete(artist._id)} variant='contained' color='error'>Delete</Button>
                                        }
                                    </Grid>
                                </Button>
                             )
                            })}
                        </Grid>
                )}
        </>

    );
};

export default Artist;