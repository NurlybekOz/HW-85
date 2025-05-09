import {Typography} from "@mui/material";
import {AlbumMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import AlbumForm from "./components/AlbumForm/AlbumForm.tsx";
import {createAlbum} from "./albumThunk.ts";

const NewAlbum = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewAlbum = async (album: AlbumMutation) => {
        try {
            await dispatch(createAlbum(album)).unwrap();
            toast.success("Album was successfully created!");
            navigate('/');
        } catch (e) {
            toast.error("Album was not successfully created");
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New Album
            </Typography>
            <AlbumForm onSubmitAlbum={onCreateNewAlbum}/>
        </>
    );
};

export default NewAlbum;