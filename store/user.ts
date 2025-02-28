import {createSlice} from '@reduxjs/toolkit';
// import {removeToken} from "@/utils/token";

export type User = {
    isLogin: boolean;
    userInfo: UserInfo
}
export type UserInfo = {
    id?: string;
    nickname?: string;
    email?: string;
    avatar: string | null;
    createdAt?: string;
    oauthProvider: string | null;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false,
        userInfo: {
            id: '',
            nickname: '',
            email: '',
            avatar: null,
            createdAt: '',
            oauthProvider: null
        }
    },
    reducers: {
        // 初始化用户信息
        initUserInfo: (state, {payload}) => {
            state.userInfo = payload;
        },
        // 修改用户登录状态
        changeLoginStatus: (state, {payload}) => {
            state.isLogin = payload;
        },
        // 清除用户信息
        clearUserInfo: (state, {payload}) => {
            console.log('clearUserInfo' + payload);
            // removeToken();
            state.userInfo = {
                id: '',
                nickname: '',
                email: '',
                avatar: null,
                createdAt: '',
                oauthProvider: null
            }
        },
    },
});

export const {initUserInfo, changeLoginStatus, clearUserInfo} = userSlice.actions;
export default userSlice.reducer;

