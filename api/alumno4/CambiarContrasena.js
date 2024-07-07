const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Usuario } = require('../../db/models');

// Ruta para cambiar la contraseña
router.post('/cambiar-contrasena', async (req, res) => {
  const { contrasenaActual, nuevaContrasena } = req.body;
  const userId = 1; // Cambia esto para obtener el ID del usuario desde el token de autenticación

  try {
    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esValida = await bcrypt.compare(contrasenaActual, usuario.contrasena);
    if (!esValida) {
      return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    }

    const hash = await bcrypt.hash(nuevaContrasena, 10);
    usuario.contrasena = hash;
    await usuario.save();

    res.status(200).json({ mensaje: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
});

module.exports = router;
