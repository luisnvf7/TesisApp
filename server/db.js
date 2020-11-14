const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    password: "12345",
    host: "localhost",
    port: 5433,
    database: "PruebaTesis"
})  


pool.connect((err, client, done) => {
    if(err) {
        console.log("Error al conectar", err.stack)
    }else {
        console.log("Conectado satisfactoriamente")
    }
})

module.exports = pool