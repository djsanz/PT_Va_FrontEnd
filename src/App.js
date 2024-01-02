import { GetDebugLvl } from './config/Entorno'
import { Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext"
import './idiomas/i18n';
import './App.css';
import { ProtectedRoute } from './hooks/LoginHook'
import NavBar from './components/NavBar';
import PieBar from './components/PieBar';
import Home from './pages/Home'
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';

export default function App() {
  // eslint-disable-next-line
  const DebugLvl = GetDebugLvl();

  return (
    <div className="App bg-black text-white min-h-screen flex flex-col text-center overflow-x-clip">
      <UserProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/Page1" element={<Page1/>} />
          <Route path="/Page2" element={<Page2/>} />
          <Route path="/Page3" element={<ProtectedRoute> <Page3/> </ProtectedRoute>} />
          <Route path="*" element={<Home/>} />
        </Routes>
        <PieBar />
      </UserProvider>
    </div>
  );
}
