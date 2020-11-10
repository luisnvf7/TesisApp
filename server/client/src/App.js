/* React importaciones */
import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";

/* CSS */
import 'bootstrap/dist/css/bootstrap.min.css';

/* HOC */
import PrivateRoute from './Hoc/PrivateRouter'

/* Pages */
import Login from './Pages/login'
import Register from './Pages/register'
import Home from './Pages/home'
import Principal from './Pages/principal'
import RegisterProfesional from './Pages/registerProfesional'
import RegistroBusiness from './Pages/registerBusiness'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path = "/" component = {Principal} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registro" component={Register} />
        <Route path = "/registro/profesional" component = {RegisterProfesional} />
        <Route path = "/registro/empresa" component = {RegistroBusiness} />
        <PrivateRoute path = "/home" component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default App
