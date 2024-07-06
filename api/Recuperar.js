const express = require('express');
const router = express.Router();
const { User } = require('../models'); // Asegúrate de importar correctamente tu modelo de usuario

// Ruta para recuperar contraseña
router.post('/recover-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar al usuario por su correo electrónico
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Aquí iría la lógica para enviar el correo de recuperación de contraseña
    // Por simplicidad, en este ejemplo solo enviamos un mensaje de éxito
    return res.status(200).json({ message: 'Correo de recuperación enviado correctamente' });
  } catch (error) {
    console.error('Error al recuperar la contraseña:', error);
    return res.status(500).json({ error: 'Error del servidor al procesar la solicitud' });
  }
});

module.exports = router;
