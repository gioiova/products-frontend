import axios from "axios";

const ajax = axios.create({
    baseURL: 'https://crudiova.000webhostapp.com',
    timeout: 10000,
    headers: {
        Accept: 'application/json',
        'Content-type':'application/json'
    }
})

ajax.interceptors.request.use(
    function (config){
        return config;
    },

    function (error) {
        return Promise.reject(error);
    }
)

export default ajax;