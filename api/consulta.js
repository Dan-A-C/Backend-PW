const express = require('express')
const db = require('../db/models/index.js')
const movie = require('../db/models/movie.js')
const country = require('../db/models/country.js')

// Para usar funciones
const sequelize = require('sequelize')

const ruta = express.Router()

/*
Ejemplo 1
*/
ruta.get('/q1/:id', async(req,res) => {
    // Recuperar el paramteor :id
    id = req.params.id
    console.log("Consulta de peliculas por PK !")
    let m = await db.movie.findByPk( id )
    if ( m ) {
        console.log( m )
        res.status(200).json(m)
    } else {
        res.status(404).json({'msg': 'No se econtro ID'})
    }
})


/*
Ejemplo 2
*/
ruta.get('/q2/:id', async(req,res) => {
    // Recuperar el paramteor :id
    id = req.params.id
    console.log("Consulta de peliculas por PK !")
    let m = await db.movie.findByPk( id , {
        attributes : ['id','title']
    } )
    if ( m ) {
        console.log( m )
        res.status(200).json(m)
    } else {
        res.status(404).json({'msg': 'No se econtro ID'})
    }
})

/*
Ejemplo 3
*/
ruta.post('/q3', async(req,res) => {
    // Recuperar el paramteor :id

    parametros = req.body
    console.log(req.body)
    listaIds = parametros.ids
    console.log( listaIds  )
    
    console.log("Consulta de peliculas usandoo WHERE !")
    let listaMovies = await db.movie.findAll(  {
        attributes : ['id','title'],
        where: {
            id : listaIds
        },
        order : [
            ['title', 'ASC']
        ]
    } )
    if ( listaMovies ) {
        listaMovies.forEach(m => {
            console.log( m )            
        });
        res.status(200).json(listaMovies)
    } else {
        res.status(404).json({'msg': 'No se econtro ID'})
    }
})

/* 
Ejemplo 4 : uso de count
*/
ruta.get('/q4', async(req,res) => {
    console.log("Consulta usando COUNT!")
    let m = await db.country.count() 

    if ( m ) {
        console.log( m )
        res.status(200).json(m)
    } else {
        res.status(404).json({'msg': 'No se econtro data'})
    }
})

/*** NO OLVIDER ****/
module.exports= ruta