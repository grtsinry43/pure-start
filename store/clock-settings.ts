import {createSlice} from '@reduxjs/toolkit';

export type ClockSettings = {
    isClockShow: boolean;
    clockFormat: '12h' | '24h';
    isSecondShow: boolean;
    isDateShow: boolean;
};

const clockSettingsSlice = createSlice({
    name: 'clockSettings',
    initialState: {
        isClockShow: true,
        clockFormat: '24h',
        isSecondShow: true,
        isDateShow: true,
    } as ClockSettings,
    reducers: {
        changeClockShow: (state, {payload}) => {
            state.isClockShow = payload;
        },
        changeClockFormat: (state, {payload}) => {
            state.clockFormat = payload;
        },
        changeSecondShow: (state, {payload}) => {
            state.isSecondShow = payload;
        },
        changeDateShow: (state, {payload}) => {
            state.isDateShow = payload;
        },
    },
});

export const {} = clockSettingsSlice.actions;
export default clockSettingsSlice.reducer;

