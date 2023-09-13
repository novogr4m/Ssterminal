import axios from 'axios'
import { message } from 'ant-design-vue';
//创建axios实例
const request = axios.create({
    //基础路径
    // baseURL: "http://localhost:7345/api",
    baseURL:process.env.NODE_ENV==='production'?'http://api.ssterminal.top/api':'http://localhost:7345/api',
    timeout: 5000    //超时时间
})

//请求拦截器
request.interceptors.request.use((config: any) => {
    // config.headers.common[token]='ds'    
    console.log(config.headers);
    // config.headers.RefreshToken = 'dqw';

    return config;
}, (error: any) => {
    //对请求错误做些什么
    return Promise.reject(error);
})


//响应拦截器
request.interceptors.response.use((response: { data: any; }) => {
    // console.log('iam response', response);
    //简化数据
    return response.data;
}, (error: { response: { status: any; }; }) => {
    //对响应错误做些什么
    let msg = '';
    let status = error.response.status;
    //统一处理错误
    switch (status) {
        case 401:
            msg = "token过期";
            break;
        case 403:
            msg = '无权访问';
            break;
        case 404:
            msg = "请求地址错误";
            break;
        case 500:
            msg = "服务器出现问题";
            break;
        default:
            msg = "无网络";
    }
    //
    message.error(msg);
    return Promise.reject(error);
})


request.defaults.withCredentials = true;

export default request;