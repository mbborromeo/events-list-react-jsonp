import React, { Component } from 'react';
import './App.scss';
import { HashRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import EventsList from './EventsList';
import Event from './Event';
import PageNotFound from './PageNotFound';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route
                            path="/events" // "/events/:number"
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
                            exact
                            to='/events' 
                        />
                        
                        <Route component={PageNotFound} />
                    </Switch>
                </Router>  
            </div>
        );
    }
}

export default App;
