import React, { useContext } from 'react';
import { GetDebugLvl } from "../config/Entorno";
// import { Link } from "react-router-dom";
import UserContext from '../contexts/UserContext';
import { useTranslation } from 'react-i18next';
import { Navbar } from 'flowbite-react'
import Logo from "../images/logo.png";

export default function NavBar() {
    // eslint-disable-next-line
    const DebugLvl = GetDebugLvl();
    // eslint-disable-next-line
    const { userCtx, loginCtx, logoutCtx} = useContext(UserContext)
    // const { t } = useTranslation();

    return (
        <Navbar fluid rounded class="bg-gray-900 sticky top-0 z-10">
            <React.Fragment key=".0">
                <Navbar.Brand>
                {/* <Navbar.Brand href="https://localhost:3000"> */}
                    <img src={Logo} className="m-0 mr-3 h-10" alt="Logo"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold">Prueba Técnica</span>
                </Navbar.Brand>
            </React.Fragment>
        </Navbar>
    );
}