import {createSlice} from '@reduxjs/toolkit';

const appearanceSettingsSlice = createSlice({
    name: 'appearanceSettings',
    initialState: {
        isDarkModeFollowSystem: true,
        fontSize: 50,
        isAnimationDisabled: false,
        isBlurDisabled: false,
    },
    reducers: {
        changeDarkModeFollowSystem: (state, {payload}) => {
            state.isDarkModeFollowSystem = payload;
        },
        changeFontSize: (state, {payload}) => {
            state.fontSize = payload;
        },
        changeAnimationDisabled: (state, {payload}) => {
            state.isAnimationDisabled = payload;
        },
        changeBlurDisabled: (state, {payload}) => {
            state.isBlurDisabled = payload;
        },
    },
});

export const {
    changeDarkModeFollowSystem,
    changeFontSize,
    changeAnimationDisabled,
    changeBlurDisabled
} = appearanceSettingsSlice.actions;
export default appearanceSettingsSlice.reducer;

