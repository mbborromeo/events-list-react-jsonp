import React, { Component } from 'react';
import './App.scss';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
import EventsList from './EventsList';
import Event from './Event';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route
              path="/page/:number" 
              component={EventsList}
            />

            <Route
              path="/event/:id" 
              component={Event}
            />   

            <Redirect 
              from='/#/'
              to='/page/1' 
            />

            <Redirect 
              from='/#'
              to='/page/1' 
            />
          </div>
        </Router>  
      </div>
    );
  }
}

export default App;
