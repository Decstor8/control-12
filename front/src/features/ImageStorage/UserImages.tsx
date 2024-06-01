import { Button, Card, CardContent, CircularProgress, Grid, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { useAppDispatch, useAppSelector } from '../../App/hooks';
import { selectUserImages, selectUserIsLoading } from './imageStorageSlice';
import { useEffect } from 'react';
import { deleteImages, getUserImages, userDeleteImage } from './imageStorageThunks';
import { selectUser } from '../Users/usersSlice';
import { useParams } from 'react-router-dom';

const UserPhotos = () => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const userPhotos = useAppSelector(selectUserImages);
    const isLoading = useAppSelector(selectUserIsLoading);
    const user = useAppSelector(selectUser);

    useEffect(() => {
        const fetchUrl = async () => {
            if (params.id) await dispatch(getUserImages(params.id));
        };

        void fetchUrl();
    }, [dispatch]);

    const deleteOnePhoto = async (id: string) => {
        await dispatch(deleteImages(id));
        if (params.id) await dispatch(getUserImages(params.id));
    };

    const userDeleteOnePhoto = async (id: string) => {
        await dispatch(userDeleteImage(id));
        if (params.id) await dispatch(getUserImages(params.id));
    };

    return (
        <>
            <Grid container spacing={3}>
                {!isLoading ? userPhotos.map((elem) => (
                    <Grid item xs={3} key={elem._id}>
                        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1, position: 'relative' }}>
                                <img src={`${apiUrl}/${elem.image}`} alt={elem.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </div>
                            <CardContent>
                                <Typography component="div" variant="h6">
                                    {elem.title}
                                </Typography>
                                <Typography>
                                    {elem.user.displayName}
                                </Typography>
                                {user && user._id === elem.user._id && <Typography component="div">
                                    <Button sx={{color: 'red'}} onClick={() => userDeleteOnePhoto(elem._id)}>Удалить</Button>
                                </Typography>}
                                {user && user.role === 'admin' && <Typography component="div">
                                    <Button sx={{color: 'red'}} onClick={() => deleteOnePhoto(elem._id)}>Удалить</Button>
                                </Typography>}
                            </CardContent>
                        </Card>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>
        </>
    );
};

export default UserPhotos;
