/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../contexts/UserContext';
import { GetEncuestasUser, GetAllQuery } from '../components/Api';
import GraficaTarta from '../components/GraficaTarta';
import GraficaLineas from '../components/GraficaLineas';

const GraficasJugador = () => {
  const { userCtx } = useContext(UserContext)
  const [EncuestasJugador, setEncuestasJugador] = useState(null);
  const [Querys, setQuerys] = useState(null);
  const [PieData, setPieData] = useState(null);
  const [LineData, setLineData] = useState(null);
  
  const GetEncuestasJugador = async () => {
    const response = await GetEncuestasUser(userCtx.token)
    setEncuestasJugador(response)
  }

  const GetQuerys = async () => {
    const response = await GetAllQuery()
    setQuerys(response)
  }

  function GetNombresPreguntas() {
    const NombresPreguntas = [];
    Querys.map((query) => {
      if (!NombresPreguntas.includes(query.pregunta)) NombresPreguntas.push(query.pregunta)
      return query
    })
    return NombresPreguntas
  }

  function GetTotalPreguntas() {
    const TotalPreguntas = [];
    for (const Encuesta of EncuestasJugador) {
      for (const Respuesta of Encuesta.respuestas) {
        if (!TotalPreguntas[Respuesta.queryId.orden]) TotalPreguntas[Respuesta.queryId.orden] = 0
        TotalPreguntas[Respuesta.queryId.orden] += Respuesta.respuesta
      }
    }
    return TotalPreguntas
  }

  function GetListaFechas() {
    const ListaFechas = [];
    for (const Encuesta of EncuestasJugador) {
      if (!ListaFechas.includes(Encuesta.fechaNormalizada)) ListaFechas.push(Encuesta.fechaNormalizada)
    }
    return ListaFechas
  }

  const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ]

  const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ]

  function GetDataSetsLineas() {
    const DataSetsLineas = [];
    const labels = GetNombresPreguntas()
    for (var i=0;i<labels.length;i++) {
      DataSetsLineas.push({
        label:labels[i],
        data: [],
        borderColor: borderColor[i],
        backgroundColor: backgroundColor[i]
      })
    }
    for (const Encuesta of EncuestasJugador) {
      for (const Respuesta of Encuesta.respuestas) {
        DataSetsLineas[Respuesta.queryId.orden].data.push(Respuesta.respuesta +1)
      }
    }
    return DataSetsLineas
  }

  useEffect(() => {
    if (!EncuestasJugador) GetEncuestasJugador()
    if (!Querys) GetQuerys()
  });

  useEffect(() => {
    if ((EncuestasJugador) && (Querys)) {
      setPieData({labels:GetNombresPreguntas(),data:GetTotalPreguntas()})
      setLineData({labels:GetListaFechas(),datasets:GetDataSetsLineas()})
    }
  }, [EncuestasJugador, Querys]);

  return (
    <div className='flex flex-1 flex-col md:flex-row'>
        <div className='border-2 border-violet-500 rounded-lg flex'>
          {
            PieData
            ? <GraficaTarta data={PieData} />
            : <></>
          }
        </div>
        <div className='border-2 border-violet-500 rounded-lg mt-2 md:mt-0 ml-0 md:ml-2 flex flex-1 overflow-x-auto'>
          {
            LineData
            ? <GraficaLineas data={LineData}/>
            : <></>
          }
        </div>
    </div>
  );
};

export default GraficasJugador;
