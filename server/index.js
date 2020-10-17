//Inicializaciones
const express = require('express')
const app = express()

//Middlewares
app.use(express.json())

//Rutas

const PORT = process.env.PORT || 5000

//Escuchando
app.listen(PORT, () => {asdasd
    console.log(`Servidor iniciado`)
})