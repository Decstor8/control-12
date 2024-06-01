import {AllPhotos} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getImages} from './imageStorageThunks';
import {RootState} from '../../App/store';

interface ImageStorage {
    photos: AllPhotos[],
    isLoading: boolean,
}

const initialState: ImageStorage = {
    photos: [],
    isLoading: false,
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
            state.photos = items;
        });
        builder.addCase(getImages.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const imagesReducer = imagesStorageSlice.reducer;
export const selectPhotos = (state: RootState) => state.photos.photos;
export const selectIsLoading = (state: RootState) => state.photos.isLoading;