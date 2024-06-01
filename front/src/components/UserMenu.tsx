import React, { useState } from 'react';
import { UserTypes } from '../types';
import { Avatar, Button, Menu, MenuItem, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../features/Users/usersThunks';
import { useAppDispatch } from '../App/hooks';
import { apiUrl } from '../constants';

interface Props {
    user: UserTypes;
}

const UserMenu: React.FC<Props> = ({ user }) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    const toMyCocktails = () => {
        navigate('/myCocktails');
    };

    const toAddCocktail = () => {
        navigate('/newCocktail');
    };

    return (
        <Box display="flex" alignItems="center">
            <Button color="inherit" onClick={handleClick}>
                Привет, {user.displayName}!
            </Button>
            {user.avatar ? (
                <Avatar src={`${apiUrl}/${user.avatar}`} sx={{ marginLeft: 2 }} />
            ) : (
                <Avatar sx={{ marginLeft: 2 }} />
            )}
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
                <MenuItem onClick={toMyCocktails}>Мои коктейли</MenuItem>
                <MenuItem onClick={toAddCocktail}>Добавить коктейль</MenuItem>
                <MenuItem onClick={handleLogout}>Выйти</MenuItem>
            </Menu>
        </Box>
    );
};

export default UserMenu;
