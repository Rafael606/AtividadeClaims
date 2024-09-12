const express = require('express');
const dotenv = require('dotenv');

// Carrega as variáveis de ambiente definidas no arquivo .env
dotenv.config();

// Importa as rotas relacionadas ao JWT
const jwtRoutes = require('./routes/jwtRoutes');

// Cria a aplicação Express
const app = express();

// Define a porta onde o servidor irá rodar, usando a porta 3000 por padrão
const PORT = process.env.PORT || 80;

// Middleware para lidar com dados JSON
app.use(express.json());

// Conecta as rotas para o caminho /jwt
app.use('/jwt', jwtRoutes);

// Inicia o servidor e exibe uma mensagem para confirmar
app.listen(PORT, () => {
    console.log(`Servidor está rodando na porta ${PORT}`);
});
