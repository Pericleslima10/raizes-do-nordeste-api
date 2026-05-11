const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function register(data) {
  const senhaHash = await bcrypt.hash(data.senha, 10);

  const existeUsuario = await prisma.usuarios.findUnique({
    where: { email: data.email }
  });

  if (existeUsuario) {
    throw new Error('E-mail já cadastrado');
  }

  const user = await prisma.usuarios.create({
    data: {
      nome: data.nome,
      email: data.email,
      senha_hash: senhaHash,
      perfil: 'CLIENTE'
    }
  });

return {
  id: user.id.toString(),
  nome: user.nome,
  email: user.email,
  perfil: user.perfil,
  ativo: user.ativo,
  criado_em: user.criado_em
};

}

async function login(data) {
  const user = await prisma.usuarios.findUnique({
    where: { email: data.email }
  });

  if (!user) throw new Error('Usuário não encontrado');

  const senhaOk = await bcrypt.compare(data.senha, user.senha_hash);

  if (!senhaOk) throw new Error('Senha inválida');

  const token = jwt.sign(
    {
      id: user.id.toString(),
      email: user.email,
      perfil: user.perfil
    },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

 return {
  user: {
    id: user.id.toString(),
    nome: user.nome,
    email: user.email,
    telefone: user.telefone,
    perfil: user.perfil,
    ativo: user.ativo,
    criado_em: user.criado_em
  },
  token
};
}

module.exports = {
  register,
  login
};