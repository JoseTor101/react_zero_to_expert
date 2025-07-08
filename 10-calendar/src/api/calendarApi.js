import axios from "axios";
import { getEnv } from "../helpers";

const { VITE_API_URL } = getEnv();

const calendarApi = axios.create({
    baseURL: VITE_API_URL,
})

// Todo: configurar interceptores
calendarApi.interceptors.request.use(config => {

    config.headers = {
        ...config.headers,
        'x-token': localStorage.getItem('token')
    }
    
    return config;
})

export { calendarApi }


//Todo: configurar interceptores