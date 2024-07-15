const express = require('express');
const router = express.Router();
const { Cliente } = require('../db/models');

router.post('/', async (req, res) => {
  const { email } = req.body;

  try {
    const cliente = await Cliente.findOne({ where: { correo: email } });

    if (!cliente) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    return res.status(200).json({ message: 'Correo de recuperación enviado correctamente' });
  } catch (error) {
    console.error('Error al recuperar la contraseña:', error);
    return res.status(500).json({ error: 'Error del servidor al procesar la solicitud' });
  }
});

module.exports = router;
