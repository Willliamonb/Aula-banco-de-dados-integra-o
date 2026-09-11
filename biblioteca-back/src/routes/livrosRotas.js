import { Router } from "express"

import {
    rotaRaiz,
    listarLivros,
    buscarLivro,
    adicionarLivro,
    atualizarLivro,
    deletarLivro
} from "../controllers/livroController.js"

import autenticar from "../middleware/autentica.js";
import autorizar from "../middleware/autorizar.js";

const router = Router()



router.get("/", autenticar, listarLivros)

router.get("/:id", autenticar, buscarLivro)

router.post("/", autenticar, autorizar("funcionario"), adicionarLivro)

router.patch("/:id", autenticar, autorizar("funcionario"), atualizarLivro)

router.delete("/:id", autenticar, autorizar("funcionario"), deletarLivro)

// router.get("/", rotaRaiz)

// router.get("/livros", autenticar, listarLivros)
// router.get("/livros/:id", autenticar, buscarLivro)

// router.post("/livros", autenticar, autorizar("funcionario"), adicionarLivro)
// router.patch("/livros/:id", autenticar, autorizar("funcionario"), atualizarLivro)
// router.delete("/livros/:id", autenticar, autorizar("funcionario"), deletarLivro)

export default router;