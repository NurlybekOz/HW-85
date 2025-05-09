import {useEffect, useState} from "react";
import {Button, Grid, MenuItem, TextField} from "@mui/material";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "../../../../app/hooks.ts";
import {TrackMutation} from "../../../../types";
import {selectAlbumLoading, selectAlbums} from "../../../albums/albumSlice.ts";
import {fetchAllAlbums} from "../../../albums/albumThunk.ts";

interface Props {
    onSubmitTrack: (track: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({onSubmitTrack}) => {
    const [form, setForm] = useState<TrackMutation>({
        title: '',
        album: '',
        duration: '',
        trackCount: 0,
    })
    const albums = useAppSelector(selectAlbums);
    const albumsLoading = useAppSelector(selectAlbumLoading)
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchAllAlbums(null))
    }, [])

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.title.trim() || !form.duration.trim() || !form.album || !form.trackCount ) {
            toast.error('All fields are required');
            return;
        }
        onSubmitTrack({...form})
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target
        setForm({...form, [name]: value})
    }

    return (
        <form onSubmit={onSubmit} style={{ width: "75%", margin: "0 auto"}}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        select
                        disabled={albumsLoading}
                        style={{width: '100%'}}
                        id="album"
                        label="Album"
                        value={form.album}
                        name='album'
                        onChange={onInputChange}
                    >
                        <MenuItem defaultValue='' disabled>Select Album</MenuItem>
                        {albums.map(album => (
                            <MenuItem value={album._id} key={album._id}>{album.title}</MenuItem>
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
                        id="duration"
                        label="Duration"
                        name="duration"
                        value={form.duration}
                        onChange={onInputChange}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{width: '100%'}}
                        id="trackCount"
                        label="Track Count"
                        name="trackCount"
                        type="number"
                        value={form.trackCount}
                        onChange={onInputChange}
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

export default TrackForm;