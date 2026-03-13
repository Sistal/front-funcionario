import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/common/ProtectedRoute'
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import MisSolicitudes from "./pages/MisSolicitudes";
import Cambio from "./pages/Cambio";
import Seguimientos from "./pages/Seguimientos";
import Sucursal from "./pages/Sucursal";
import MiCuenta from "./pages/MiCuenta";
import Notificaciones from "./pages/Notificaciones";
import RegistroFuncionario from './pages/RegistroFuncionario';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/registro-funcionario" element={
            <ProtectedRoute allowWithoutFuncionario>
              <RegistroFuncionario />
            </ProtectedRoute>
          } />

          <Route path="/" element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<HomePage />} />
            <Route path="mis-solicitudes" element={<MisSolicitudes />} />
            <Route path="cambio" element={<Cambio />} />
            <Route path="seguimientos" element={<Seguimientos />} />
            <Route path="sucursal" element={<Sucursal />} />
            <Route path="mi-cuenta" element={<MiCuenta />} />
            <Route path="notificaciones" element={<Notificaciones />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
