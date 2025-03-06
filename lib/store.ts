import {configureStore} from '@reduxjs/toolkit'
import appearanceSettingsReducer from '@/store/appearance-settings';
import backgroundSettingsReducer from '@/store/background-settings';
import layoutSettingsReducer from '@/store/layout-settings';
import clockSettingsReducer from '@/store/clock-settings';
import searchSettingsReducer from '@/store/search-settings';
import bookmarkSettingsReducer from '@/store/bookmark-settings';
import bookmarkReducer from '@/store/bookmark';
import weatherSettingsReducer from '@/store/weather-settings';

// 1. 先集中定义所有 reducers
const reducers = {
    appearance: appearanceSettingsReducer,
    background: backgroundSettingsReducer,
    layout: layoutSettingsReducer,
    clock: clockSettingsReducer,
    search: searchSettingsReducer,
    bookmark: bookmarkSettingsReducer,
    bookmarkStore: bookmarkReducer,
    weather: weatherSettingsReducer,
};

// 2. 基于 reducers 推导 RootState 类型
export type RootState = {
    [K in keyof typeof reducers]: ReturnType<typeof reducers[K]>
};

const loadState = (): RootState | undefined => {
    if (typeof window === 'undefined') {
        return undefined;
    }
    try {
        const serializedState = localStorage.getItem('appState');
        if (serializedState === null) {
            return undefined;
        }
        // 3. 这里解析后断言为 RootState 类型（需确保存储结构与当前 reducers 匹配）
        return JSON.parse(serializedState) as RootState;
    } catch (err) {
        console.error(err);
        return undefined;
    }
};

const saveState = (state: RootState) => {
    if (typeof window === 'undefined') {
        return;
    }
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('appState', serializedState);
    } catch (err) {
        console.error(err);
    }
};

export const makeStore = () => {
    const store = configureStore({
        reducer: reducers, // 使用集中定义的 reducers
        preloadedState: loadState(), // 现在类型明确为 RootState | undefined
    });

    if (typeof window !== 'undefined') {
        store.subscribe(() => {
            saveState(store.getState());
        });
    }

    return store;
}

// 以下类型推断保持不变
export type AppStore = ReturnType<typeof makeStore>
export type AppDispatch = AppStore['dispatch']
