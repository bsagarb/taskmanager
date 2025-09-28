import axios from 'axios';


// const BASE_URL = 'http://localhost:5000/api';
const BASE_URL = 'https://taskmanager-7ldg.onrender.com/api';




const api = axios.create({
baseURL: BASE_URL,
headers: { 'Content-Type': 'application/json' }
});


api.interceptors.request.use((config) => {
const token = localStorage.getItem('token');
if (token) config.headers.token = token;
return config;
});


export default api;