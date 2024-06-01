import {
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress, Dialog, DialogActions,
    DialogContent,
    Grid,
    styled,
    Typography
} from '@mui/material';
import {apiUrl} from '../../constants';
import {useAppDispatch, useAppSelector} from '../../App/hooks';
import {selectUserImages, selectUserIsLoading} from './imageStorageSlice';
import {useEffect, useState} from 'react';
import {deleteImages, getUserImages, getUsers, userDeleteImage} from './imageStorageThunks';
import {selectUser, selectUsers, selectUsersLoading} from '../Users/usersSlice';
import {useNavigate, useParams} from 'react-router-dom';

const UserPhotos = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const userPhotos = useAppSelector(selectUserImages);
    const isLoading = useAppSelector(selectUserIsLoading);
    const user = useAppSelector(selectUser);
    const users = useAppSelector(selectUsers);
    const usersIsLoading = useAppSelector(selectUsersLoading);

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
            if (params.id) await dispatch(getUserImages(params.id));
            await dispatch(getUsers());
        };

        void fetchUrl();
    }, [dispatch, params.id]);

    const deleteOnePhoto = async (id: string) => {
        await dispatch(deleteImages(id));
        if (params.id) await dispatch(getUserImages(params.id));
    };

    const userDeleteOnePhoto = async (id: string) => {
        await dispatch(userDeleteImage(id));
        if (params.id) await dispatch(getUserImages(params.id));
    };

    const toForm = () => {
        navigate('/addPhoto');
    };

    const ImageCardMedia = styled(CardMedia)({
        height: 0,
        paddingTop: '56.25%',
    });

    const getUserName = users.find(elem => elem._id === params.id);

    return (
        <>
            {user?._id === params.id && <Button onClick={toForm}>Add new photo</Button>}
            {!usersIsLoading && getUserName ? <Typography component="div" variant="h4">{getUserName.displayName}</Typography> : <CircularProgress />}
            <Grid container spacing={3}>
                {!isLoading ? userPhotos.map((elem) => (
                    <Grid item xs={3} key={elem._id}>
                        <Card onClick={() => handleOpen(elem.image)}>
                            <ImageCardMedia image={`${apiUrl}/${elem.image}`}/>
                            <CardContent>
                                <Typography component="div" variant="h6">
                                    {elem.title}
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

            <Dialog open={dialog} onClose={handleClose}>
                <DialogContent sx={{width: "400px", height: "auto"}}>
                    <ImageCardMedia image={`${apiUrl}/${photosData}`} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default UserPhotos;