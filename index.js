const express = require("express");
const cors = require("cors"); // Para evitar problemas de CORS caso precise
const carrosRoutes = require("./routes/carrosRoutes"); // Importa as rotas dos carros

const app = express();

// Middleware para permitir JSON
app.use(cors());
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.send("Servidor rodando! 🚀");
});

// Usar as rotas dos carros
app.use("/api", carrosRoutes);

// Escolha uma porta para rodar o servidor (exemplo: 3000)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
