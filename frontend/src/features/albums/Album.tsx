import {useAppDispatch, useAppSelector} from "../../app/hooks.ts";
import Spinner from '../../UI/Spinner/Spinner.tsx';
import {Button, Grid, Typography} from '@mui/material';
import {apiUrl} from "../../../globalConstants.ts";
import {useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {selectAlbumLoading, selectAlbums} from "./albumSlice.ts";
import {deleteAlbum, fetchAllAlbums, patchAlbum} from "./albumThunk.ts";
import {selectArtistById, selectArtists} from "../artists/artistSlice.ts";
import {fetchArtistById} from "../artists/artistThunk.ts";
import { selectUser } from "../users/UserSlice.ts";

const Album = () => {
    const {id} = useParams();
    const dispatch = useAppDispatch()
    const albums = useAppSelector(selectAlbums)
    const artists = useAppSelector(selectArtists)
    const loading = useAppSelector(selectAlbumLoading)
    const artist = useAppSelector(selectArtistById)
    const user = useAppSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
          if (id) {
              dispatch(fetchAllAlbums(id))
              dispatch(fetchArtistById(id))
          }
    }, [dispatch, artists, id])


    const isAdmin = user?.role === 'admin';


    const handleDelete = async (AlbumId: string) => {
        if (id) {
            await dispatch(deleteAlbum(AlbumId))
            dispatch(fetchAllAlbums(id))
            navigate(`/albums/${id}`)

        }
    }
    const handlePatch = async (AlbumId: string) => {
        if (id) {
            await dispatch(patchAlbum(AlbumId))
            dispatch(fetchAllAlbums(id))
            navigate(`/albums/${id}`)
        }
    }

    return (
        <>
            {loading ? <Spinner /> :
                (albums.length === 0 ?
                        <Typography variant='h4' color='textDisabled' mt={2}>No albums</Typography> :

                        <Grid container direction='column' spacing={3} mt={2}>
                            {artist && (
                                <Typography variant='h4' fontWeight='bold' align="center">
                                    {artist.name}
                                </Typography>
                            )}

                            {albums.map((album, index) => {

                                if (!album.isPublished && !isAdmin) {
                                    return null;
                                }

                                return (
                                    <Button key={index} component={Link} to={`/tracks/${album._id}`} style={{ display: "flex", flexDirection: "column", border: '1px solid green', width: '20%', marginBottom: '10px', gap: '20px', color: 'black' }}>
                                        {album.image ?
                                            <Grid sx={{ width: '200px', height: '200px' }}>
                                                <img src={apiUrl + '/' + album.image} alt={album.title} style={{ width: '100%', height: '100%' }} />
                                            </Grid>
                                            : null}

                                        <Grid sx={{ flexGrow: '1' }}>
                                            <Typography variant='h5' fontWeight='bold'>
                                                {album.title}
                                            </Typography>
                                        </Grid>

                                        {isAdmin && !album.isPublished &&
                                            <Button onClick={() => handlePatch(album._id)} variant='contained' color='success'>Publish</Button>
                                        }
                                        {isAdmin && album.isPublished &&
                                            <Button onClick={() => handleDelete(album._id)} variant='contained' color='error'>Delete</Button>
                                        }

                                        <Typography variant='caption' fontWeight='bold'>
                                            {album.createdDate}
                                        </Typography>
                                    </Button>
                                );
                            })}
                        </Grid>
                )}
        </>
    );
};

export default Album;