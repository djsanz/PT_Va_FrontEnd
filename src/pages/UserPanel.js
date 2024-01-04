import React, { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import ImageLoader from "../render/ImagenLoader";
import { GetDebugLvl } from "../config/Entorno";
import { GetEncuestasUser } from '../components/Api';
import ListadoEncuestas from '../components/ListadoEncuestas';
import GraficasJugador from '../components/GraficasJugador';
import GraficasAdmin from '../components/GraficasAdmin';

export default function UserPanel() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  if (DebugLvl >= 2) console.log("Carga: UserPanel");
  const { userCtx, logoutCtx } = useContext(UserContext)
  const DateOptions = {year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long'}
  const Imagen = require(`../images/Jugadores/${userCtx.dorsal}.png`)
  const [EncuestasRealizadas, setEncuestasRealizadas] = useState(null);
  const [ListadoFechas, setListadoFechas] = useState(null);

  const GetEncuestasRealizadas = async () => {
    const response = await GetEncuestasUser(userCtx.token)
    if (DebugLvl >= 2) console.log("Encuestas:",response)
    setEncuestasRealizadas(response);
    const fechas = [];
    for (let i = 0; i < 10; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      fechas.push({
        Fecha:fecha.toLocaleDateString('es-ES',DateOptions),
        Encuesta:response.find(encuesta => encuesta.fechaNormalizada === fecha.toLocaleDateString('es-ES'))
      });
    }
    if (DebugLvl >= 2) console.log("Fechas:",fechas)
    setListadoFechas(fechas);
  }

  useEffect(() => {
    if (!EncuestasRealizadas) GetEncuestasRealizadas()
  });

  return (
    <div className="mt-4 text-center flex-1 overflow-hidden mx-2">
      <div className="border border-violet-500 text-left flex-row flex rounded-xl p-1">
        <ImageLoader src={Imagen} alt={`Imagen ${userCtx.dorsal}`} className=" h-20"/>
        <div className="flex-col align-middle">
          <div className="flex whitespace-nowrap">
            {userCtx.dorsal} - {userCtx.nombre}
          </div>
          <div className="flex justify-center pt-1">
            <button className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded" onClick={() => logoutCtx()}>Logout</button>
          </div>
        </div>
      </div>
      {
        userCtx.dorsal !== 0
        ? <>
            <div>
              <ListadoEncuestas ListadoFechas={ListadoFechas} />
            </div>
            <div className="my-2">
              <GraficasJugador Encuestas={EncuestasRealizadas}/>
            </div>
          </>
        : <>
            <div>
              <GraficasAdmin />
            </div>
          </>
      }
    </div>
  );
}
