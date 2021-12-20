import axios from "axios";

const getToken = () => localStorage.getItem("token")
export const API = axios.create ({

    baseURL: 'http://localhost:5000/api',
    headers: {
        "Authorization": `Bearer ${getToken()}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
