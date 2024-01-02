// PlayerCard.js
import React from 'react';
import ImageLoader from "../render/ImagenLoader";

const PlayerCard = ({ jugador }) => {
  const Imagen = require(`../images/Jugadores/${jugador.dorsal}.png`)
  return (
    <div className="bg-gray-500 p-2 rounded-lg">
      <ImageLoader src={Imagen} alt={`Imagen ${jugador.dorsal}`} className="h-48"/>
      <p className="text-center mt-2">{jugador.dorsal} - {jugador.nombre}</p>
    </div>
  );
};

export default PlayerCard;
