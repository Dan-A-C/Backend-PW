const express = require('express');
const db = require('../db/models/index.js');
const Producto = require('../db/models/producto.js');
const Pedido = require('../db/models/pedido.js');
const admin = require('../db/models/admin.js');
const cliente = require('../db/models/cliente.js');

const ruta = express.Router();

// Obtener todos los productos de busqueda
ruta.get('/', async (req, res) => {
  const productosBusqueda = await Producto.findAll();
  res.status(200).json(productosBusqueda);
  
});

// Agregar producto a la busqueda
ruta.post('/', async (req, res) => {
  const { id, nombre, precio, marca} = req.body;
  const nuevoProducto = await Producto.create({ id, nombre, precio, marca });
  res.status(201).json(nuevoProducto);
});


module.exports = ruta;