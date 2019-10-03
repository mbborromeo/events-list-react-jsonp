import React, { Component } from 'react';
import axios from 'axios-jsonp-pro'; //https://www.npmjs.com/package/axios-jsonp-pro
import { Link } from 'react-router-dom';

class EventsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            totalPages: undefined,
            perPage: 30,
            currentPage: 1,
        }
    }

    getEvents() {
        axios.jsonp(`https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions`, 
          {
            timeout: 2000,
            params: {
              api: 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2',
              per_page: this.state.perPage,
              page: this.state.currentPage,
              //search: 'Jason',
            }
          })
          .then( response => {
              console.log(response);
    
              this.setState(
                {
                  events: response.data,
                  totalPages: response.meta.total,
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
    
    componentDidMount() {        
        this.getEvents();
    }

    render() {
        console.log("totalPages", this.state.totalPages);

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Event List</h1>
                        { 
                            this.state.events.map( event =>
                                <h3 key={event.id}>
                                    <Link to={'/event/' + event.id}>
                                        { event.name } 

                                        <br />
                                        {
                                            ' (' + 
                                            new Date(event.time_start).getDate() + '-' + 
                                            (new Date(event.time_start).getMonth()+1) + '-' + 
                                            new Date(event.time_start).getFullYear() + ', ' + 
                                            new Date(event.time_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' 
                                        }

                                        {
                                            new Date(event.time_start).getDate() + '-' + 
                                            (new Date(event.time_start).getMonth()+1) + '-' + 
                                            new Date(event.time_start).getFullYear() + ', ' + 
                                            new Date(event.time_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ')' 
                                        }
                                    </Link>
                                </h3>
                            )
                        }  

                        
                    </div>
                }        
            </div>
        );
    }
}

export default EventsList;
