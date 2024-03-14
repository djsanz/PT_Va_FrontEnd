import React from 'react';
import { useNavigate } from "react-router-dom";

const ListadoEncuestas = ({ ListadoFechas }) => {
  const FechaHoy = new Date();
  const DateOptions = { year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'long' }
  const navigate = useNavigate();
  return (
    <div>
      {
        ListadoFechas?.map((item, index) => {
          if (item.Encuesta) {
            return (
              <div key={index} className="border text-left flex-row flex rounded-xl mt-2 cursor-pointer hover:text-gray-300 hover:opacity-60 hover:bg-gray-900 border-green-400 bg-gray-400">
                <div className="flex-1 ml-2" onClick={() => navigate('/VerEncuesta/' + item.Encuesta._id)}>
                  {item.Fecha} - Correcta
                </div>
              </div>
            )
          } else if (item.Fecha === FechaHoy.toLocaleDateString('es-ES', DateOptions)) {
            return (
              <div key={index} className="border text-left flex-row flex rounded-xl mt-2 cursor-pointer hover:opacity-60 hover:text-gray-300 hover:bg-gray-900 border-violet-500 bg-gray-400">
                <div className="flex-1 ml-2" onClick={() => navigate('/NuevaEncuesta')}>
                  {item.Fecha} - {item.Encuesta ? 'Correcta' : <span className="text-green-400 font-bold">Pendiente</span>}
                </div>
              </div>
            )
          } else {
            return (
              <div key={index} className="border text-left flex-row flex rounded-xl mt-2 cursor-not-allowed border-red-600 bg-gray-400">
                <div className="flex-1 ml-2">
                  {item.Fecha} - <span className="text-red-500 font-bold">Sin realizar</span>
                </div>
              </div>
            )
          }
        })
      }
    </div>
  )
};

export default ListadoEncuestas;
