// PlayerCard.js
import React,{useState} from 'react';
import ImageLoader from "../render/ImagenLoader";
import ModalLogin from '../modals/ModalLogin'

const PlayerCard = ({ jugador }) => {
  const Imagen = require(`../images/Jugadores/${jugador.dorsal}.png`)
  const [ShowModalPassword, setShowModalPassword] = useState(false);

  return (
    <div className="bg-gray-500 p-2 rounded-lg hover:bg-violet-500 cursor-pointer" onClick={() => {setShowModalPassword(true)}}>
      {
        ShowModalPassword
          ? (<ModalLogin isOpen={ShowModalPassword} jugador={jugador} closeModal={() => setShowModalPassword(false)}/>)
          : null
      }
      <ImageLoader src={Imagen} alt={`Imagen ${jugador.dorsal}`} className="h-48"/>
      <p className="text-center mt-2">{jugador.dorsal} - {jugador.nombre}</p>
    </div>
  );
};

export default PlayerCard;
