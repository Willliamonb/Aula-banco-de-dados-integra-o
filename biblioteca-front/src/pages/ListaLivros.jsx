import { useEffect, useState } from 'react';
import api from '../services/api';
import './ListaLivros.css';

function ListaLivros() {
  const [livros, setLivros] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    api.get('/livros')
      .then((res) => {
        console.log('Livros recebidos:', res.data);
        setLivros(res.data);
      })
      .catch((err) => {
        console.error('Erro ao buscar livros:', err);
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  if (carregando) {
    return <p className="carregando">Carregando livros...</p>;
  }

  return (
    <main className="pagina-livros">
      <div className="cabecalho-livros">
        <div>
          <span className="subtitulo">BIBLIOTECA</span>
          <h1>Livros</h1>
          <p>Confira os livros disponíveis no acervo.</p>
        </div>

        <div className="contador">
          <strong>{livros.length}</strong>
          <span>livros</span>
        </div>
      </div>

      {livros.length === 0 ? (
        <div className="vazio">
          <h2>Nenhum livro encontrado</h2>
          <p>Não há livros cadastrados no momento.</p>
        </div>
      ) : (
        <div className="lista-livros">
          {livros.map((livro) => (
            <article className="card-livro" key={livro.id}>
              <div className="capa-livro">
                <span>📖</span>
              </div>

              <div className="info-livro">
                <span className="id-livro">
                  #{livro.id}
                </span>

                <h2>{livro.titulo}</h2>

                <p className="autor">
                  {livro.autor}
                </p>

                <div className="detalhes">
                  <span>
                    📅 {livro.ano_publicacao}
                  </span>

                  <span>
                    ISBN: {livro.isbn}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}

export default ListaLivros;