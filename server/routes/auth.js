const { Router } = require('express')
const router = Router()

router.post('/registro', (req, res) => {

    const { username, password, repeatedpass, name, lastName, edad, profesiones } = req.body

    console.log("USERNAME", username)


})

router.post('/login', (req, res) => {

    const { username, password } = req.body

    console.log("El username es ", username)
    console.log("El password es ", password)

})

module.exports = router