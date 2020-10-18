//Inicializaciones
const express = require('express')
const app = express()
const pool = require('./db')

//Middlewares
app.use(express.json())

//Rutas


const PORT = process.env.PORT || 5000

//Escuchando
app.listen(PORT, () => {
    console.log(`Servidor iniciado`)
})