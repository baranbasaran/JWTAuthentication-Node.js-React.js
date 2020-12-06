import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Home from "./components/Home";


function App() {
  return (
  <Router>
    <div className="App">
    <Navbar/>
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/sign-in" component={Login} />
            <Route path="/home" component={Home} />
          </Switch>
    </div></Router>
  );
}

export default App;
