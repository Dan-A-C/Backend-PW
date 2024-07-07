const express = require('express');
const { Producto } = require('../../db/models');
const router = express.Router();

// Crear un nuevo producto
router.post('/', async (req, res) => {
  try {
    const producto = await Producto.create(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los productos
router.get('/', async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un producto por ID
router.get('/:id', async (req, res) => {
  try {
    const producto = await Producto.findByPk(req.params.id);
    if (producto) {
      res.status(200).json(producto);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un producto por ID
router.put('/:id', async (req, res) => {
  try {
    const [actualizado] = await Producto.update(req.body, {
      where: { id: req.params.id }
    });
    if (actualizado) {
      const productoActualizado = await Producto.findByPk(req.params.id);
      res.status(200).json(productoActualizado);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un producto por ID
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Producto.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
