import {configureStore} from '@reduxjs/toolkit'
import appearanceSettingsReducer from '@/store/appearance-settings'

export const makeStore = () => {
    return configureStore({
        reducer: {
            appearance: appearanceSettingsReducer,
        }
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
