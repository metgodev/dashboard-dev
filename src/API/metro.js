
import axios from 'axios'

let token = ''

export default axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com',
    headers: {
        Authorization: `Bearer ${token}`
    }
})
