import {createSlice} from '@reduxjs/toolkit';

export type AppearanceSettings = {
    isDarkModeFollowSystem: boolean;
    isDarkMode: boolean;
    fontSize: number;
    primaryColor: string;
    isAnimationDisabled: boolean;
    isBlurDisabled: boolean;
}

const appearanceSettingsSlice = createSlice({
    name: 'appearanceSettings',
    initialState: {
        isDarkModeFollowSystem: true,
        isDarkMode: false,
        fontSize: 50,
        primaryColor: '210 100% 80%',
        isAnimationDisabled: false,
        isBlurDisabled: false,
    } as AppearanceSettings,
    reducers: {
        changeDarkMode: (state, {payload}) => {
            state.isDarkMode = payload;
        },
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
        changePrimaryColor: (state, {payload}) => {
            state.primaryColor = payload;
        }
    },
});

export const {
    changeDarkModeFollowSystem,
    changeFontSize,
    changeAnimationDisabled,
    changeBlurDisabled,
    changeDarkMode,
    changePrimaryColor
} = appearanceSettingsSlice.actions;

export default appearanceSettingsSlice.reducer;

