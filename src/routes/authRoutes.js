const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const JWT_SECRET = process.env.JWT_SECRET;

async function register(data) {
  const hash = await bcrypt.hash(data.senha, 10);

  const user = await prisma.usuarios.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha_hash: hash,
      perfil: 'CLIENTE'
    }
  });

  return user;
}

async function login(email, senha) {
  const user = await prisma.usuarios.findUnique({
    where: { email }
  });

  if (!user) {
    throw new Error('Usuário não encontrado');
  }

  const passwordMatch = await bcrypt.compare(senha, user.senha_hash);

  if (!passwordMatch) {
    throw new Error('Senha inválida');
  }

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      perfil: user.perfil
    },
    JWT_SECRET,
    { expiresIn: '1d' }
  );

  return { token, user };
}

module.exports = {
  register,
  login
};const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;