import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');

    try {
      const res = await api.post('/login', { email, senha });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('perfil', res.data.usuario.perfil);

      navigate('/livros');
    } catch (err) {
      setErro('Email ou senha inválidos');
    }
  };

  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-header">
          <h1>Biblioteca</h1>
          <p>Faça login para acessar o sistema</p>
        </div>

        <form onSubmit={handleLogin}>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              required
            />
          </div>

          {erro && (
            <p className="erro">
              {erro}
            </p>
          )}

          <button type="submit">
            Entrar
          </button>

        </form>

      </div>

    </div>
  );
}

export default Login;

