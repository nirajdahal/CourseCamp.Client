import axios from 'axios'
const API_URL = process.env.REACT_APP_API_URL
const bootcamp = axios.create({
    baseURL: API_URL,
    // headers: { Authorization: `token ${GITHUB_TOKEN}` },
})
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