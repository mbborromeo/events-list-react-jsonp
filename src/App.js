import React, { Component } from 'react';
import './App.scss';
import axios from 'axios-jsonp-pro'; //https://www.npmjs.com/package/axios-jsonp-pro
import { HashRouter as Router, Route } from 'react-router-dom';
import EventsList from './EventsList';
import Event from './Event';

class App extends Component {
  state = {
    loading: true,
    events: [],
  }

  componentDidMount() {        
    axios.jsonp(`https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions`, 
      {
        timeout: 2000,
        params: {
          api: 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2'
        }
      })
      .then( response => {
          console.log(response);

          this.setState(
            {
              events: response.data,
              loading: false,
            }
          );
        }
      )
      .catch( function (error) {
          console.log(error);
        }
      );
  }

  render() {
    return (
      <div className="App">
        { this.state.loading ?
          <div>Loading events list</div> :
          <div>
            <Router>
              <div>
                <Route 
                  path='/' 
                  exact 
                  //render={ () => <EventsList {...this.state} /> }
                  render={ () => <EventsList events={ this.state.events } /> }
                />

                <Route
                  path="/event/:id" 
                  component={Event}
                  //render={ () => <Event events={ this.state.events } /> }
                />
                
              </div>
            </Router>  

          </div>
        }        
      </div>
    );
  }
}

export default App;
