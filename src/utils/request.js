import axios from 'axios'; // 引入axios
import { Message } from 'element-ui';
import context from '@/main.js'
const service = axios.create({
    baseURL: '/api',
    timeout: 99999
})
let acitveAxios = 0
let timer
const showLoading = () => {
    acitveAxios++
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        if (acitveAxios > 0) {
            context.$bus.emit("showLoading")
        }
    }, 400);
}

const closeLoading = () => {
    acitveAxios--
    if (acitveAxios <= 0) {
        clearTimeout(timer)
        context.$bus.emit("closeLoading")
    }
}
//http request 拦截器
service.interceptors.request.use(
    config => {
        if (!config.donNotShowLoading) {
            showLoading()
        }
        const token = localStorage['token']
        config.data = JSON.stringify(config.data);
        config.headers = {
            'Content-Type': 'application/json',
            'Authorization': token,
        }
        return config;
    },
    error => {
        closeLoading()
        Message({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error;
    }
);


//http response 拦截器
service.interceptors.response.use(
    response => {
        closeLoading()
        if (response.data.code == 200) {
            return response.data
        } else if (response.data.code == 103) {
            context.$router.push({
                name: "Login",
                query: {
                    redirect: document.location.hash
                }
            })
        } else {
            Message({
                showClose: true,
                message: response.data.msg,
                type: 'error',
            })

            return response.data;
        }
    },
    error => {
        closeLoading()
        Message({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error
    }
)

export default service