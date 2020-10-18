//Inicializaciones
const express = require('express')
const app = express()

//Middlewares
app.use(express.json())

//Rutas
app.use(require('./routes/auth'))

const PORT = process.env.PORT || 5000

//Escuchando
app.listen(PORT, () => {
    console.log(`Servidor iniciado`)
})

