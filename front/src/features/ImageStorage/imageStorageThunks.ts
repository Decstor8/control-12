import {createAsyncThunk} from '@reduxjs/toolkit';
import {AllImages, ImagesStorageTypes} from '../../types';
import axiosApi from '../../axiosApi';

export const getImages = createAsyncThunk<AllImages[]>(
    'get/images',
    async () => {
        const response = await axiosApi.get<AllImages[]>('/photos');
        const items = response.data;

        if (!items) {
            return [];
        }

        return items;
    },
);

export const getUserImages = createAsyncThunk<AllImages[], string>(
    'getUser/images',
    async (id) => {
        const response = await axiosApi.get<AllImages[]>('/images/' + id);

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

export const deleteImages = createAsyncThunk<void, string>(
    'delete/image',
    async (id) => {
            await axiosApi.delete('/images/' + id);
    },
);

export const userDeleteImage = createAsyncThunk<void, string>(
    'delete/image',
    async (id) => {
            await axiosApi.delete('/images?image=' + id);
    },
);