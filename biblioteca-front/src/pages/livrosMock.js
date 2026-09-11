// Dados estáticos só para montar a interface. Na próxima etapa, este
// array vai ser substituído pela resposta de GET /livros via axios —
// por isso o formato dos campos já segue o mesmo shape da tabela
// `livros` do banco (ver livraria.sql), mais um campo "categoria" que
// ainda não existe na tabela e pode virar uma boa discussão em aula
// (precisaria de uma migração no banco).
const livrosMock = [
  {
    id_livro: 1,
    titulo: "Harry Potter e a Pedra Filosofal",
    autor: "J. K. Rowling",
    categoria: "Fantasia",
    ano_publicacao: 1997,
    disponivel: false
  },
  {
    id_livro: 2,
    titulo: "Percy Jackson e os Olimpianos",
    autor: "Rick Riordan",
    categoria: "Fantasia",
    ano_publicacao: 2005,
    disponivel: true
  },
  {
    id_livro: 3,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    categoria: "Tecnologia",
    ano_publicacao: 2008,
    disponivel: true
  },
  {
    id_livro: 4,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    categoria: "Literatura Brasileira",
    ano_publicacao: 1899,
    disponivel: false
  }
];

export default livrosMock;
