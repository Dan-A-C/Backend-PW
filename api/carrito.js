const express = require('express');
const db = require('../db/models/index.js');
const Producto = require('../db/models/producto.js');
const Pedido = require('../db/models/pedido.js');

const ruta = express.Router();

// Obtener todos los productos del carrito
ruta.get('/', async (req, res) => {
  const productosCarrito = await Producto.findAll();
  res.status(200).json(productosCarrito);
});

// Agregar producto al carrito
ruta.post('/', async (req, res) => {
  const { id, nombre, precio, cantidad } = req.body;
  const nuevoProducto = await Producto.create({ id, nombre, precio, cantidad });
  res.status(201).json(nuevoProducto);
});

// Eliminar producto del carrito
ruta.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Producto.destroy({ where: { id } });
  res.status(200).json({ message: 'Producto eliminado del carrito' });
});

// Actualizar cantidad de un producto en el carrito
ruta.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { cantidad } = req.body;
  const producto = await Producto.findByPk(id);
  producto.cantidad = cantidad;
  await producto.save();
  res.status(200).json(producto);
});

module.exports = ruta;