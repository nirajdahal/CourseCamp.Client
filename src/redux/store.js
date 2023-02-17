import { configureStore, combineReducers } from '@reduxjs/toolkit'
import loadingReducer from './slice/loadingSlice'
const rootReducer = combineReducers({
    // auth: authReducer,
    loading: loadingReducer,
    // product: productReducer,
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