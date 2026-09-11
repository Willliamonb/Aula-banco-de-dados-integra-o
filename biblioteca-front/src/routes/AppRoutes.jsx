import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/Login';
import CadastroUsuario from '../pages/CadastroUsuario';
import ListaLivros from '../pages/ListaLivros';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<CadastroUsuario />} />
      <Route path="/livros" element={<ListaLivros />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default AppRoutes;