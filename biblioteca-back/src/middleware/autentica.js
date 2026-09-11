// Verifica se quem está fazendo a requisição está logado
import jwt from "jsonwebtoken";

const autenticar = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        return res.status(401).json({
            mensagem: "Token não fornecido. Faça login para continuar!"
        });
    }

    const [tipo, token] = authHeader.split(" ");

    if (tipo !== "Bearer" || !token) {
        return res.status(401).json({
            mensagem: "Formato de token inválido"
        });
    }

    try {
        const dadosUsuario = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.usuario = dadosUsuario;

        next();

    } catch (erro) {
        return res.status(401).json({
            mensagem: "Token inválido ou expirado"
        });
    }
};

export default autenticar;