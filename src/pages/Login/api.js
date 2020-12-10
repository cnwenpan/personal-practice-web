import axios from '@/utils/request.js'

export default {
    login(data){
        return axios.post('/account/login',data)
    }
}
