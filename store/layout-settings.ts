import {createSlice} from '@reduxjs/toolkit';

const layoutSettingsSlice = createSlice({
    name: 'layoutSettings',
    initialState: {
        layoutType: 'grid',
        grid: {
            columnCount: 4,
        },
        list:{
            listCount: 3,
        },
        simple: {

        },
        elementGap: 10,
    },
    reducers: {},
});

export const {} = layoutSettingsSlice.actions;
export default layoutSettingsSlice.reducer;

