import React,{useEffect,useState} from "react";
import { GetDebugLvl } from "../config/Entorno";
import { useTranslation } from 'react-i18next';
import ImageLoader from "../render/ImagenLoader";
import Logo from "../images/logo.png";
import { GetAllUsers } from '../components/Api';
import Card from '../components/card';

export default function Home() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  if (DebugLvl >= 2) console.log("Carga: Home");
  const { t } = useTranslation();
  const [ListaJugadores, setListaJugadores] = useState([]);

  const GetListaJugadores = async () => {
    const response = await GetAllUsers()
    console.log("GetListaJugadores:",response)
    setListaJugadores(response);
  };

  useEffect(() => {
    GetListaJugadores();
  }, []);

  return (
    <div className="mt-4 text-center flex-1 overflow-hidden">
      <h1 className="text-3xl font-bold underline">{t("UserSelection")}</h1>
      <div className="container mx-auto m-2 px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {ListaJugadores.map((item, index) => (
            <Card key={index} jugador={item} />
          ))}
        </div>
      </div>


    </div>
  );
}
