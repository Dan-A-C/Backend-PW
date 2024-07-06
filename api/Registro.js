// Registro.js (backend y frontend combinados)

// Backend (Node.js con Express y MongoDB)
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();

// Conectar a MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/mywebapp', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Modelo de Usuario
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', UserSchema);

// Controlador de Autenticación
const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Verifica si el usuario ya existe
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'El usuario ya existe' });
    }

    // Crea una nueva instancia de usuario
    user = new User({
      username,
      email,
      password
    });

    // Encripta la contraseña
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Guarda el usuario en la base de datos
    await user.save();

    res.json({ msg: 'Usuario registrado correctamente' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

// Rutas de Autenticación
app.post('/api/auth/register', register);

// Frontend (React)
import React, { useState } from 'react';
import Pie from './Pie';
import Cabecera from './Cabecera';
import './Parte1.css';

const Registro = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    usuario: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.usuario,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();
      console.log(data); // Aquí puedes manejar la respuesta del servidor
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Cabecera />
      <div className="contenedor-todo">
        <div className="caja-trasera">
          <div className="caja-trasera-login">
            <h3></h3>
            <p>Iniciar sesión para </p>
            <a href="./Formulario"> Iniciar Sesión</a>
            <br />
            <a href="/Recuperar">¿Olvido su contraseña?</a>
          </div>
          <div className="caja-trasera-registro">
            <h3>¿ya tiene una cuenta?</h3>
            <a href="./Formulario"> Ingrese aquí</a>
            <p>¿Olvido su contraseña?</p>
            <a href="./Recuperar">Recuperela Aqui.</a>
            <p>¿Desea volver al inicio?</p>
            <a href="./Inicio">Regrese Aqui</a>
          </div>
        </div>

        {/* Formulario de Registro */}
        <div className="contenedor-login-registro">
          <form onSubmit={handleSubmit} className="formulario-registro">
            <h2>Registrarse</h2>
            <input
              type="text"
              name="nombre"
              placeholder="Nombre completo:"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Correo electronico"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="usuario"
              placeholder="Usuario"
              value={formData.usuario}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit" id="enviar">Enviar</button>
            <button type="reset" id="cancelar">Cancelar</button>
          </form>
        </div>
      </div>
      <Pie />
    </>
  );
};

export default Registro;
