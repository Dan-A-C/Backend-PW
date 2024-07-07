const express = require('express');
const { Inventario } = require('../../db/models');
const router = express.Router();

// Crear un nuevo inventario
router.post('/', async (req, res) => {
  try {
    const inventario = await Inventario.create(req.body);
    res.status(201).json(inventario);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los inventarios
router.get('/', async (req, res) => {
  try {
    const inventarios = await Inventario.findAll();
    res.status(200).json(inventarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un inventario por ID
router.get('/:id', async (req, res) => {
  try {
    const inventario = await Inventario.findByPk(req.params.id);
    if (inventario) {
      res.status(200).json(inventario);
    } else {
      res.status(404).json({ error: 'Inventario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un inventario por ID
router.put('/:id', async (req, res) => {
  try {
    const [actualizado] = await Inventario.update(req.body, {
      where: { id: req.params.id }
    });
    if (actualizado) {
      const inventarioActualizado = await Inventario.findByPk(req.params.id);
      res.status(200).json(inventarioActualizado);
    } else {
      res.status(404).json({ error: 'Inventario no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un inventario por ID
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Inventario.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Inventario no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
