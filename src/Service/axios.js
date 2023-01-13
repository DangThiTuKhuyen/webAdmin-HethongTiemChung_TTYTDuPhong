import Axios from "axios";

export const axios = Axios.create({
    baseURL: 'http://18.233.8.165:3210/'
});

axios.interceptors.request.use(
    async (config) => {
        config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
        return config;
    }
);