import axios from 'axios';

export default axios.create({
    baseURL: process.env.REACT_APP_BASE_PATH,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
})
