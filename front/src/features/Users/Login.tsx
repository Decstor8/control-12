import React, { FormEvent, useState } from 'react';
import { LoginMutation } from '../../types';
import { Alert, Avatar, Box, Button, Container, TextField, Typography, Link as MuiLink } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { selectLoginError } from './usersSlice';
import { googleLogin, loginUser } from './usersThunks';
import { GoogleLogin } from '@react-oauth/google';

const Login = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const error = useAppSelector(selectLoginError);

    const [state, setState] = useState<LoginMutation>({
        email: '',
        password: '',
    });

    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    };

    const submitFormHandler = async (e: FormEvent) => {
        e.preventDefault();
        await dispatch(loginUser(state)).unwrap();
        navigate('/');
    };

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                {error && (
                    <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
                        {error.error}
                    </Alert>
                )}
                <GoogleLogin
                    onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            void googleLoginHandler(credentialResponse.credential);
                        }
                        navigate('/');
                    }}
                    onError={() => {
                        console.log('Ошибка входа');
                    }}
                />
                <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        label="E-mail"
                        name="email"
                        value={state.email}
                        onChange={inputChangeHandler}
                        autoComplete="email"
                        margin="normal"
                    />
                    <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        value={state.password}
                        onChange={inputChangeHandler}
                        autoComplete="current-password"
                        margin="normal"
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Sign in
                    </Button>
                    <MuiLink component={RouterLink} to="/register" variant="body2">
                        Or sign up
                    </MuiLink>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
