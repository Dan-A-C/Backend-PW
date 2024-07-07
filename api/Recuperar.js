const express = require('express');
const router = express.Router(); // Añadido para definir router correctamente
const db = require('../db/models/index.js');
const Producto = require('../db/models/producto.js');
const Pedido = require('../db/models/pedido.js');
const Admin = require('../db/models/admin.js');
const Cliente = require('../db/models/cliente.js');

// Ruta para recuperar contraseña
router.post('/recover-password', async (req, res) => {
  const { email } = req.body;

  try {
    // Buscar al usuario por su correo electrónico en la tabla de clientes
    const cliente = await Cliente.findOne({ where: { correo: email } });

    if (!cliente) {
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
