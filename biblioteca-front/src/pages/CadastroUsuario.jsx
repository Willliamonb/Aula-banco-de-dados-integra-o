import { useState } from "react";
import axios from "axios";
import "./CadastroUsuario.css";

function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [perfil, setPerfil] = useState("USUARIO");

  async function handleSubmit(evento) {
    evento.preventDefault();

    try {
      const resposta = await axios.post(
        "http://localhost:3000/api/usuarios",
        {
          nome,
          email,
          senha,
          perfil
        }
      );

      console.log("Usuário cadastrado:", resposta.data);

      alert("Usuário cadastrado com sucesso!");

      // Limpa o formulário
      setNome("");
      setEmail("");
      setSenha("");
      setPerfil("USUARIO");

    } catch (erro) {
      console.error("Erro ao cadastrar usuário:", erro);

      if (erro.response) {
        console.error("Resposta do servidor:", erro.response.data);

        alert(
          erro.response.data.mensagem ||
          "Erro ao cadastrar usuário."
        );
      } else {
        alert(
          "Não foi possível conectar com o servidor."
        );
      }
    }
  }

  return (
    <div className="cadastro">
      <form
        className="cadastro__ficha"
        onSubmit={handleSubmit}
      >
        <h1>Novo cadastro</h1>

        <p className="cadastro__epigrafe">
          Preencha os dados para criar uma conta na biblioteca.
        </p>

        <div className="campo">
          <label htmlFor="nome">Nome</label>

          <input
            id="nome"
            type="text"
            value={nome}
            onChange={(evento) =>
              setNome(evento.target.value)
            }
            autoComplete="name"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="email">E-mail</label>

          <input
            id="email"
            type="email"
            value={email}
            onChange={(evento) =>
              setEmail(evento.target.value)
            }
            autoComplete="email"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="senha">Senha</label>

          <input
            id="senha"
            type="password"
            value={senha}
            onChange={(evento) =>
              setSenha(evento.target.value)
            }
            autoComplete="new-password"
            required
          />
        </div>

        <div className="campo">
          <label htmlFor="perfil">Perfil</label>

          <select
            id="perfil"
            value={perfil}
            onChange={(evento) =>
              setPerfil(evento.target.value)
            }
          >
            <option value="USUARIO">
              Usuário (leitor)
            </option>

            <option value="FUNCIONARIO">
              Funcionário
            </option>
          </select>
        </div>

        <button
          type="submit"
          className="botao-primario"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

export default CadastroUsuario;

