import axios from '@/utils/request.js'
import host from '@/utils/host.config.js'

const api = {
    list(data) {
        return axios.post(`${host}/program/list`, data)
    },
    add(data) {
        return axios.post(`${host}/program/add`, data)
    },
    update(data) {
        return axios.post(`${host}/program/update`, data)
    },
    startUp(data) {
        return axios.post(`${host}/program/startUp`, data)
    },
    del(data) {
        return axios.post(`${host}/program/del`, data)
    }
}
export default api;
