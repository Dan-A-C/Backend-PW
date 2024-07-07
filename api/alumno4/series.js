const express = require('express');
const router = express.Router();
const { Serie } = require('../../db/models');

// Obtener todas las series
router.get('/', async (req, res) => {
  try {
    const series = await Serie.findAll();
    res.json(series);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las series' });
  }
});

// Obtener una serie por ID
router.get('/:id', async (req, res) => {
  try {
    const serie = await Serie.findByPk(req.params.id);
    if (!serie) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }
    res.json(serie);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener la serie' });
  }
});

// Crear una nueva serie
router.post('/', async (req, res) => {
  try {
    const nuevaSerie = await Serie.create(req.body);
    res.status(201).json(nuevaSerie);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la serie' });
  }
});

// Actualizar una serie por ID
router.put('/:id', async (req, res) => {
  try {
    const [updated] = await Serie.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }
    const updatedSerie = await Serie.findByPk(req.params.id);
    res.json(updatedSerie);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar la serie' });
  }
});

// Eliminar una serie por ID
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Serie.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) {
      return res.status(404).json({ error: 'Serie no encontrada' });
    }
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la serie' });
  }
});

module.exports = router;
