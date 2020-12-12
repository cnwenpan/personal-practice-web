import axios from '@/utils/request.js'
import host from '@/utils/host.config.js'

const api = {
    landMaskList(data) {
        return axios.post(`${host}/landMasks/list`, data)
    },
    landMaskAdd(data){
        return axios.post(`${host}/landMasks/add`, data)
    },
    landMaskUpdate(data){
        return axios.post(`${host}/landMasks/update`, data)
    }
}
export default api;
