import {createSlice} from '@reduxjs/toolkit';

const backgroundSettingsSlice = createSlice({
    name: 'backgroundSettings',
    initialState: {
        backgroundType: 'color',
        color: {
            value: '#f0f0f0',
        },
        linearGradient: {
            angle: 0,
            startColor: '#f0f0f0',
            endColor: '#f0f0f0',
        },
        photo: {
            url: 'https://dogeoss.grtsinry43.com/volantis-static/media/wallpaper/minimalist/2020/006.webp',
        },
        dailyPhoto: {
            url: '',
        },
        backgroundBlur: 0,
        backgroundOpacity: 100,
    },
    reducers: {
        changeBackgroundType: (state, {payload}) => {
            if (payload === 'daily') {
                state.photo.url = 'https://bing.img.run/1920x1080.php';
            }
            state.backgroundType = payload;
        },
        changeColorValue: (state, {payload}) => {
            state.color.value = payload;
        },
        changeLinearGradient: (state, {payload}) => {
            state.linearGradient = payload;
        },
        changePhotoUrl: (state, {payload}) => {
            state.photo.url = payload;
        },
        changeDailyPhotoUrl: (state, {payload}) => {
            state.dailyPhoto.url = payload;
        },
        changeBackgroundBlur: (state, {payload}) => {
            state.backgroundBlur = payload;
        },
        changeBackgroundOpacity: (state, {payload}) => {
            state.backgroundOpacity = payload;
        },
    },
});

export const {
    changeBackgroundType,
    changeColorValue,
    changeLinearGradient,
    changePhotoUrl,
    changeDailyPhotoUrl,
    changeBackgroundBlur,
    changeBackgroundOpacity,
} = backgroundSettingsSlice.actions;

export default backgroundSettingsSlice.reducer;

