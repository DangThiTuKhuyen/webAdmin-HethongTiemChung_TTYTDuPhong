import {axios} from "./axios";

const getProfile = () => {
    return axios.get("/users/4f5f5ee6-ee71-4da5-9eb6-ba7a51f0fc79")
}

const getUsers = () => {
    return axios.get("/users")
}

const getRegistrations = () => {
    return axios.get("/users/09a429b4-405e-4abf-9620-ff21b93d3153/registrations?fbclid=IwAR2KYQNrgJMqrZzF66qhEDGuSCKns7EH--frqRaZyNCaSfYX5I8wiMsPLy0")
}

const updateStatusRegistration = (id) => {
    return axios.put("/users/09a429b4-405e-4abf-9620-ff21b93d3153/registrations/" + id)
}

const getVaccinations = (realTime) => {
    return axios.get(`/users/0879a9a2-5f65-4476-b107-fea78da2fd69/registrations/${realTime}`)
}

const confirmVaccination = (id) => {
    return axios.get(`/users/0879a9a2-5f65-4476-b107-fea78da2fd69/registrations/${id}/accept`)
}

const getHistoryVaccination = (realTime) => {
    return axios.get(`/users/0879a9a2-5f65-4476-b107-fea78da2fd69/histories/${realTime}`)
}

// const getAllSchedule =async () =>
// {
//     var schedules = await (await axios.get("/schedule")).data.filter((schedule) =>
//     {
//         return schedule.trangThai === 'Chuẩn bị chiếu'
//     })
//     return schedules
// }
// const getAllPosition = () =>
// {
//     return axios.get("/positions")
// }


export {
    getProfile,
    getUsers,
    getRegistrations,
    updateStatusRegistration,
    getVaccinations,
    confirmVaccination,
    getHistoryVaccination
}