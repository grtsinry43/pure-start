import {createSlice} from '@reduxjs/toolkit';

export type SearchSettings = {
    isSearchBarShow: boolean;
    defaultSearchEngine: string;
    searchEngineList: {
        name: string;
        url: string;
        suggestUrl?: string;
    }[];
    isSuggestionsShow: boolean;
    isSaveSearchHistory: boolean;
    savedSearches: string[];
};

const searchSettingsSlice = createSlice({
    name: 'searchSettings',
    initialState: {
        isSearchBarShow: true,
        defaultSearchEngine: 'bing',
        searchEngineList: [{
            name: 'bing',
            url: 'https://www.bing.com/search?q=',
            suggestUrl: 'https://api.bing.com/qsonhs.aspx?type=cb&q=',
        }, {
            name: 'google',
            url: 'https://www.google.com/search?q=',
            suggestUrl: 'https://www.google.com/complete/search?client=firefox&q=',
        }, {
            name: 'baidu',
            url: 'https://www.baidu.com/s?wd=',
            suggestUrl: 'http://suggestion.baidu.com/su?wd=',
        }, {
            name: '360',
            url: 'https://www.so.com/s?q=',
            suggestUrl: 'https://sug.so.360.cn/suggest?encodein=utf-8&encodeout=utf-8&format=json&word=',
        }, {
            name: 'sogou',
            url: 'https://www.sogou.com/web?query=',
            suggestUrl: 'https://www.sogou.com/suggnew/ajajjson?type=web&key=',
        }, {
            name: 'duckduckgo',
            url: 'https://duckduckgo.com/?q=',
            suggestUrl: 'https://duckduckgo.com/ac/?q=',
        }, {
            name: 'github',
            url: 'https://github.com/search?q=',
        }],
        isSuggestionsShow: true,
        isSaveSearchHistory: true,
        savedSearches: [],
    } as SearchSettings,
    reducers: {
        changeSearchBarShow: (state, {payload}) => {
            state.isSearchBarShow = payload;
        },
        changeDefaultSearchEngine: (state, {payload}) => {
            state.defaultSearchEngine = payload;
        },
        addOrEditSearchEngine: (state, {payload}) => {
            const index = state.searchEngineList.findIndex(item => item.name === payload.name);
            if (index === -1) {
                state.searchEngineList.push(payload);
            } else {
                state.searchEngineList[index] = payload;
            }
        },
        changeSuggestionsShow: (state, {payload}) => {
            state.isSuggestionsShow = payload;
        },
        saveSearchHistory: (state, {payload}) => {
            const index = state.savedSearches.findIndex(item => item === payload);
            if (index === -1) {
                state.savedSearches.push(payload);
            }
        },
        deleteSearchHistory: (state, {payload}) => {
            const index = state.savedSearches.findIndex(item => item === payload);
            if (index !== -1) {
                state.savedSearches.splice(index, 1);
            }
        },
        changeIsSaveSearchHistory: (state, {payload}) => {
            state.isSaveSearchHistory = payload;
        },
        clearSearchHistory: (state) => {
            state.savedSearches = [];
        }
    },
});

export const {
    changeSearchBarShow,
    changeDefaultSearchEngine,
    addOrEditSearchEngine,
    changeSuggestionsShow,
    saveSearchHistory,
    deleteSearchHistory,
    clearSearchHistory
} = searchSettingsSlice.actions;
export default searchSettingsSlice.reducer;

