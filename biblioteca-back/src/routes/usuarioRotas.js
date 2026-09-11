import express from "express";

import {
    listarUsuarios,
    buscarUsuario,
    cadastrarUsuario,
    atualizarUsuario,
    excluirUsuario,
    login
} from "../controllers/usuarioController.js";

const router = express.Router();


// LOGIN
router.post("/login", login);


// USUÁRIOS
router.get("/usuarios", listarUsuarios);

router.get("/usuarios/:id", buscarUsuario);

router.post("/usuarios", cadastrarUsuario);

router.put("/usuarios/:id", atualizarUsuario);

router.delete("/usuarios/:id", excluirUsuario);


export default router;