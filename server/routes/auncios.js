const { Router } = require("express");
const router = Router();
const pool = require("../db");

router.get("/anunciosnegocios", async (req, res) => {

    console.log("REQ ANUNCIOS", req.query)

    let array = Object.keys(req.query)
        .map((key) => req.query[key] )

    console.log("ARRAY", array)

    let anuncios = await pool.query('SELECT * FROM anuncios order by anuncio_id DESC')
    let anuncios_area = await pool.query("select * from anuncios_area INNER JOIN area on anuncios_area.area_id = area.area_id")

   let final_result = anuncios.rows.map(anuncio => {

        let filtro = anuncios_area.rows.filter(a_area  =>  a_area.anuncio_id == anuncio.anuncio_id).map(v => {
            return {
               rubroid: v.rubro_id,
               area_id: v.area_id,
               nombre : v.nombre
            }
        } )
        return {
            ...anuncio,
            area_Info : filtro,
            rubro_id : anuncios_area.rows.find(v => v.anuncio_id === anuncio.anuncio_id ) ? anuncios_area.rows.find(v => v.anuncio_id === anuncio.anuncio_id ).rubro_id : null
        }
    })



    // console.log("FINAL_RESULT", final_result)

    // let resp = await pool.query("select * from anuncios INNER JOIN anuncios_area ON anuncios.anuncio_id = anuncios_area.anuncio_id INNER JOIN area on anuncios_area.area_id = area.area_id")


    // select * from anuncios INNER JOIN anuncios_area ON anuncios.anuncio_id = anuncios_area.anuncio_id

    /* Inner Join, necesario para traer la data y mostrarla */
    //select * from anuncios INNER JOIN anuncios_area ON anuncios.anuncio_id = anuncios_area.anuncio_id INNER JOIN area on anuncios_area.area_id = area.area_id 

    // console.log("ANUNCIOS _AREA", anuncios_area.rows)
    // console.log("RESP", anuncios.rows)

    if ( array.includes("0") && (req.query.value === undefined || req.query.value === "" )  ) {
        return res.status(200).json({ anuncios: final_result })

    }

    else {

        if (req.query.value == undefined) {

            let resultado_final = final_result.filter(v => { 
                return array.includes(v.rubro_id.toString())
              })
              
             console.log("REUSLTADO_FINAL", resultado_final )
         
             return res.status(200).json({ anuncios: resultado_final })

        }  else {

            console.log("ENTRA EN ELSE")

            let resultado_final = final_result.filter(v => { 
               return array.includes(v.rubro_id.toString()) && v.titulo.toLowerCase().includes(req.query.value.toLowerCase()) 
             })
             
            console.log("REUSLTADO_FINAL", resultado_final )
        
            return res.status(200).json({ anuncios: resultado_final })
        }

    }


    // await pool.query("SELECT * FROM anuncios")

});

router.get("/anunciosempleados", async (req, res) => {

    console.log("Anuncios de empleados")


});

router.post("/anunciosnegocios", async (req, res) => {

    /* El username_freelancer debe de traerse desde req.user */

    const { area_id, rubro_id, username_freelancer, titulo, descripcion, disponibilidad } = req.body

    console.log("EL BODY", req.body)

    
    const resp = await pool.query("INSERT INTO anuncios (username_freelancer, titulo, descripcion, disponibilidad) VALUES ($1, $2, $3, $4) RETURNING *", 
    [
        username_freelancer,
        titulo,
        descripcion,
        disponibilidad
    ])

    area_id.map( async (v) => {
        await pool.query("INSERT INTO anuncios_area (anuncio_id, username_freelancer, area_id, rubro_id) VALUES($1, $2, $3, $4)", [
            resp.rows[0].anuncio_id,
            username_freelancer,
            v,
            rubro_id
        ])
    })

    return res.status(200).json({ message: 'Anuncio guardado exitosamente' })


});

router.post("/anunciosempleados", async (req, res) => {
    



});


module.exports = router;
