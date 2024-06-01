import {Button, Grid} from '@mui/material';
import {Link as navLink} from 'react-router-dom';

const SecretMenu = () => {
    return (
        <Grid item>
            <Button component={navLink} to="register" color="inherit">Зарегистрироваться</Button>
            <Button component={navLink} to="login" color="inherit">Войти</Button>
        </Grid>
    );
};

export default SecretMenu;