import axios from '@/utils/request.js'
import host from '@/utils/host.config.js'
export default {
    login(data){
        return axios.post(`${host}/account/login`, data)
    }
}
