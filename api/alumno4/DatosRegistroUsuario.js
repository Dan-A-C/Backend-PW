const express = require('express');
const router = express.Router();
const { Usuario } = require('../../db/models');

// Obtener datos del usuario
router.get('/usuario/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los datos del usuario' });
  }
});

// Actualizar datos del usuario
router.put('/usuario/:id', async (req, res) => {
  try {
    const [updated] = await Usuario.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const updatedUsuario = await Usuario.findByPk(req.params.id);
    res.json(updatedUsuario);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar los datos del usuario' });
  }
});

module.exports = router;
