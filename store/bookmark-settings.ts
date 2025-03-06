import {createSlice} from '@reduxjs/toolkit';

export type BookmarkSettings = {
    showBookmark: boolean;
    bookmarkShowType: 'icon' | 'text' | 'icon-text';
    isSlideBlocked: boolean;
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
        },
        changeIsSlideBlocked: (state, {payload}) => {
            state.isSlideBlocked = payload;
        }
    },
});

export const {
    changeShowBookmark,
    changeBookmarkShowType,
    changeIsSlideBlocked,
} = bookmarkSettings.actions;
export default bookmarkSettings.reducer;

