const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarPagamento(pedidoId, valor) {
  return await prisma.pagamentos.create({
    data: {
      pedido_id: pedidoId,
      valor,
      status: 'APROVADO',
      transacao_externa: 'MOCK-' + Date.now()
    }
  });
}

module.exports = { criarPagamento };