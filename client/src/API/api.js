import axios from "axios";
import {useContext} from "react";
import {AuthContext} from "../context/AuthContext";

const  token = localStorage.getItem("token")
export const API = axios.create ({

    baseURL: 'http://localhost:5000/api',
    headers: {
        "Authorization": `Bearer ${token}`,
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})
