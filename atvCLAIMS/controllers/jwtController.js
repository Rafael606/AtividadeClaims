const jwt = require('jsonwebtoken');

const SECRET_KEY = 'your_secret_key'; // Substitua por uma chave secreta segura

// Função que lista todas as claims que podem existir em um JWT
const listarClaimsJWT = (req, res) => {
  const claims = {
    "iss": "Quem emitiu o token.",
    "sub": "Quem o token representa.",
    "exp": "Quando o token expira.",
    "iat": "Quando o token foi criado.",
    "jti": "ID único do token."
  };

  res.json({ claims });
};

// Função que retorna o ID, a data de geração e a expiração de um token JWT
const obterInfoToken = (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ erro: 'Token não foi fornecido.' });
  }

  try {
    const dadosDecodificados = jwt.verify(token, SECRET_KEY);

    const informacoesToken = {
      id: dadosDecodificados.jti || 'ID não disponível', // 'jti' contém o ID do token
      criadoEm: new Date(dadosDecodificados.iat * 1000), // Converte timestamp para data legível
      expiraEm: new Date(dadosDecodificados.exp * 1000)  // Converte timestamp para data legível
    };

    res.json(informacoesToken);

  } catch (erro) {
    res.status(400).json({ erro: 'Token inválido ou expirado.' });
  }
};

// Função para gerar um JWT com jti, iat e exp
const gerarTokenJWT = (req, res) => {
  const token = jwt.sign(
    {
      jti: Math.floor(Math.random() * 1000000), // ID único gerado aleatoriamente
      iat: Math.floor(Date.now() / 1000), // Data de criação do token (em segundos)
      exp: Math.floor(Date.now() / 1000) + 60 * 60 // Token expira em 1 hora
    },
    SECRET_KEY
  );

  res.json({ token });
};

module.exports = { listarClaimsJWT, obterInfoToken, gerarTokenJWT };
