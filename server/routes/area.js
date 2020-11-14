const { Router } = require("express");
const router = Router();
const pool = require("../db");


router.get('/areas/:id', async (req, res) => {

    let rubro_id = req.params.id

    try {
        const resp = await pool.query('SELECT * FROM area WHERE rubro_id = $1', [rubro_id])
        return res.status(200).json({ areas: resp.rows })
    } catch(err) {
        console.log("ERR", err)
    }
})

router.post('/area', async (req, res) => {

    const { rubro_id, nombre  } = req.body

    try {
        const resp = await pool.query("INSERT INTO area (rubro_id, nombre) VALUES ($1, $2)", [rubro_id, nombre])
        
        return res.json({resp: resp})

    } catch(err) {
        console.log("ERROR", err)
    }

})


module.exports = router