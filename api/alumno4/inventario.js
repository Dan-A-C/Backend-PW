const express = require('express');
const router = express.Router();
const { Inventario } = require('../../db/models');

// Obtener todo el inventario
router.get('/', async (req, res) => {
  try {
    const inventario = await Inventario.findAll();
    res.json(inventario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el inventario' });
  }
});

// Crear un nuevo registro de inventario
router.post('/', async (req, res) => {
  try {
    const nuevoInventario = await Inventario.create(req.body);
    res.status(201).json(nuevoInventario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el inventario' });
  }
});

module.exports = router;
