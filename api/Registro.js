const express = require('express');
const db = require('../db/models/index.js');
const Producto = require('../db/models/producto.js');
const Pedido = require('../db/models/pedido.js');
const admin = require('../db/models/admin.js');
const Cliente = require('../db/models/cliente.js'); // Importa el modelo Cliente

const app = express();
const PORT = process.env.PORT || 3000; // Asegúrate de haber configurado el puerto

// Middleware para manejar JSON
app.use(express.json());

// Controlador de Registro de Usuario
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await Cliente.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = await Cliente.create({
      username,
      email,
      password // Sin encriptar la contraseña
    });

    res.json({ msg: 'Usuario registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar el usuario:', error);
    res.status(500).json({ error: 'Error del servidor al registrar el usuario' });
  }
};

// Ruta para el registro de usuario
app.post('/api/auth/register', registerUser);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

module.exports = app;
