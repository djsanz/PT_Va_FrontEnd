import React,{useContext, useState, useEffect} from "react";
import UserContext from '../contexts/UserContext';
import { GetDebugLvl } from "../config/Entorno";
import { GetAllQuery, CreaQuery } from '../components/Api';
import { useNavigate } from "react-router-dom";

export default function NuevaEncuesta() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  const { userCtx } = useContext(UserContext)
  const FechaHoy = new Date();
  if (DebugLvl >= 2) console.log("Carga: NuevaEncuesta");
  const navigate = useNavigate();
  const [Querys, setQuerys] = useState(null)
  const [Listo, setListo] = useState(false)

  const GuardaRespuestas = async () => {
    const respuestas = []
    for (let i = 0; i < Querys.length; i++) {
      respuestas.push({
        queryId: Querys[i]._id,
        respuesta: Querys[i].seleccion
      })
    }
    const NuevaEncuesta = {
      userId: userCtx._id,
      respuestas: respuestas
    }
    await CreaQuery(userCtx.token, NuevaEncuesta)
    navigate('/UserPanel')

  }

  const GetQuerys = async () => {
    const response = await GetAllQuery()
    for (let i = 0; i < response.length; i++) {
      response[i].seleccion = null
    }
    setQuerys(response);
  }

  const ClickOption = (query, indexOpt) => {
    if (query.seleccion !== indexOpt) {
      query.seleccion = indexOpt
      setQuerys([...Querys])
    }else{
      query.seleccion = null
      setQuerys([...Querys])
    }
    ValidarRespuestas()
  }

  const ValidarRespuestas = () => {
      for (let i = 0; i < Querys.length; i++) {
        if (Querys[i].seleccion === null) {
          setListo(false)
          return
        }
      }
      setListo(true)
  }

  useEffect(() => {
    if (!Querys) GetQuerys()
  });

  return (
    <div className="mt-4 text-center flex-1 min-w-fit">
      <h1 className="text-3xl font-bold">{FechaHoy.toLocaleDateString('es-ES')}</h1>
        {
          Querys?.map((query, indexQuery) => {
            return (
              <div key={indexQuery} className="border-2 border-violet-500 rounded-lg my-2 sm:my-4 mx-1 sm:mx-4 flex flex-1 flex-col text-gray-200 bg-slate-700">
                <div className="border-b border-violet-500 rounded-t-lg px-4 flex w-full justify-center self-center sm:mx-2 text-lg lg:text-xl bg-slate-800">
                  {query.pregunta}:
                </div>
                <div className="flex flex-1 justify-center text-xs md:text-lg lg:text-xl">
                  {
                    query.opciones.map((opcion, indexOpt) => {
                      return (
                        <div key={indexOpt} onClick={() => ClickOption(query, indexOpt)} className={`border flex-col justify-center m-1 rounded-xl p-1 cursor-pointer ${query.seleccion !== indexOpt? 'text-gray-300 border-green-600 hover:border-violet-500 hover:bg-gray-800 hover:text-orange-600' : 'hover:text-gray-300 hover:border-green-600 border-violet-500 bg-gray-800 text-orange-600'}`}>
                          <div className="flex justify-center">
                            {indexOpt + 1}
                          </div>
                          <div className="flex justify-center">
                             {opcion}
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
      <div className="flex justify-center">
        {
          Listo
          ? <button onClick={() => GuardaRespuestas()} className="border border-violet-500 bg-green-600 hover:opacity-60 text-white text-2xl font-bold p-1 rounded">Enviar</button>
          : <button disabled className="border border-violet-500 bg-green-600 opacity-60 text-white text-2xl font-bold p-1 rounded disabled:cursor-not-allowed ">Enviar</button>
        }
      </div>
    </div>
  );
}
