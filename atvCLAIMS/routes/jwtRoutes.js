const express = require('express');
const router = express.Router();
const { listarClaimsJWT, obterInfoToken, gerarTokenJWT } = require('../controllers/jwtController');

// Rota que lista todas as "claims" definidas no JWT
router.get('/claims', listarClaimsJWT);

// Rota que devolve informações específicas do token JWT, como ID, geração e expiração
router.post('/tokeninfo', obterInfoToken);

// Rota que gera um JWT com jti, iat e exp
router.post('/tokenid', gerarTokenJWT);

module.exports = router;
