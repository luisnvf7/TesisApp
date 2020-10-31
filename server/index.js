//Inicializaciones
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')

//Middlewares
app.use(express.json())
app.use(cors())

//Rutas
app.use(require('./routes/auth'))


const PORT = process.env.PORT || 5000

//Escuchando
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

