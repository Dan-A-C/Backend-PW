const express = require('express');
const router = express.Router();
const { Producto } = require('../../db/models');

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const nuevoProducto = await Producto.create(req.body);
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
});

module.exports = router;
