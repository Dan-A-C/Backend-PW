const express = require('express');
const router = express.Router();
const { Serie } = require('../../db/models');

// Crear una nueva serie
router.post('/series', async (req, res) => {
  try {
    const nuevaSerie = await Serie.create(req.body);
    res.status(201).json(nuevaSerie);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar la serie' });
  }
});

module.exports = router;
