const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');

// Permitir CORS
const cors = require('cors')
// Registrar las apis
const carrito = require('./api/carrito.js');
const checkout = require('./api/checkout.js');
const inicio = require('./api/inicio.js');
const busqueda = require('./api/busqueda.js');
const registro = require('./api/Registro.js');
const recuperar = require('./api/Recuperar.js');
const app = express()
const port = 3080
//Registro alumno 4
const alumno4Series = require('./api/alumno4/series.js');  // <--- Asegúrate de incluir esta línea
const alumno4Categorias = require('./api/alumno4/categoria.js');
const alumno4Clientes = require('./api/alumno4/cliente.js');
const alumno4Inventarios = require('./api/alumno4/inventario.js');
const alumno4Pedidos = require('./api/alumno4/pedido.js');
const alumno4Productos = require('./api/alumno4/producto.js');
const alumno4Usuarios = require('./api/alumno4/usuario.js');
const cambiarContrasena = require('./api/alumno4/cambiarContrasena.js');

// Registrar las apis para alumno 6
const alumno6ClienteRoutes = require('./api/alumno6/cliente');
const alumno6InventarioRoutes = require('./api/alumno6/inventario');
const alumno6PedidoRoutes = require('./api/alumno6/pedido');
const alumno6ProductoRoutes = require('./api/alumno6/producto');
const alumno6Usuario = require('./api/alumno6/usuario');

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json());

// Indicar los dominios permitidos
const whiteList = ['http://localhost:5173/']
app.use( cors(whiteList))
// Mapear la api con la URL de invocacion
app.use('/api/carrito', carrito);
app.use('/api/checkout', checkout);
app.use('/api/inicio', inicio);
app.use('/api/busqueda', busqueda);
app.use('/api/registro', registro);
app.use('/api/recuperar', recuperar);

// Mapear las nuevas rutas para alumno 4
app.use('/api/alumno4/series', alumno4Series);  // <--- Asegúrate de incluir esta línea
app.use('/api/alumno4/categorias', alumno4Categorias);
app.use('/api/alumno4/clientes', alumno4Clientes);
app.use('/api/alumno4/inventarios', alumno4Inventarios);
app.use('/api/alumno4/pedidos', alumno4Pedidos);
app.use('/api/alumno4/productos', alumno4Productos);
app.use('/api/alumno4/usuarios', alumno4Usuarios);
app.use('/api/alumno4', cambiarContrasena); 

// Mapear las nuevas rutas para alumno 6
app.use('/api/alumno6/clientes', alumno6ClienteRoutes);
app.use('/api/alumno6/inventario', alumno6InventarioRoutes);
app.use('/api/alumno6/pedidos', alumno6PedidoRoutes);
app.use('/api/alumno6/productos', alumno6ProductoRoutes);
app.use('/api/alumno6/usuario', alumno6Usuario);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
    console.log(`Server escuchando en el port::${port}`);
});

