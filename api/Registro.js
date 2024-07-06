// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const { Sequelize, DataTypes } = require('sequelize');

// Inicializar Express
const app = express();
const PORT = process.env.PORT || 5000;

// Configurar Sequelize con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definir el modelo de Usuario
const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Conectar Sequelize a la base de datos y sincronizar los modelos
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida correctamente con la base de datos.');

    // Sincronizar los modelos con la base de datos
    await sequelize.sync({ force: false });
    console.log('Modelos sincronizados correctamente con la base de datos.');
  } catch (error) {
    console.error('Error al conectar y sincronizar con la base de datos:', error);
  }
})();

// Controlador de Registro de Usuario
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crear un nuevo usuario
    const newUser = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10) // Encriptar la contraseña
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
