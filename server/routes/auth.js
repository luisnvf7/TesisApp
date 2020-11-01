const { Router } = require("express");
const router = Router();
const pool = require("../db");

const { genSaltSync, hashSync, compare } = require("bcryptjs");

//Registra a un usuario en la base de datos
router.post("/registro", async (req, res) => {
  const {
    username,
    password,
    repeatedpass,
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

  const { username, password } = req.body;

  try {
    /* Obtener contraseña de la base de datos */
    const user = await pool.query(
      "SELECT * from freelancerUsuario where username_freelancer = $1",
      [username]
    );

    if (user.rows.length == 0)
      return res.status(422).json({ message: "Usuario no existente" });

    /* Compara la contraseña con el de la db */
    const checkCredentials = await compare(
      password,
      user.rows[0].password
    );

    /* Si las credenciales son correctas, se logea, de caso contrario, informar que no son correctos. */
    if (checkCredentials) {

      /* Vaciamos la contraseña para que no se envie en el front */
      delete user.rows[0]["password"]

      return res.status(200).json({
        message: "Usuario logeado satisfactoriamente",
        user: user.rows[0]
      });
    }
    
    return res
      .status(422)
      .json({ message: "Contraseña o usuario incorrectos" });

  } catch (error) {
    console.log("ERROR", error);
  }

});

module.exports = router;
