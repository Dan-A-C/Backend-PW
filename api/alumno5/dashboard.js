const express = require('express');
const { Pedido } = require('../../db/models'); 

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const pedidos = await pedido.findAll();
    res.status(200).json({ orders: pedidos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;