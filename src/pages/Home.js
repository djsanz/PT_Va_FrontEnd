import React from "react";
import { GetDebugLvl } from "../config/Entorno";
import { useTranslation } from 'react-i18next';
import ImageLoader from "../render/ImagenLoader";
import Logo from "../images/logo.png";

export default function Home() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  if (DebugLvl >= 2) console.log("Carga: Home");
  const { t } = useTranslation();

  return (
    <div className="mt-4 text-center flex-1 overflow-hidden">
      <h1 className="text-3xl font-bold underline">{t("Home")}</h1>
	  <div className="flex-1">
	  	<ImageLoader src={Logo} alt="Test" className="h-48"/>
	  </div>
    </div>
  );
}
