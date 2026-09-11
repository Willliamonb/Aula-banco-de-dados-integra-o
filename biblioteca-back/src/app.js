import "dotenv/config";
import express from "express";
import cors from "cors";

import livrosRouters from "./routes/livrosRotas.js";
import usuariosRotas from "./routes/usuarioRotas.js";

const app = express();


// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));


// Permite receber JSON
app.use(express.json());


// ROTA PRINCIPAL
app.get("/", (req, res) => {
    res.send("API da livraria funcionando!");
});


// ROTAS DE LIVROS
app.use("/api/livros", livrosRouters);


// ROTAS DE USUÁRIOS E LOGIN
app.use("/api", usuariosRotas);


export default app;