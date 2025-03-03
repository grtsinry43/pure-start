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
            url: '',
        },
        dailyPhoto: {
            url: '',
        },
        backgroundBlur: 0,
        backgroundOpacity: 100,
    },
    reducers: {},
});

export const {} = backgroundSettingsSlice.actions;
export default backgroundSettingsSlice.reducer;

