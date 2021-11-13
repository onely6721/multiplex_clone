import axios from "axios";

export const API = axios.create ({
    baseURL: 'http://localhost:5000/api',
    headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
