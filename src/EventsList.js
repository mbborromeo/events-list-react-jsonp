import React, { Component } from 'react';
import axios from 'axios-jsonp-pro'; //https://www.npmjs.com/package/axios-jsonp-pro
import { Link } from 'react-router-dom';
import './EventsList.scss';

class EventsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],            
            eventsPerPage: 30,
            currentPage: 1,//46 + 1
            totalEvents: undefined,
            totalPages: undefined,
        }
    }

    getEvents() {
        axios.jsonp(`https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions`, 
          {
            timeout: 2000,
            params: {
              api: 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2',
              per_page: this.state.eventsPerPage,
              page: this.state.currentPage,
              //search: 'Jason',
            }
          })
          .then( response => {
              console.log(response);
    
              this.setState(
                {
                  events: response.data,
                  totalEvents: response.meta.total,
                  totalPages: Math.floor(response.meta.total/this.state.eventsPerPage)+1,
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

    getPageIndex( fromState ) {
        return fromState.currentPage;
    }
    
    componentDidMount() {        
        this.getEvents();
    }

    componentDidUpdate(prevProps, prevState) {
        //const pageID = this.getPageIndex( this.props );
        let proposedPage = this.state.currentPage;

        if( proposedPage !== this.getPageIndex(prevState) ){
          this.getEvents();
        }
    }

    handleNextClick() {
        console.log('Click Next happened');

        let proposedPage = this.state.currentPage + 1;

        if(proposedPage <= this.state.totalPages) {
            this.setState(
                {
                    currentPage: proposedPage,
                }
            );

            //update in componentDidUpdate            
        }
    }

    handleBeginningClick() {
        console.log('Click Start happened');
       
        this.setState(
            {
                currentPage: 1,
            }
        );
    }

    handleEndClick() {
        console.log('Click End happened');
       
        this.setState(
            {
                currentPage: this.state.totalPages,
            }
        );
    }

    handlePrevClick() {
        console.log('Click Prev happened');

        let proposedPage = this.state.currentPage - 1;

        if(proposedPage > 0) {
            this.setState(
                {
                    currentPage: proposedPage,
                }
            );          
        }
    }

    render() {
        console.log("this.state", this.state);

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

                        <button onClick={ () => this.handleBeginningClick() }>&laquo;</button>

                        <button onClick={ () => this.handlePrevClick() }>Prev</button>

                        Page { this.state.currentPage } / { this.state.totalPages }

                        <button onClick={ () => this.handleNextClick() }>Next</button>

                        <button onClick={ () => this.handleEndClick() }>&raquo;</button>

                    </div>
                }        
            </div>
        );
    }
}

export default EventsList;
