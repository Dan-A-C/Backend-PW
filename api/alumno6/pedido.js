const express = require('express');
const { Pedido } = require('../../db/models');
const router = express.Router();

// Crear un nuevo pedido
router.post('/', async (req, res) => {
  try {
    const pedido = await Pedido.create(req.body);
    res.status(201).json(pedido);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los pedidos
router.get('/', async (req, res) => {
  try {
    const pedidos = await Pedido.findAll();
    res.status(200).json(pedidos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un pedido por ID
router.get('/:id', async (req, res) => {
  try {
    const pedido = await Pedido.findByPk(req.params.id);
    if (pedido) {
      res.status(200).json(pedido);
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar un pedido por ID
router.put('/:id', async (req, res) => {
  try {
    const [actualizado] = await Pedido.update(req.body, {
      where: { id: req.params.id }
    });
    if (actualizado) {
      const pedidoActualizado = await Pedido.findByPk(req.params.id);
      res.status(200).json(pedidoActualizado);
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar un pedido por ID
router.delete('/:id', async (req, res) => {
  try {
    const eliminado = await Pedido.destroy({
      where: { id: req.params.id }
    });
    if (eliminado) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Pedido no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
