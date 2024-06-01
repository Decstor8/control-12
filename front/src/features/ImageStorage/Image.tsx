import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectIsLoading, selectImages} from './imageStorageSlice';
import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Dialog, DialogActions,
    DialogContent,
    Grid,
    Typography
} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {apiUrl} from '../../constants';
import {useEffect, useState} from 'react';
import {deleteImages, getImages} from './imageStorageThunks';
import {selectUser} from "../Users/usersSlice";

const Images = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const images = useAppSelector(selectImages);
    const isLoading = useAppSelector(selectIsLoading);
    const user = useAppSelector(selectUser);

    const [photosData, setPhotosData] = useState<null | string>(null);
    const [dialog, setDialog] = useState(false);

    const handleOpen = (photo: string) => {
        setPhotosData(photo);
        setDialog(true);
    };

    const handleClose = () => {
        setDialog(false);
    };

    useEffect(() => {
        const fetchUrl = async () => {
            await dispatch(getImages());
        };

        void fetchUrl();
    }, [dispatch]);

    const toProfile = (id: string) => {
        navigate(`/images/${id}`);
    };

    const deleteOneImages = async (id: string) => {
        await dispatch(deleteImages(id));
        await dispatch(getImages());
    };

    return (
        <>
            <Grid container spacing={3}>
                {!isLoading ? images.map((elem) => (
                    <Grid item xs={3} key={elem._id}>
                        <Card onClick={() => handleOpen(elem.image)} style={{ height: 0, paddingTop: '57%' }}>
                            <CardMedia
                                component="img"
                                image={`${apiUrl}/${elem.image}`}
                                title={elem.title}
                                style={{ height: '100%', objectFit: 'cover' }}
                            />
                            <CardContent>
                                <Typography component="div" variant="h6">
                                    {elem.title}
                                </Typography>
                                <Typography component="div">
                                    <div onClick={() => toProfile(elem.user?._id)}>By: {elem.user.displayName}</div>
                                </Typography>
                                {user && user.role === 'admin' && <Typography component="div">
                                    <Button sx={{color: 'red'}} onClick={() => deleteOneImages(elem._id)}>Удалить</Button>
                                </Typography>}
                            </CardContent>
                        </Card>
                    </Grid>
                )) : <CircularProgress />}
            </Grid>

            <Dialog open={dialog} onClose={handleClose}>
                <DialogContent sx={{ width: '400px', height: 'auto' }}>
                    <CardMedia
                        component="img"
                        image={`${apiUrl}/${photosData}`}
                        sx={{ height: 0, paddingTop: '66%' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>

        </>

    );
};

export default Images;
