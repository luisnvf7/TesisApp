const { Router } = require("express");
const router = Router();
const pool = require("../db");

const { genSaltSync, hashSync, compare } = require("bcryptjs");

const passport = require('passport')


//Registra a un usuario en la base de datos
router.post("/registro", async (req, res) => {
  const {
    username,
    password,
    // repeatedpass,
    nombre,
    apellido,
    fecha_nacimiento,
    ciudad,
    rol,
    curriculum_url,
  } = req.body;

  try {
    /* Chequear si el usuario existe */
    const checkUser = await pool.query(
      "SELECT username_freelancer from freelancerUsuario WHERE username_freelancer = $1",
      [username]
    );

    if (checkUser.rows.length !== 0)
      return res.status(422).json({ message: "Usuario ya existente" });

    /* Encriptacion de contraseña */
    const salt = genSaltSync(10);
    const hashedPassword = hashSync(password, salt);

    /* Ingreso de usuario en la base de datos */
    const newUser = await pool.query(
      "INSERT INTO freelancerUsuario (username_freelancer, password, nombre, apellido, fecha_nacimiento, ciudad, rol, curriculum_url) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        username,
        hashedPassword,
        nombre,
        apellido,
        fecha_nacimiento,
        ciudad,
        rol,
        curriculum_url,
      ]
    );

    return res
      .status(200)
      .json({
        message: "Usuario registrado satisfactoriamente",
        user: newUser.rows,
      });
  } catch (err) {
    console.log("ERROR", err);
  }
});


router.post("/login", async (req, res) => {

passport.authenticate('local', (err, user, info) => {
    console.log("USER", user)
  })(req, res)

  passport.authenticate('local', (err, user, info) => {
   
    if(user) {
      req.login(user, () => {
        return res.status(200).json({message: "Usuario logeado satisfactoriamente", user });
      })
    } else {
      return res.status(422).json({ message : info.message })
    }

  })(req, res)


});


module.exports = router;
