import {createAsyncThunk} from '@reduxjs/toolkit';
import {AllPhotos, ImagesStorageTypes} from '../../types';
import axiosApi from '../../axiosApi';

export const getImages = createAsyncThunk<AllPhotos[]>(
    'get/images',
    async () => {
        const response = await axiosApi.get('/photos');
        const items = response.data;

        if (!items) {
            return [];
        }
        return items;
    },
);

export const addImages = createAsyncThunk<void, ImagesStorageTypes>(
    'add/images',
    async (data) => {
            const formData = new FormData();

            formData.append('title', data.title);
            formData.append('image', data.image);

            await axiosApi.post('/images', formData);
    },
);