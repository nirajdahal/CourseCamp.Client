import { configureStore, combineReducers } from '@reduxjs/toolkit'
import loadingReducer from './slice/loadingSlice'
import bootcampReducer from './slice/bootCampSlice'
const rootReducer = combineReducers({
    // auth: authReducer,
    loading: loadingReducer,
    bootcamp: bootcampReducer,
    // filter: filterReducer
})
const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})
export default store