import React, { createContext, useState } from 'react';
import { GetDebugLvl } from '../config/Entorno'

const UserContext = createContext();
const DebugLvl = GetDebugLvl()

const UserProvider = ({ children }) => {
    // Usuario
    const UserInicitalState = {
        _id: null,
        dorsal: null,
        nombre: null,
        posicion: null,
        token: null
    }

    const [userCtx, setuserCtx] = useState(UserInicitalState);

    const loginCtx = (Data) => {
        if (DebugLvl >= 2){console.log("UserContext: loginCtx() Data ->",Data)}
        try {
            setuserCtx({
                _id: Data._id,
                dorsal: Data.dorsal,
                nombre: Data.nombre,
                posicion: Data.posicion,
                token: Data.token
            });
            return true
        }catch{
            return false
        }
    }

    const logoutCtx = () => {
        if (DebugLvl >= 2){console.log("UserContext: logoutCtx()")}
        setuserCtx(UserInicitalState);
    }

    // Exportaciones
    const data = {
        userCtx,
        loginCtx,
        logoutCtx
    };

    return (
        <UserContext.Provider value={data}>
            {children}
        </UserContext.Provider>
    )
}

export { UserProvider }
export default UserContext;