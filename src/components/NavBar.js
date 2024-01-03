import React from 'react';
import { GetDebugLvl } from "../config/Entorno";
import { useTranslation } from 'react-i18next';
import { Navbar } from 'flowbite-react'
import Logo from "../images/logo.png";

export default function NavBar() {
    // eslint-disable-next-line
    const DebugLvl = GetDebugLvl();
    // eslint-disable-next-line
    const { t } = useTranslation();

    return (
        <Navbar fluid rounded class="bg-gray-900 sticky top-0 z-10">
            <React.Fragment key=".0">
                <Navbar.Brand href="/">
                    <img src={Logo} className="m-0 mr-3 h-10" alt="Logo"/>
                    <span className="self-center whitespace-nowrap text-xl font-semibold">{t("Technical Test")}</span>
                </Navbar.Brand>
            </React.Fragment>
        </Navbar>
    );
}