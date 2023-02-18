import axios from 'axios'
import { toast } from 'react-toastify';
import { SET_SHOW_LOADING, SET_REMOVE_LOADING } from '../../redux/slice/loadingSlice';
import { useDispatch } from 'react-redux';
const API_URL = process.env.REACT_APP_API_URL
const bootcamp = axios.create({
    baseURL: API_URL,
    // headers: { Authorization: `token ${GITHUB_TOKEN}` },
})
export const setupHttpInterceptors = (dispatch) => {
    bootcamp.interceptors.request.use((config) => {
        dispatch(SET_SHOW_LOADING())
        return config;
    });
    bootcamp.interceptors.response.use(
        (response) => {
            dispatch(SET_REMOVE_LOADING())
            return response;
        },
        (error) => {
            dispatch(SET_REMOVE_LOADING())
            if (error.response && error.response.status >= 400) {
                const message =
                    error.response.data.error ||
                    error.response.data.message ||
                    'An error occurred';
                toast(`${error.response.status}: ${message}`);
            }
            throw error;
        }
    );
};
// Get search results
// export const searchUsers = async (text) => {
//     const params = new URLSearchParams({
//         q: text,
//     })
//     const response = await github.get(`/search/users?${params}`)
//     return response.data.items
// }
// Get user and repos
export const getAllBootcamp = async () => {
    const data = await bootcamp.get('/v1/bootcamps')
    console.log(data)
}
export const createBootcamp = async (newBootcamp) => {
    const data = await bootcamp.post('/v1/bootcamps', newBootcamp)
    return data
}