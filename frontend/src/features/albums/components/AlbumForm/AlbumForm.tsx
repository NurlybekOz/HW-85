import {useEffect, useState} from "react";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {AlbumMutation} from "../../../../types";
import {selectArtistLoading, selectArtists} from "../../../artists/artistSlice.ts";
import FileInput from "../../../../UI/FileInput/FileInput.tsx";
import {fetchAllArtists} from "../../../artists/artistThunk.ts";

interface Props {
    onSubmitAlbum: (album: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({onSubmitAlbum}) => {
    const [form, setForm] = useState<AlbumMutation>({
        title: '',
        artist: '',
        image: '',
        createdDate: '',
    })
    const artists = useAppSelector(selectArtists);
    const artistsLoading = useAppSelector(selectArtistLoading)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllArtists())
    }, [])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim() || !form.artist.trim() || !form.image ) {
            toast.error('All fields are required');
            return;
        }
        onSubmitAlbum({...form})
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target

        if (files) {
            setForm(prevState => ({...prevState, [name]: files[0]}))
        }
    }

    return (
        <form onSubmit={onSubmit} style={{ width: "75%", margin: "0 auto"}}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        select
                        disabled={artistsLoading}
                        style={{width: '100%'}}
                        id="artist"
                        label="Artist"
                        value={form.artist}
                        name='artist'
                        onChange={onInputChange}
                    >
                        <MenuItem defaultValue='' disabled>Select artist</MenuItem>
                        {artists.map(artist => (
                            <MenuItem value={artist._id} key={artist._id}>{artist.name}</MenuItem>
                        ))}
                    </TextField>
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="createdDate"
                        label="Created Date"
                        name="createdDate"
                        value={form.createdDate}
                        onChange={onInputChange}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name='image'
                        label='Image'
                        onChange={fileInputChangeHandler}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button style={{width: '100%'}} type="submit" color="primary" variant="contained">
                        Create
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default AlbumForm;