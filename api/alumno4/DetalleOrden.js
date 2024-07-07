const express = require('express');
const router = express.Router();
const { Pedido } = require('../../db/models');

// Obtener detalles de una orden
router.get('/pedido/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (!pedido) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(pedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles del pedido' });
  }
});

module.exports = router;
