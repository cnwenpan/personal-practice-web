import axios from '@/utils/request.js'
import host from '@/utils/host.config.js'

const api = {
    register(data) {
        return axios.post(`${host}/account/register`, data)
    }
}
export default api;
