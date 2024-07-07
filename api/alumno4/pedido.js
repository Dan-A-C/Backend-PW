const express = require('express');
const router = express.Router();
const { Pedido } = require('../../db/models');

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.json(pedidos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
});

// Crear un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const nuevoPedido = await Pedido.create(req.body);
    res.status(201).json(nuevoPedido);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
});

module.exports = router;
