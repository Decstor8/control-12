import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectIsLoading, selectPhotos} from './imageStorageSlice';
import {Card, CardContent, CardMedia, CircularProgress, Grid, Typography} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {apiUrl} from '../../constants';
import {useEffect} from 'react';
import {getImages} from './imageStorageThunks';

const Images = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const images = useAppSelector(selectPhotos);
    const isLoading = useAppSelector(selectIsLoading);

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getImages());
        };

        void fetchUrl();
    }, [dispatch]);

    const toProfile = (id: string) => {
        navigate(`/images/${id}`);
    };

    return (
        <>
            <Grid container spacing={4} justifyContent="center">
                {!isLoading ? (
                    images.map((elem) => (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={elem._id}>
                            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch', height: '100%' }}>
                                <CardMedia
                                    component="img"
                                    image={`${apiUrl}/${elem.image}`}
                                    title={elem.title}
                                    style={{ height: 200, objectFit: 'cover' }}
                                />
                                <CardContent style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography
                                        variant="h6"
                                        align="center"
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => toProfile(elem.user)}
                                    >
                                        {elem.title}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <CircularProgress />
                    </Grid>
                )}
            </Grid>
        </>
    );
};

export default Images;
