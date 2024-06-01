import {AllImages} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getImages, getUserImages} from './imageStorageThunks';
import {RootState} from '../../App/store';

interface ImageStorage {
    images: AllImages[],
    isLoading: boolean,
    userPhotos: AllImages[],
    userIsLoading: boolean,
}

const initialState: ImageStorage = {
    images: [],
    isLoading: false,
    userPhotos: [],
    userIsLoading: false,
};

export const imagesStorageSlice = createSlice({
    name: 'images/slice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getImages.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getImages.fulfilled, (state, {payload: items}) => {
            state.isLoading = false;
            state.images = items;
        });
        builder.addCase(getImages.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(getUserImages.pending, (state) => {
            state.userIsLoading = true;
        });
        builder.addCase(getUserImages.fulfilled, (state, {payload: items}) => {
            state.userIsLoading = false;
            state.userPhotos = items;
        });
        builder.addCase(getUserImages.rejected, (state) => {
            state.userIsLoading = false;
        });
    },
});

export const imagesReducer = imagesStorageSlice.reducer;
export const selectImages = (state: RootState) => state.images.images;
export const selectIsLoading = (state: RootState) => state.images.isLoading;
export const selectUserImages = (state: RootState) => state.images.userPhotos;
export const selectUserIsLoading = (state: RootState) => state.images.userIsLoading;

