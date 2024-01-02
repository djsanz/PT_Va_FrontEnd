import React, { createContext, useState } from 'react';
import { GetDebugLvl } from '../config/Entorno'

const UserContext = createContext();
const DebugLvl = GetDebugLvl(0)

const UserProvider = ({ children }) => {
    // Usuario
    const UserInicitalState = {
        account: null
    }

    const [userCtx, setuserCtx] = useState(UserInicitalState);

    const loginCtx = (_Account) => {
        setuserCtx({
            account: _Account
        });
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