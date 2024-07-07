const express = require('express');
const router = express.Router();
const { Usuario } = require('../../db/models');

// Obtener todos los usuarios
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
  try {
    const nuevoUsuario = await Usuario.create(req.body);
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
});

module.exports = router;
