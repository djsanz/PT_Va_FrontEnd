import React,{useContext, useState, useEffect} from "react";
import UserContext from '../contexts/UserContext';
import { useParams } from 'react-router-dom';
import { GetDebugLvl } from "../config/Entorno";
import { GetEncuestaID } from '../components/Api';

export default function VerEncuesta() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  if (DebugLvl >= 2) console.log("Carga: VerEncuesta");
  const { idEncuesta } = useParams()
  const { userCtx } = useContext(UserContext)
  const [Encuesta, setEncuesta] = useState(null)

  const GetEncuesta = async () => {
    const response = await GetEncuestaID(userCtx.token, idEncuesta)
    setEncuesta(response);
  }

  useEffect(() => {
    if (!Encuesta) GetEncuesta()
  });

  return (
    <div className="mt-4 text-center flex-1 overflow-hidden">
      <h1 className="text-3xl font-bold">{Encuesta?.fechaNormalizada}</h1>
      {
        !Encuesta
        ? <></>
        : Encuesta.respuestas.map((respuesta, index) => {
          return (
            <div key={index} className="flex mx-4 justify-center p-2 space-x-2 text-gray-300">
              <div className="text-xl">
                {respuesta.queryId.pregunta}:
              </div>
              <div className="text-xl self-center">
                {respuesta.respuesta + 1} - {respuesta.queryId.opciones[respuesta.respuesta]}
              </div>
            </div>
          )
        })
      }
    </div>
  );
}
