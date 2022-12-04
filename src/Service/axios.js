import Axios from "axios";

export const axios = Axios.create({
    baseURL: 'http://3.92.194.85:3210/'
});

// axios.interceptors.request.use(
//     async (config) => {
//         config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
//         return config;
//     }
// );