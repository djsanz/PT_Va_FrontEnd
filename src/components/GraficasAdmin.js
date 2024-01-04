/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useState, useEffect} from 'react';
import UserContext from '../contexts/UserContext';
import { GetAllEncustas, GetAllQuery, GetAllUsers } from './Api';
import GraficaBarrasHotizontal from '../components/GraficaBarrasHotizontal';

const GraficasAdmin = () => {
  const { userCtx } = useContext(UserContext)
  const [EncuestasAll, setEncuestasAll] = useState(null);
  const [Querys, setQuerys] = useState(null);
  const [Jugadores, setJugadores] = useState(null);
  const [BarHorizData, setBarHorizData] = useState(null);

  const GetJugadores = async () => {
    const NombresJugadores = []
    const response = await GetAllUsers()
    for (const jugador of response) {
      if (jugador.dorsal !== 0) NombresJugadores.push(jugador.dorsal +'-'+ jugador.nombre)
    }
    setJugadores(NombresJugadores)
  }

  const GetEncuestasAll = async () => {
    const response = await GetAllEncustas(userCtx.token)
    setEncuestasAll(response)
  }

  const GetQuerys = async () => {
    const response = await GetAllQuery()
    setQuerys(response)
  }

  function GetNombresPreguntas() {
    const NombresPreguntas = [];
    for (const query of Querys) {
      if (!NombresPreguntas.includes(query.pregunta)) NombresPreguntas.push(query.pregunta)
    }
    return NombresPreguntas
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

  function GetJugadorIndex(Texto){
    for (const jugador of Jugadores) {
      if (jugador === Texto) {
        return Jugadores.indexOf(jugador)
      }
    }
    return -1
  }

  function GetDataSetsLineas() {
    const DataSetsLineas = [];
    const labels = GetNombresPreguntas()
    const DataInicial = []
    for (var x=0;x<Jugadores.length;x++) DataInicial.push(0)
    for (var i=0;i<labels.length;i++) {
      DataSetsLineas.push({
        label:labels[i],
        data: [...DataInicial],
        borderColor: borderColor[i],
        backgroundColor: backgroundColor[i]
      })
    }
    for (const Encuesta of EncuestasAll) {
      for (const Respuesta of Encuesta.respuestas) {
        const IndexJugador = GetJugadorIndex(Encuesta.userId.dorsal +'-'+ Encuesta.userId.nombre)
        const Orden = Respuesta.queryId.orden
        const Cantidad = Respuesta.respuesta
        DataSetsLineas[Orden].data[IndexJugador] += Cantidad
      } 
    }
    return DataSetsLineas
  }

  useEffect(() => {
    if (!Jugadores) GetJugadores()
    if (!EncuestasAll) GetEncuestasAll()
    if (!Querys) GetQuerys()
  },[]);

  useEffect(() => {
    if ((EncuestasAll) && (Querys) && (Jugadores)) {
      setBarHorizData(GetDataSetsLineas())
    }
  }, [EncuestasAll, Querys,Jugadores]);

  return (
    <div className='flex flex-1 flex-col md:flex-row border border-violet-500 rounded-xl mt-2'>
      {
        BarHorizData && Jugadores
        ? <GraficaBarrasHotizontal labels={Jugadores} data={BarHorizData} />
        : <></>
      }
    </div>
  );
};

export default GraficasAdmin;
