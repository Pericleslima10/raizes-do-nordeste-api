const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function criarPedido(data, userId) {
  // cria pedido base
  const pedido = await prisma.pedidos.create({
    data: {
      cliente_id: userId,
      unidade_id: data.unidade_id,
      canal_pedido: data.canal_pedido,
      forma_pagamento: data.forma_pagamento,
      status: 'AGUARDANDO_PAGAMENTO',
      valor_total: 0
    }
  });

  let total = 0;

  // valida itens + cria pedido_itens
  for (const item of data.itens) {
    const produto = await prisma.produtos.findUnique({
      where: { id: item.produto_id }
    });

    if (!produto) {
      throw new Error('Produto não encontrado');
    }

    const subtotal = produto.preco * item.quantidade;
    total += subtotal;

    await prisma.pedido_itens.create({
      data: {
        pedido_id: pedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: produto.preco,
        subtotal
      }
    });
  }

  // atualiza total
  return await prisma.pedidos.update({
    where: { id: pedido.id },
    data: { valor_total: total }
  });
}
async function atualizarStatus(pedidoId, status) {
  return await prisma.pedidos.update({
    where: { id: pedidoId },
    data: { status }
  });
}

module.exports = { criarPedido };