import axios from '@/utils/request.js'
import host from '@/utils/host.config.js'

const api = {
    list(data) {
        return axios.post(`${host}/diary/list`, data)
    },
    add(data) {
        return axios.post(`${host}/diary/add`, data)
    },
    update(data) {
        return axios.post(`${host}/diary/update`, data)
    }
}
export default api;
