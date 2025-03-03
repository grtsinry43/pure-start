import {configureStore} from '@reduxjs/toolkit'
import appearanceSettingsReducer from '@/store/appearance-settings';
import backgroundSettingsReducer from '@/store/background-settings';
import layoutSettingsReducer from '@/store/layout-settings';
import clockSettingsReducer from '@/store/clock-settings';
import searchSettingsReducer from '@/store/search-settings';

export const makeStore = () => {
    return configureStore({
        reducer: {
            appearance: appearanceSettingsReducer,
            background: backgroundSettingsReducer,
            layout: layoutSettingsReducer,
            clock: clockSettingsReducer,
            search: searchSettingsReducer,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
