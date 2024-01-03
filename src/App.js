import { GetDebugLvl } from './config/Entorno'
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext"
import './idiomas/i18n';
import './App.css';
import { ProtectedRoute } from './hooks/LoginHook'
import NavBar from './components/NavBar';
import PieBar from './components/PieBar';
import Home from './pages/Home'
import PageVerEncuesta from './pages/VerEncuesta';
import PageNuevaEncuesta from './pages/NuevaEncuesta';
import PageUserPanel from './pages/UserPanel';

export default function App() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();

  return (
    <div className="App bg-black text-white min-h-screen flex flex-col text-center overflow-x-auto ">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/UserPanel" element={<ProtectedRoute> <PageUserPanel/> </ProtectedRoute>} />
          <Route path="/NuevaEncuesta" element={<ProtectedRoute><PageNuevaEncuesta/></ProtectedRoute>} />
          <Route path="/VerEncuesta/:idEncuesta" element={<ProtectedRoute><PageVerEncuesta/></ProtectedRoute>} />
          <Route path="*" element={<Home/>} />
        </Routes>
        <PieBar />
      </UserProvider>
    </div>
  );
}
