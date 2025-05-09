import {Typography} from "@mui/material";
import {TrackMutation} from "../../types";
import {useAppDispatch} from "../../app/hooks.ts";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import TrackForm from "./components/TrackForm/TrackForm.tsx";
import {createTrack} from "./trackThunk.ts";

const NewTrack = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const onCreateNewTrack= async (track: TrackMutation) => {
        try {
            await dispatch(createTrack(track)).unwrap();
            toast.success("Track was successfully created!");
            navigate('/');
        } catch (e) {
            toast.error("Track was not successfully created");
            console.error(e);
        }
    };

    return (
        <>
            <Typography variant="h4" style={{textAlign: "center", marginBottom: "20px"}}>
                New Track
            </Typography>
            <TrackForm onSubmitTrack={onCreateNewTrack}/>
        </>
    );
};

export default NewTrack;