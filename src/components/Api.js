import axios from 'axios';

const GetAxiosAPI = () => {
    return new axios.create({baseURL:process.env.REACT_APP_BackURL})
}

// Users
export const GetAllUsers = async () =>{
    const AxiosAPI = GetAxiosAPI()
    console.log("AxiosAPI:",process.env.REACT_APP_BackURL)
    try{
        const Resp = await AxiosAPI.get('user/GetAll')
        return Resp.data
    }catch (error) {
        console.error(error)
        return null
    }
}