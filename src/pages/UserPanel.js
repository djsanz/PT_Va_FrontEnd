import React, { useContext, useState, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import ImageLoader from "../render/ImagenLoader";
import { GetDebugLvl } from "../config/Entorno";
import { GetEncuestasUser } from '../components/Api';
import { useNavigate } from "react-router-dom";

export default function UserPanel() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  if (DebugLvl >= 2) console.log("Carga: UserPanel");
  const { userCtx, logoutCtx } = useContext(UserContext)
  const navigate = useNavigate();
  const FechaHoy = new Date();
  const Imagen = require(`../images/Jugadores/${userCtx.dorsal}.png`)
  const [EncuestasRealizadas, setEncuestasRealizadas] = useState(null);
  const [ListadoFechas, setListadoFechas] = useState(null);

  const GetEncuestasRealizadas = async () => {
    const response = await GetEncuestasUser(userCtx.token)
    if (DebugLvl >= 2) console.log("Encuestas:",response)
    setEncuestasRealizadas(response);
    const fechas = [];
    for (let i = 0; i < 15; i++) {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() - i);
      fechas.push({
        Fecha:fecha.toLocaleDateString('es-ES'),
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
        <div className="w-full text-center self-center">
          {/* {
            !GetEncuestaFecha(FechaHoy)
            ? <button className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded" onClick={() => navigate('/VerEncuesta/31')}>Encuesta de Hoy</button>
            : <></>
          } */}
        </div>
      </div>
      <div>
      {
        ListadoFechas?.map((item, index) => (
            <div key={index} className={`border text-left flex-row flex rounded-xl mt-2 cursor-pointer hover:opacity-60 hover:bg-gray-500 ${item.Encuesta ? 'border-green-400' : 'border-red-600 bg-slate-800'}`}>
               <div className="flex-1 ml-2" onClick={() => navigate(`${item.Encuesta ? '/VerEncuesta/'+item.Encuesta._id : '/NuevaEncuesta'}`)}>
                    {item.Fecha} - {item.Encuesta ? 'Correcta' : <span className="text-red-500 font-bold">Sin realizar</span>}
              </div>
            </div>
        ))
      }
      </div>
    </div>
  );
}
