import {createSlice} from '@reduxjs/toolkit';

export type WeatherSettings = {
    showWeather: boolean;
    location: string;
    cityId: string;
    unit: 'C' | 'F';
    showDetailWhileHover: boolean;
};

const weatherSettingsSlice = createSlice({
    name: 'weatherSettings',
    initialState: {
        showWeather: true,
        location: '长沙',
        cityId: '101250101',
        unit: 'C',
        showDetailWhileHover: false
    } as WeatherSettings,
    reducers: {
        changeShowWeather: (state, {payload}) => {
            state.showWeather = payload;
        },
        changeLocation: (state, {payload}) => {
            state.location = payload;
        },
        changeCityId: (state, {payload}) => {
            state.cityId = payload;
        },
        changeUnit: (state, {payload}) => {
            state.unit = payload;
        },
        changeShowDetailWhileHover: (state, {payload}) => {
            state.showDetailWhileHover = payload;
        },
    },
});

export const {} = weatherSettingsSlice.actions;
export default weatherSettingsSlice.reducer;

