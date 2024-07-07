const express = require('express');
const router = express.Router();
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

    // Comparar contraseñas sin encriptar (no recomendado en producción)
    if (contrasenaActual !== usuario.contrasena) {
      return res.status(400).json({ error: 'Contraseña actual incorrecta' });
    }

    // Actualizar la contraseña
    usuario.contrasena = nuevaContrasena;
    await usuario.save();

    res.status(200).json({ mensaje: 'Contraseña cambiada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al cambiar la contraseña' });
  }
});

module.exports = router;
