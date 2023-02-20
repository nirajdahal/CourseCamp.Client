import { createSlice } from '@reduxjs/toolkit'
const initialState = {
    bootcampData: {},
}
const bootcampSlice = createSlice({
    name: "bootcamp",
    initialState,
    reducers: {
        SET_BOOTCAMP_DATA: (state, action) => {
            console.log("action payload", action.payload)
            state.bootcampData = action.payload
        },
    }
});
export const { SET_BOOTCAMP_DATA } = bootcampSlice.actions
export const selectBootcampData = state => state.bootcamp.bootcampData
export default bootcampSlice.reducer