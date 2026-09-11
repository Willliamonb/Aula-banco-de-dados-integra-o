// FUNÇÕES QUE EXECUTAM O TRABALHO (GET, POST, DELETE, PUT, PATCH)

import conexao from "../config/db.js";
import jwt from "jsonwebtoken";

// LISTAR USUÁRIOS
export const listarUsuarios = async (req, res) => {
    try {
        const [usuarios] = await conexao.query(
            "SELECT * FROM usuarios"
        );

        res.status(200).json(usuarios);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};


// BUSCAR USUÁRIO
export const buscarUsuario = async (req, res) => {
    try {
        const [usuario] = await conexao.query(
            "SELECT * FROM usuarios WHERE id = ?",
            [req.params.id]
        );

        if (usuario.length === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.status(200).json(usuario[0]);

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};


// CADASTRAR USUÁRIO
export const cadastrarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        await conexao.query(
            `
            INSERT INTO usuarios
            (
                nome,
                email,
                senha,
                perfil
            )
            VALUES (?, ?, ?, ?)
            `,
            [nome, email, senha, perfil]
        );

        res.status(201).json({
            mensagem: "Usuário cadastrado com sucesso!"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};


// ATUALIZAR USUÁRIO
export const atualizarUsuario = async (req, res) => {
    try {
        const { nome, email, senha, perfil } = req.body;

        await conexao.query(
            `
            UPDATE usuarios
            SET
                nome = ?,
                email = ?,
                senha = ?,
                perfil = ?
            WHERE id = ?
            `,
            [
                nome,
                email,
                senha,
                perfil,
                req.params.id
            ]
        );

        res.status(200).json({
            mensagem: "Usuário atualizado com sucesso!"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};


// EXCLUIR USUÁRIO
export const excluirUsuario = async (req, res) => {
    try {
        await conexao.query(
            "DELETE FROM usuarios WHERE id = ?",
            [req.params.id]
        );

        res.status(200).json({
            mensagem: "Usuário removido com sucesso!"
        });

    } catch (erro) {
        res.status(500).json({
            erro: erro.message
        });
    }
};


// LOGIN
export const login = async (req, res) => {
    try {
        const { email, senha } = req.body;

        console.log("Tentativa de login:", email);

        const [usuario] = await conexao.query(
            `
            SELECT *
            FROM usuarios
            WHERE email = ?
            AND senha = ?
            `,
            [email, senha]
        );

        // Verifica se encontrou o usuário
        if (usuario.length === 0) {
            console.log("Usuário ou senha inválidos");

            return res.status(401).json({
                mensagem: "Usuário ou senha inválidos."
            });
        }

        // Dados que serão colocados no token
        const payLoad = {
            id: usuario[0].id,
            nome: usuario[0].nome,
            perfil: usuario[0].perfil
        };

        // Cria o token
        const token = jwt.sign(
            payLoad,
            process.env.jwt_secret,
            {
                expiresIn: process.env.JWT_EXPIRES_IN
            }
        );

        console.log("Login realizado com sucesso:", email);

        res.status(200).json({
            mensagem: "Login realizado com sucesso",
            token: token,
            usuario: payLoad
        });

    } catch (erro) {
        console.error("ERRO NO LOGIN:", erro);

        res.status(500).json({
            erro: erro.message
        });
    }
};