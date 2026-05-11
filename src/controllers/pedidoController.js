const pedidoService = require('../services/pedidoService');
const pagamentoService = require('../services/pagamentoService');

async function criar(req, res) {
  try {
    // 1. cria pedido
    const pedido = await pedidoService.criarPedido(
      req.body,
      req.user.id
    );

    // 2. pagamento mock
    await pagamentoService.criarPagamento(
      pedido.id,
      pedido.valor_total
    );

    // 3. atualiza status
    await pedidoService.atualizarStatus(
      pedido.id,
      'EM_PREPARO'
    );

    return res.status(201).json({
      message: 'Pedido criado com sucesso',
      pedido
    });

  } catch (err) {
    return res.status(400).json({
      error: err.message
    });
  }
}

module.exports = { criar };