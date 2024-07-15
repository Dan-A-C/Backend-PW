const express = require('express');
const { Producto } = require('../db/models'); 

const router = express.Router();

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json({ products: productos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});



module.exports = router;
