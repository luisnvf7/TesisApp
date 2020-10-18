const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    password: "12345",
    host: "localhost",
})

pool.connect((err, client, done) => {
    if(err) {
        console.log("Error al conectar", err.stack)
    }else {
        console.log("Conectado satisfactoriamente")
    }
})

module.exports = pool