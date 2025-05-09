import {useState} from "react";
import {Button, Grid, TextField} from "@mui/material";
import {toast} from "react-toastify";
import FileInput from "../../../../UI/FileInput/FileInput.tsx";
import { ArtistMutation } from "../../../../types";

interface Props {
    onSubmitArtist: (artist: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({onSubmitArtist}) => {
    const [form, setForm] = useState<ArtistMutation>({
        name: '',
        image: '',
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!form.name.trim() || !form.image ) {
            toast.error('All fields are required');
            return;
        }
        onSubmitArtist({...form})
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
                        style={{width: '100%'}}
                        id="name"
                        label="Name"
                        name="name"
                        value={form.name}
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

export default ArtistForm;