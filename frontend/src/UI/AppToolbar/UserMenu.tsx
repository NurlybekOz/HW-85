import {useState} from "react";
import {Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import { User } from "../../types";

interface Props {
    user: User
}

const UserMenu: React.FC<Props> = ({user}) => {
    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null)

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    }

    const handleClose = () => {
        setUserOptionsEl(null);
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
            </Menu>



        </>
    );
};

export default UserMenu;