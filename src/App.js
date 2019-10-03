import React, { Component } from 'react';
import './App.scss';
import { HashRouter as Router, Route } from 'react-router-dom';
import EventsList from './EventsList';
import Event from './Event';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route 
              path='/' 
              exact 
              component={EventsList}
            />

            <Route
              path="/event/:id" 
              component={Event}
            />            
          </div>
        </Router>  
      </div>
    );
  }
}

export default App;
