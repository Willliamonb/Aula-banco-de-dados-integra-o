import conexao from "../config/db.js";

export const listarLivros = async (req, res) => {
    try {
        const [livros] = await conexao.query(
            "SELECT * FROM livros"
        );

        console.log("Livros encontrados no banco:", livros);

        res.json(livros);

    } catch (erro) {
        console.error("Erro ao listar livros:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
};

export const buscarLivro = async (req, res) => {
    try {
        const [resultado] = await conexao.query(
            "SELECT * FROM livros WHERE id_livro = ?",
            [req.params.id]
        );

        if (resultado.length === 0) {
            return res.status(404).json({
                mensagem: "Livro não encontrado :("
            });
        }

        res.json(resultado);

    } catch (erro) {
        console.error("Erro ao buscar livro:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
};

export const adicionarLivro = async (req, res) => {
    try {
        const {
            titulo_livro,
            autor_livro,
            genero_livro
        } = req.body;

        await conexao.query(
            "INSERT INTO livros (titulo_livro, autor_livro, genero_livro) VALUES (?, ?, ?)",
            [titulo_livro, autor_livro, genero_livro]
        );

        res.status(201).json({
            mensagem: "Livro cadastrado com sucesso!"
        });

    } catch (erro) {
        console.error("Erro ao adicionar livro:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
};

export const atualizarLivro = async (req, res) => {
    try {
        const {
            titulo_livro,
            autor_livro,
            genero_livro
        } = req.body;

        await conexao.query(
            "UPDATE livros SET titulo_livro = ?, autor_livro = ?, genero_livro = ? WHERE id_livro = ?",
            [
                titulo_livro,
                autor_livro,
                genero_livro,
                req.params.id
            ]
        );

        res.status(200).json({
            mensagem: "Livro atualizado!"
        });

    } catch (erro) {
        console.error("Erro ao atualizar livro:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
};

export const deletarLivro = async (req, res) => {
    try {
        await conexao.query(
            "DELETE FROM livros WHERE id_livro = ?",
            [req.params.id]
        );

        res.status(200).json({
            mensagem: "Livro apagado!"
        });

    } catch (erro) {
        console.error("Erro ao deletar livro:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
};