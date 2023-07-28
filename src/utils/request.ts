import axios from 'axios'



//创建axios实例
const request = axios.create({
    //基础路径
    baseURL:
    // @ts-ignore
    process.env.NODE_ENV === "production"
      ? "https://yuindex-server-974538-1256524210.ap-shanghai.run.tcloudbase.com/api"
      : "http://localhost:7345/api",
    timeout:5000    //超时时间
})

//请求拦截器
request.interceptors.request.use(config => {
    
        // //每次发请求携带上token
        // let userStore = useUserStore();
        // if (userStore.token) {
        //     config.headers.token = userStore.token;
        // }
    
    return config;
}, error => {
    //对请求错误做些什么
    return Promise.reject(error);
})


//响应拦截器
request.interceptors.response.use(response => {
    console.log(response);
    return response.data;
}, error => {
    //对响应错误做些什么
    return Promise.reject(error);
})
request.defaults.withCredentials = true;

export default request;