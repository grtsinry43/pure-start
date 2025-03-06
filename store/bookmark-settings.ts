import {createSlice} from '@reduxjs/toolkit';

export type BookmarkSettings = {
    showBookmark: boolean;
    bookmarkShowType: 'icon' | 'text' | 'icon-text';
};

const bookmarkSettings = createSlice({
    name: 'bookmarkSettings',
    initialState: {
        showBookmark: true,
        bookmarkShowType: 'icon-text',
    } as BookmarkSettings,
    reducers: {
        changeShowBookmark: (state, {payload}) => {
            state.showBookmark = payload;
        },
        changeBookmarkShowType: (state, {payload}) => {
            state.bookmarkShowType = payload
        }
    },
});

export const {
    changeShowBookmark,
    changeBookmarkShowType,
} = bookmarkSettings.actions;
export default bookmarkSettings.reducer;

