import Axios from "axios";

export const axios = Axios.create({
    baseURL: 'http://44.212.10.140:3210/'
});

axios.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    }
);