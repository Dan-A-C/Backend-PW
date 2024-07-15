const express = require('express');
const { Producto } = require('../db/models');

const router = express.Router();

// Ruta para obtener detalles de un producto por su ID
router.get('/:id', async (req, res) => {
  const productId = req.params.id;

  try {
    const producto = await Producto.findByPk(productId);

    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.status(200).json({ product: producto });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
