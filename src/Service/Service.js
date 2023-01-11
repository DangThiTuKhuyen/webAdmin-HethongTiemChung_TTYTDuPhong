import { axios } from "./axios";

let userId = localStorage.getItem("userId")
const login = (email, password) => {
    return axios.post("/auth/loginAdmin", { email: email, password: password })
}
const getProfile = () => {
    return axios.get(`/users/${userId}`)
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

const getDiseaseHaveVaccinated = (year) => {
    return axios.get(`/users/${userId}/histories/disease/${year}`)
}

const logout = () => {
    return axios.post(`auth/logoutUser`, { email: localStorage.getItem("email"), accessToken: localStorage.getItem("accessToken") })
}

const updateProfile = (data) => {
    return axios.put(`/users/${userId}`, {phone: data.phoneNumber, gender: data.gender, birthday: data.birthday, province: data.province, district: data.district})
}

const getDisease = () => {
    return axios.get(`/users/${userId}/diseases`)
}

const addDisease = (data) => {
    return axios.post(`/users/${userId}/diseases`, {diseaseName: data.nameDisease, diseaseDescribe: data.describe})
}

const updateDisease = (data, id) => {
    return axios.put(`/users/${userId}/diseases/${id}`, {diseaseName: data.nameDisease, diseaseDescribe: data.describe})
}

const getVaccine = () => {
    return axios.get('/vaccine')
}

const addVaccine = (data) => {
    return axios.post('/vaccine', {vaccineName: data.name, vaccinePrice: data.price, vaccineFirm: data.firm, country: data.country})
}

const updateVaccine = (data, id) => {
    return axios.put(`/vaccine/${id}`, {vaccineName: data.name, vaccinePrice: data.price, vaccineFirm: data.firm, country: data.country})
}

const deleteVaccine = (id) => {
    return axios.delete(`/vaccine/${id}`)
}

const addTreatment = (data) => {
    console.log(data)
    return axios.post(`/treament`, {diseaseId: data.diseaseId, vaccineId: data.vaccineId, effect: data.time, amount: data.amount})
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
    getDiseaseHaveVaccinated,
    logout,
    updateProfile,
    getDisease,
    getVaccine,
    addVaccine,
    updateVaccine,
    deleteVaccine,
    addTreatment,
    addDisease,
    updateDisease
}