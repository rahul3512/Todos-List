import axios from "axios";

console.log(process.env.REACT_APP_API)
const API = "https://todos-app-list.herokuapp.com"
// const API = 'http://localhost:30';

export const app = axios.create(
    {
        baseURL: API
    }
)