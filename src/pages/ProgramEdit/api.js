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
    },
    taskList(data){
        return axios.post(`${host}/task/list`, data)
    },
    taskAdd(data){
        return axios.post(`${host}/task/add`, data)
    },
    taskUpdate(data){
        return axios.post(`${host}/task/update`, data)
    },
    taskDel(data){
        return axios.post(`${host}/task/del`, data)
    }
}
export default api;
