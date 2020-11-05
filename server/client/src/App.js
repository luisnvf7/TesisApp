import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import PrivateRoute from './Hoc/PrivateRouter'

/* Pages */
import Login from './Pages/login'
import Register from './Pages/register'
import Home from './Pages/home'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/registro" component={Register} />
        <PrivateRoute path = "/home" component={Home} />
      </div>
    </BrowserRouter>
  );
};

export default App
