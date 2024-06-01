import React from 'react';
import { Avatar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/Users/usersThunks';
import { useAppDispatch } from '../App/hooks';
import { apiUrl } from '../constants';
import {UserTypes} from "../types";

interface Props {
    user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toProfile = () => {
        navigate(`/photos/${user._id}`);
    };

    return (
        <>
            <Typography component="div" sx={{mr: 2}}>
                <div onClick={toProfile}>
                    Здравствуйте, {user.displayName}!
                </div>
            </Typography>
            <Typography component="div">
                <div onClick={handleLogout}>Logout</div>
            </Typography>
            {user.avatar ? <Avatar src={`${apiUrl}/${user.avatar}`} sx={{ ml: 2 }} /> : <Avatar sx={{ ml: 2 }} />}
        </>
    );
};

export default UserMenu;
