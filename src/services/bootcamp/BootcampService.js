import axios from 'axios'
import { toast } from 'react-toastify'
import { SET_SHOW_LOADING, SET_REMOVE_LOADING } from '../../redux/slice/loadingSlice'
const API_URL = process.env.REACT_APP_API_URL
const bootcamp = axios.create({
    baseURL: API_URL,
    // headers: { Authorization: `token ${GITHUB_TOKEN}` },
})
export const setupHttpInterceptors = (dispatch) => {
    try {
        bootcamp.interceptors.request.use((config) => {
            dispatch(SET_SHOW_LOADING())
            return config
        })
        bootcamp.interceptors.response.use(
            (response) => {
                dispatch(SET_REMOVE_LOADING())
                return response
            },
            (error) => {
                dispatch(SET_REMOVE_LOADING())
                if (error.response && error.response.status >= 400) {
                    const message =
                        error.response.data.error ||
                        error.response.data.message ||
                        'An error occurred'
                    toast(`${error.response.status}: ${message}`)
                }
                throw error
            }
        )
    }
    catch (error) {
        toast(`${error.message}`)
    }
}
// Get search results
// export const searchUsers = async (text) => {
//     const params = new URLSearchParams({
//         q: text,
//     })
//     const response = await github.get(`/search/users?${params}`)
//     return response.data.items
// }
// Get user and repos
export class AccessBootcampAPI {
    constructor(dispatch) {
        setupHttpInterceptors(dispatch)
    }
    getAllBootcamp = async (dispatch) => {
        setupHttpInterceptors(dispatch)
        const data = await bootcamp.get('/v1/bootcamps')
        console.log(data)
    }
    createBootcamp = async (newBootcamp, dispatch) => {
        setupHttpInterceptors(dispatch)
        const data = await bootcamp.post('/v1/bootcamps', newBootcamp)
        return data
    }
    getAllBootcampByFiltering = async (bootcampQuery, dispatch) => {
        setupHttpInterceptors(dispatch)
        const { name, price, page, limit, distance, zipcode, housing, jobGuarantee } = bootcampQuery
        const query = {}
        if (name) {
            query.sort = 'name'
        }
        if (housing) {
            query.housing = true
        }
        if (jobGuarantee) {
            query.jobGuarantee = true
        }
        if (distance) {
            query.distance = distance
        }
        if (zipcode) {
            query.zipcode = zipcode
        }
        if (page) {
            query.page = page
        }
        if (limit) {
            query.limit = limit
        }
        if (price) {
            const data = await bootcamp.get('/v1/bootcamps', {
                params: { ...query, 'averageCost[lte]': price },
            })
            return data
        }
        else {
            const data = await bootcamp.get('/v1/bootcamps', {
                params: query,
            })
            return data
        }
    }
}
