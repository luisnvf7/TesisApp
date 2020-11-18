//Inicializaciones
const express = require('express')
const app = express()
const pool = require('./db')
const cors = require('cors')
const session = require('express-session')
const passport = require('passport')

const session = require('express-session')
const passport = require('passport')

const cookieParser = require('cookie-parser')

const initializePassport = require('./passport.Config')

//Middlewares
app.use(express.json())
app.use(cors())


app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false
}))

app.use(cookieParser('secretcode'))
app.use(passport.initialize());
app.use(passport.session());

initializePassport(passport)

//Rutas
app.use(require('./routes/auth'))
app.use(require('./routes/rubro'))
app.use(require('./routes/area'))
app.use(require('./routes/auncios'))

const PORT = process.env.PORT || 5000

//Escuchando
app.listen(PORT, () => {
    console.log(`Servidor iniciado en el puerto ${PORT}`)
})

