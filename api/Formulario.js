const express = require('express');
const { Cliente } = require('../db/models');

const router = express.Router();

router.post('/', async (req, res) => {
  const { correo, contra } = req.body;

  try {
    const user = await Cliente.findOne({ where: { correo, contra } });
    if (user) {
      return res.json({ msg: 'Autenticación exitosa' });
    } else {
      return res.status(401).json({ msg: 'Credenciales incorrectas' });
    }
  } catch (error) {
    console.error('Error en la autenticación:', error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
});

module.exports = router;
