const express = require('express');
const router = express.Router();
const { Serie } = require('../../db/models');

// Obtener todas las series
router.get('/series', async (req, res) => {
  try {
    const series = await Serie.findAll();
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las series' });
  }
});

module.exports = router;
