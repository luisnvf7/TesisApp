//Inicializaciones
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')

//Middlewares
app.use(express.json())
app.use(cors())

require('./config/passport')(passport)

//Express Session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

//Rutas
app.use(require('./routes/auth'))


const PORT = process.env.PORT || 5000

//Escuchando
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

