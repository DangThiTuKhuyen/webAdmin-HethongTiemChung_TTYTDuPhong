import { axios } from "./axios";

let userId = localStorage.getItem("userId")
const login = (email, password) => {
    return axios.post("/auth/loginUsers", { email: email, password: password })
}
const getProfile = () => {
    return axios.get(`/users/${userId}`)
    // return axios.get("/users/4f5f5ee6-ee71-4da5-9eb6-ba7a51f0fc79")
}

const getUsers = () => {
    return axios.get("/users")
}

const getRegistrations = (date) => {
    console.log(date)
    return axios.get(`/users/${userId}/registrations/${date}/allUser`)
}

const updateStatusRegistration = (id) => {
    return axios.put(`/users/${userId}/registrations/` + id)
}

const getVaccinations = (realTime) => {
    return axios.get(`/users/${userId}/registrations/${realTime}`)
}

const confirmVaccination = (id) => {
    return axios.get(`/users/${userId}/registrations/${id}/accept`)
}

const getHistoryVaccination = (realTime) => {
    return axios.get(`/users/${userId}/histories/${realTime}`)
}

// Thống kê
const getPeople = (year) => {
    return axios.get(`/users/${userId}/histories/people/${year}`)
}

const getProfit = (year) => {
    return axios.get(`/users/${userId}/histories/profit/${year}`)
}

const getPeopleAtMedicalCenter = (year) => {
    return axios.get(`/users/${userId}/histories/peopleCenter/${year}`)
}

const getDisease = (year) => {
    return axios.get(`/users/${userId}/histories/disease/${year}`)
}

const logout = () => {
    return axios.post(`auth/logoutUser`, { email: localStorage.getItem("email"), accessToken: localStorage.getItem("accessToken") })
}

const updateProfile = (data) => {
    return axios.put(`/users/${userId}`, {phone: data.phoneNumber, gender: data.gender, birthday: data.birthday, province: data.province, district: data.district})
}

export {
    login,
    getProfile,
    getUsers,
    getRegistrations,
    updateStatusRegistration,
    getVaccinations,
    confirmVaccination,
    getHistoryVaccination,
    getPeople,
    getProfit,
    getPeopleAtMedicalCenter,
    getDisease,
    logout,
    updateProfile
}