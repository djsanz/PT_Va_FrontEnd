import React from "react";
import { GetDebugLvl } from "../config/Entorno";

export default function Page3() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();
  if (DebugLvl >= 2) console.log("Carga: Page3");

  return (
    <div className="mt-4 text-center flex-1 overflow-hidden">
      <h1 className="text-3xl font-bold underline">Page 3</h1>
    </div>
  );
}
