import {AppBar, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link as navLink} from 'react-router-dom';
import {useAppSelector} from '../App/hooks';
import {selectUser} from '../features/Users/usersSlice';
import UserMenu from './UserMenu';
import SecretMenu from './SecretMenu';

const Link = styled(navLink)({
    color: 'inherit',
    textDecoration: 'none',
    '&:hover': {
        color: 'inherit',
    },
});

const Toolbars = () => {
    const user = useAppSelector(selectUser);

    return (
        <>
            <AppBar position="sticky" sx={{mb: 2}}>
                <Toolbar>
                    <Grid container justifyContent="space-between" alignItems="center">
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            <Link to="/">Сocktails</Link>
                        </Typography>
                        {user ? (
                            <UserMenu user={user}/>
                        ) : (
                            <SecretMenu />
                        )}
                    </Grid>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Toolbars;