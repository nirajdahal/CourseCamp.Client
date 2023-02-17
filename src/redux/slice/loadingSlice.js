import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    isLoading: false,
}
const loadingSlice = createSlice({
    name: "loading",
    initialState,
    reducers: {
        SET_SHOW_LOADING: (state) => {
            state.isLoading = true
        },
        SET_REMOVE_LOADING: (state) => {
            state.isLoading = false
        }
    }
});
export const { SET_SHOW_LOADING, SET_REMOVE_LOADING } = loadingSlice.actions
export const selectIsLoading = state => state.loading.isLoading
export default loadingSlice.reducer