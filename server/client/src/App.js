import React from "react";
import "./App.css";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'

import PrivateRoute from './Hoc/PrivateRouter'

/* Pages */
import Login from './Pages/login'
import Register from './Pages/register'
import Home from './Pages/home'

const App = (props) => {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/Register" component={Register} />
        <PrivateRoute path = "/home" component={Home} />
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = (state) => {

  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(App);
