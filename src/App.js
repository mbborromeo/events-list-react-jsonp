import React, { Component } from 'react';
import './App.scss';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import EventsList from './EventsList';
import Event from './Event';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route
              path="/page/:number" 
              exact
              component={EventsList}
            />

            <Route
              path="/event/:id" 
              exact
              component={Event}
            />   

            <Redirect 
              from='/'
              to='/page/1' 
            />

          </Switch>
        </Router>  
      </div>
    );
  }
}

export default App;
