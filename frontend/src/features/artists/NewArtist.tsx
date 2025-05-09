import {Typography} from "@mui/material";
import {ArtistMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createArtist} from "./artistThunk.ts";
import ArtistForm from "./components/ArtistForm/ArtistForm.tsx";

const NewArtist = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewArtist = async (artist: ArtistMutation) => {
        try {
            await dispatch(createArtist(artist)).unwrap();
            toast.success("Artist was successfully created!");
            navigate('/');
        } catch (e) {
            toast.error("Artist was not successfully created");
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New Artist
            </Typography>
            <ArtistForm onSubmitArtist={onCreateNewArtist}/>
        </>
    );
};

export default NewArtist;