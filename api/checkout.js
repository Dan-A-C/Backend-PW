const express = require('express');
const db = require('../db/models/index.js');
const Pedido =  require('../db/models/pedido.js');

const ruta = express.Router();

// Obtener todos los pedidos
ruta.get('/', async (req, res) => {
  const pedidos = await Pedido.findAll();
  res.status(200).json(pedidos);
});

// Crear un nuevo pedido
ruta.post('/', async (req, res) => {
  const { productos, direccionEnvio, metodoPago, metodoEnvio, total } = req.body;
  const nuevoPedido = await Pedido.create({ productos, direccionEnvio, metodoPago, metodoEnvio, total });
  res.status(201).json(nuevoPedido);
});

module.exports = ruta;