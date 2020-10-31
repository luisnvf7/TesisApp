import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';


/* Pages */
import Login from './Pages/login'
import Register from './Pages/register'

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Login} />
        <Route path="/Register" component={Register} />
      </div>
    </BrowserRouter>
  );
};

export default App;
