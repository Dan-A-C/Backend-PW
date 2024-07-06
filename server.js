const express = require('express');
const bodyParser = require("body-parser")
const path = require('path');

// Permitir CORS
const cors = require('cors')
// Registrar las apis
const consulta = require('./api/consulta.js')
const carrito = require('./api/carrito.js');
const checkout = require('./api/checkout.js');
const app = express()
const port = 3080

app.use(express.static(path.join(__dirname, './static')));
app.use(bodyParser.json());

// Indicar los dominios permitidos
const whiteList = ['http://localhost:5173/']
app.use( cors(whiteList))
// Mapear la api con la URL de invocacion
app.use('/api/consulta', consulta)
app.use('/api/carrito', carrito);
app.use('/api/checkout', checkout);
app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, './static/index.html'));
});

app.listen(port, () => {
    console.log(`Server escuchando en el port::${port}`);
});

