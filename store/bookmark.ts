import {createSlice} from '@reduxjs/toolkit';

export type BookmarkStore = {
    categoryList: Array<string>;
    bookmarkList: Array<BookmarkItem>;
};

export type IconKey = 'github' | 'twitter' | 'mail' | 'bookmark' | 'music' | 'coffee' | 'cloud';

export type BookmarkItem = {
    sort?: number;
    icon: string | IconKey;
    label: string;
    url: string;
    category: string;
}

const bookmarkSettings = createSlice({
    name: 'bookmarkStore',
    initialState: {
        bookmarkList: [
            {icon: "github", url: "https://github.com", label: "GitHub", category: "工作"},
            {icon: "bilibili", url: "https://www.bilibili.com", label: "Bilibili", category: "媒体"},
            // {icon: "notion", url: "https://www.notion.so", label: "Notion", category: "工作"},
            {icon: "deepseek", url: "https://deepseek.com", label: "Deepseek", category: "工作"},
            {icon: "music", url: "https://music.163.com", label: "网易云音乐", category: "媒体"},
            {icon: "weibo", url: "https://weibo.com", label: "微博", category: "社交"},
            {icon: "zhihu", url: "https://www.zhihu.com", label: "知乎", category: "社交"},
            {icon: "douban", url: "https://www.douban.com", label: "豆瓣", category: "媒体"},
            // {icon: "baidu", url: "https://www.baidu.com", label: "百度", category: "搜索"},
            {icon: "taobao", url: "https://www.taobao.com", label: "淘宝", category: "购物"},
            {icon: "jd", url: "https://www.jd.com", label: "京东", category: "购物"},
            // {icon: "qq", url: "https://web.qq.com", label: "QQ", category: "社交"},
            // {icon: "wechat", url: "https://web.wechat.com", label: "微信", category: "社交"},
        ],
        categoryList: [
            "工作",
            "社交",
            "媒体",
            // "搜索",
            "购物",
        ],
    } as BookmarkStore,
    reducers: {
        addBookmark: (state, {payload}) => {
            state.bookmarkList.push(payload);
        },
        removeBookmark: (state, {payload}) => {
            state.bookmarkList = state.bookmarkList.filter(item => item.url !== payload.url);
        },
        updateBookmark: (state, {payload}) => {
            state.bookmarkList = state.bookmarkList.map(item => {
                if (item.url === payload.url) {
                    return payload;
                }
                return item;
            });
        },
        updateBookmarkList: (state, {payload}) => {
            state.bookmarkList = payload;
        },
        addCategory: (state, {payload}) => {
            state.categoryList.push(payload);
        },
        removeCategory: (state, {payload}) => {
            state.categoryList = state.categoryList.filter(item => item !== payload);
        }
    },
});

export const {} = bookmarkSettings.actions;
export default bookmarkSettings.reducer;

