const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 80;

app.use(express.json());

// Mock user data
const mockUser = {
  username: 'user',
  password: 'password' // Note: In a real app, passwords should be hashed
};

// Endpoint para login
app.post('/jwt/auth', (req, res) => {
  const { username, password } = req.body;

  if (username === mockUser.username && password === mockUser.password) {
    const token = jwt.sign(
      { username },
      process.env.JWT_SECRET, // Chave secreta para assinar o token
      { expiresIn: '1h' } // Expiração do token
    );

    const decoded = jwt.decode(token);
    
    return res.json({
      token_id: token,
      iat: decoded.iat,
      exp: decoded.exp
    });
  }

  return res.status(401).json({ message: 'Credenciais inválidas' });
});

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
};

// Endpoint protegido
app.get('/jwt/produtos', authenticateToken, (req, res) => {
  const produtos = [
    { id: 1, nome: 'Produto 1' },
    { id: 2, nome: 'Produto 2' }
  ];

  res.json(produtos);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
