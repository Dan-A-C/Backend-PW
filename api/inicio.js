const express = require('express');
const db = require('../db/models/index.js');
const Producto = require('../db/models/producto.js');
const Pedido = require('../db/models/pedido.js');
const admin = require('../db/models/admin.js');
const cliente = require('../db/models/cliente.js');

const ruta = express.Router();

// Obtener todos los productos del inicio
ruta.get('/', async (req, res) => {
  const Inicio = await Producto.findAll();
  res.status(200).json(Inicio);
});

// Agregar producto al inicio
ruta.post('/', async (req, res) => {
  const { id, nombre} = req.body;
  const nuevoProducto = await Producto.create({ id, nombre });
  res.status(201).json(nuevoProducto);
});

// Eliminar producto del carrito
ruta.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Producto.destroy({ where: { id } });
  res.status(200).json({ message: 'Producto eliminado de inicio' });
});


module.exports = ruta;