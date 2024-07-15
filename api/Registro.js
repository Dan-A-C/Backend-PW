const express = require('express');
const { Cliente } = require('../db/models');

const router = express.Router();

router.use(express.json());

router.post('/', async (req, res) => {
  const { nombre, usuario, correo, contra } = req.body;

  try {
    const existingUser = await Cliente.findOne({ where: { correo } });
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    const newUser = await Cliente.create({
      nombre,
      usuario,
      correo,
      contra
    });

    res.json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error del servidor al registrar el usuario' });
  }
});

module.exports = router;
