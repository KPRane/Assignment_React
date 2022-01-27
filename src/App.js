//import logo from './logo.svg';

import './App.css'
import React, { Component } from 'react';
import Login from './component/Login';

import Application from './component/Application';
import Temp2 from './component/Temp2';

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
class App extends Component {

  render() {
    return (
      <div className="App ">

        <Router>
          <Switch>
            <Route path="/" exact component={Application} />
            <Route path="/Login" exact component={Login} />
            {/* <Route path="/Home" exact component={Home}/> */}
            <Route path="/Temp2" exact component={Temp2} />

          </Switch>
        </Router>

      </div>

    );
  }
}

export default App;
