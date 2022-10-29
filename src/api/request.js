import axios from 'axios'
import config from '../config'
import { ElMessage } from 'element-plus'

const NETWORK_ERROR = '網路請求異常，請稍候重試．．．'

//創建一個axios實例對象
const service = axios.create({
    baseURL: config.baseApi
})

//請求前攔截
service.interceptors.request.use((req) => {
    //可以自定義header
    //jwt-token認證的時候
    return req
})

//請求後攔截
service.interceptors.response.use((res) => {
    const { code, data, msg } = res.data
    if (code == 200) {
        return data
    } else {
        //網路請求錯誤
        ElMessage.error(msg || NETWORK_ERROR)
        return Promise.reject(msg || NETWORK_ERROR)
    }
})

//封裝的核心函數
function request(options) {
    options.method = options.method || 'get'
    if (options.method.toLowerCase() == 'get') {
        options.params = options.data
    }

    //對mock的處理
    let isMock = config.mock
    if (typeof options.mock !== 'undefined') {
        isMock = options.mock
    }

    //對線上環境做處理
    if (config.env == 'prod') {
        service.defaults.baseURL = config.baseApi
    } else {
        service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
    }

    return service(options)
}

export default request