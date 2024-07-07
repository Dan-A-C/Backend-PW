const express = require('express');
const router = express.Router();
const { Usuario, Pedido } = require('../../models');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      include: [Pedido]
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Obtener detalles de un usuario
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id, {
      include: [Pedido]
    });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los detalles del usuario' });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const usuario = await Usuario.create(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.update(req.body);
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el usuario' });
  }
});

// Eliminar un usuario
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    await usuario.destroy();
    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
});

module.exports = router;
