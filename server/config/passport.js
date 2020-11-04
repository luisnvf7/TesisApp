const LocalStrategy = require("passport-local").Strategy;

const pool = require("../db");

const { genSaltSync, hashSync, compare } = require("bcryptjs");

module.exports = async (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "username" },
      async (username, password, done) => {
        console.log("PASSWORD", password);

        const getPassword = await pool.query(
          "SELECT password from freelancerUsuario where username_freelancer = $1",
          [username]
        );

        console.log("GET PASSWORD", getPassword.rows[0].password)

        if (getPassword.rows.length == 0)
          return done(null, false, { message: "Usuario no existente" });

        /* Compara la contraseña con el de la db */
        const checkCredentials = await compare(
          password,
          getPassword.rows[0].password
        );

        // console.log()

        /* Si las credenciales son correctas, se logea, de caso contrario, informar que no son correctos. */
        // if (checkCredentials) {
        //   return  done(null, username.rows[0], {  message: "Usuario logeado satisfactoriamente" })
        // }

        // return done(null, false, { message: "Contraseña o usuario incorrectos" })

        //    const user = await pool.query("SELECT username_freelancer from freelancerUsuario where username_freelancer = $1", [username])

        //    if(user.rows.length == 0) {
        //        return done(null, false, { message: "Usuario no existente" })
        //    } else {
        //        return done(null, user.rows[0], { message: "Usuario logeado satisfactoriamente" })
        //    }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.username_freelancer);
  });

  passport.deserializeUser(async (username, done) => {
    const user = await pool.query(
      "SELECT username_freelancer from freelancerUsuario where username_freelancer = $1",
      [username]
    );
    done(null, user.rows[0]);
  });
};
