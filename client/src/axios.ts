import axios from "axios";

const axiosClient = axios.create({baseURL:"http://localhost:8000/",withCredentials:true})

axiosClient.interceptors.response.use((response)=>response,(error)=>{
    if(axios.isAxiosError(error)){
        if(error.response?.status===401){
            window.location.href = "/login";
        }
    }
})


export default axiosClient;