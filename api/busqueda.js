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


// Agregar producto a la busqueda
router.post('/', async (req, res) => {
    const { name, brand, series, price, image, description, features } = req.body;
    try {
        const nuevoProducto = await Producto.create({ name, brand, series, price, image, description, features });
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al agregar el producto' });
    }
});

module.exports = router;
