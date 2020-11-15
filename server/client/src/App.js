/* React importaciones */
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* HOC */
import PrivateRoute from './Hoc/PrivateRouter'
import PrivateRouteRegister from './Hoc/PrivateRouterRegister'

/* Pages */
import Login from './Pages/login'
import Register from './Pages/register'
import HomeProfesional from './Pages/homeProfesional'
import Principal from './Pages/principal'
import RegisterProfesional from './Pages/registerProfesional'
import RegistroBusiness from './Pages/registerBusiness'
import PostRegister from './Pages/postRegisterPage'
import Rubro from './Pages/rubroPage'
import Dashboard from './Pages/dashboard'
import MiCuenta from './Pages/miCuenta'
import MiPerfil from './Pages/miPerfil'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        { console.log("USER", JSON.parse(localStorage.getItem("user"))) }
        <Route exact path = "/" component = {Principal} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Register} />
        
        <Route path = "/registro/profesional" component = {RegisterProfesional} />
        <Route path = "/registro/empresa" component = {RegistroBusiness} />

        <PrivateRouteRegister path = "/registro/postregister" component={PostRegister} />
        <PrivateRouteRegister  path = "/registro/rubro" component={Rubro}  />
        <PrivateRoute path = "/dashboard" component={Dashboard} />

        {/* <Route path = "/registro/postregister" component = {PostRegister} />
        <Route path = "/registro/rubro" component = {Rubro} /> */}
        <PrivateRoute path = "/home" component={HomeProfesional} />
        <PrivateRoute path = "/micuenta" component={MiCuenta} />
        <PrivateRoute path = "/miperfil" component={MiPerfil} />

      </div>
    </BrowserRouter>
  );
};

export default App
