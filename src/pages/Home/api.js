import axios from '@/utils/request.js'
import host from '@/utils/host.config.js'

const api = {
    today(data) {
        return axios.post(`${host}/today`, data)
    }
}
export default api;
