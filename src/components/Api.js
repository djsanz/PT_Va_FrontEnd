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
        return null
    }
}

export const GetEncuestasUser = async (Token) =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.get('user/encuestas', { headers: { Authorization: `Bearer ${Token}` } })
        Resp.data.map((encuesta) => {
            const fechaNormalizada = new Date(encuesta.fecha)
            encuesta.fechaNormalizada = fechaNormalizada.toLocaleDateString('es-ES')
            return encuesta
        })
        return Resp.data
    }catch (error) {
        return null
    }
}

export const GetEncuestaID = async (Token, Id) =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.get('encuesta/'+Id, { headers: { Authorization: `Bearer ${Token}` } })
        const fechaNormalizada = new Date(Resp.data.fecha)
        Resp.data.fechaNormalizada = fechaNormalizada.toLocaleString('es-ES')
        return Resp.data
    }catch (error) {
        return null
    }
}

// Encuestas

export const GetAllEncustas = async (Token) =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.get('encuesta', { headers: { Authorization: `Bearer ${Token}` }})
        return Resp.data
    }catch (error) {
        return null
    }
}

export const GetAllQuery = async () =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.get('query')
        return Resp.data
    }catch (error) {
        return null
    }
}

export const CreaQuery = async (Token, NuevaEncuesta) =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.post('encuesta', NuevaEncuesta, { headers: { Authorization: `Bearer ${Token}` } })
        return Resp.data
    }catch (error) {
        return null
    }
}

// Login
export const Login = async (dorsal,password) =>{
    const AxiosAPI = GetAxiosAPI()
    try{
        const Resp = await AxiosAPI.post('login',{dorsal,password})
        return Resp.data
    }catch (error) {
        return null
    }
}