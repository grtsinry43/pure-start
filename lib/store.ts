import {configureStore} from '@reduxjs/toolkit'
import appearanceSettingsReducer from '@/store/appearance-settings';
import backgroundSettingsReducer from '@/store/background-settings';
import layoutSettingsReducer from '@/store/layout-settings';
import clockSettingsReducer from '@/store/clock-settings';
import searchSettingsReducer from '@/store/search-settings';

const loadState = () => {
    if (typeof window === 'undefined') {
        return undefined;
    }
    try {
        const serializedState = localStorage.getItem('appState');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
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
        reducer: {
            appearance: appearanceSettingsReducer,
            background: backgroundSettingsReducer,
            layout: layoutSettingsReducer,
            clock: clockSettingsReducer,
            search: searchSettingsReducer,
        },
        preloadedState: loadState(),
    });

    if (typeof window !== 'undefined') {
        store.subscribe(() => {
            saveState(store.getState());
        });
    }

    return store;
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
