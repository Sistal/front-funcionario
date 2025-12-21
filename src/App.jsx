import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MisSolicitudes from "./pages/MisSolicitudes";
import Cambio from "./pages/Cambio";
import Seguimientos from "./pages/Seguimientos";
import Sucursal from "./pages/Sucursal";
import MiCuenta from "./pages/MiCuenta";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="mis-solicitudes" element={<MisSolicitudes />} />
          <Route path="cambio" element={<Cambio />} />
          <Route path="seguimientos" element={<Seguimientos />} />
          <Route path="sucursal" element={<Sucursal />} />
          <Route path="mi-cuenta" element={<MiCuenta />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
