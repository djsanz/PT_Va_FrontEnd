import React, { useContext, useEffect } from "react";
import UserContext from '../contexts/UserContext';
import ImageLoader from "../render/ImagenLoader";
import { GetDebugLvl } from "../config/Entorno";

export default function UserPanel() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  const { userCtx, logoutCtx } = useContext(UserContext)
  const Imagen = require(`../images/Jugadores/${userCtx.dorsal}.png`)
  if (DebugLvl >= 2) console.log("Carga: UserPanel");

  return (
    <div className="mt-4 text-center flex-1 overflow-hidden">
      <div className="border border-violet-500 text-left flex-row flex rounded-xl">
        <ImageLoader src={Imagen} alt={`Imagen ${userCtx.dorsal}`} className=" h-20"/>
        <div>
          <div>
            {userCtx.dorsal} - {userCtx.nombre}
          </div>
          <div>
            <button className="bg-red-500 hover:bg-red-700 text-white text-sm font-bold p-1 rounded" onClick={() => logoutCtx()}>Logout</button>
          </div>
        </div>
      </div>
      <div>
        Encuestas
      </div>
    </div>
  );
}
