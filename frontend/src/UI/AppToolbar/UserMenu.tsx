import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink, useNavigate} from "react-router-dom";
import { User } from "../../types";
import { useAppDispatch } from "../../app/hooks";
import {logout} from "../../features/users/UserThunks.ts";
import {unsetUser} from "../../features/users/UserSlice.ts";
import {toast} from "react-toastify";

interface Props {
    user: User
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null)
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    }

    const handleClose = () => {
        setUserOptionsEl(null);
    }
    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUser());
        navigate('/')
        toast.success("You have been logged out");
    }
    return (
        <>
            <Button onClick={handleClick} color='inherit'>
                Hello, {user.username}
            </Button>
            <Menu
                keepMounted
                anchorEl={userOptionsEl}
                open={Boolean(userOptionsEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <Button component={NavLink} to='/track_history'>Track History</Button>
                </MenuItem>
                <MenuItem>
                    <Button component={NavLink} to='/albums/new'>Add new Album</Button>
                </MenuItem>
                <MenuItem>
                    <Button component={NavLink} to='/tracks/new'>Add new Track</Button>
                </MenuItem>
                <MenuItem>
                    <Button component={NavLink} to='/artists/new'>Add new Artist</Button>
                </MenuItem>
                <MenuItem>
                    <Button onClick={handleLogout}>Logout</Button>
                </MenuItem>
            </Menu>



        </>
    );
};

export default UserMenu;