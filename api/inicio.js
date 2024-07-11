const express = require('express');
const Producto = require('../db/models/producto'); // Asegúrate de la ruta correcta a tu modelo Producto

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

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const { name, brand, series, price, image, description, features } = req.body;
    const nuevoProducto = await Producto.create({
      name,
      brand,
      series,
      price,
      image,
      description,
      features
    });
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, brand, series, price, image, description, features } = req.body;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    await producto.update({
      name,
      brand,
      series,
      price,
      image,
      description,
      features
    });

    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    await producto.destroy();
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
