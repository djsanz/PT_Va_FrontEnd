import axios from 'axios';

const GetAxiosAPI = () => {
    return new axios.create({baseURL:process.env.REACT_APP_BackURL})
}

// Users
export const GetAllUsers = async () =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.get('user/GetAll')
        return Resp.data
    }catch (error) {
        console.error(error)
        return null
    }
}

// Login
export const Login = async (dorsal,password) =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.post('login',{dorsal,password})
        console.log(Resp)
        return Resp.data
    }catch (error) {
        console.error(error)
        return null
    }
}