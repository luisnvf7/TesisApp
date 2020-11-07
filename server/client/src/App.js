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

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path = "/" component = {Principal} />
        <Route exact path="/login" component={Login} />
        <Route path="/registro" component={Register} />
        <PrivateRoute path = "/home" component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default App
