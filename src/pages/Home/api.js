import axios from '@/utils/request.js'
import host from '@/utils/host.config.js'

const api = {
    repeatTask(data) {
        return axios.post(`${host}/today/repeat`, data)
    },
    noRepeatTask(data) {
        return axios.post(`${host}/today/noRepeat`, data)
    }
}
export default api;
