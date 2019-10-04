import React, { Component } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
import { Link } from 'react-router-dom';
import './EventsList.scss';

class EventsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            totalEvents: undefined,
            totalPages: undefined,
        }

        this.eventsService = new EventsService();
    }

    getPageIndex(prop) {
        if(prop.match.params.number){
            return parseInt(prop.match.params.number);
        } else {
            return 1;
        }
    }

    getNextPageIndex(properties) {
        const currentPageIndex = this.getPageIndex(properties);
        const nextPageIndex = currentPageIndex + 1;

        if( nextPageIndex < this.state.totalPages ) {
            return nextPageIndex;
        } else {
            return this.state.totalPages;
        }        
    }

    getPrevPageIndex(properties) {
        const currentPageIndex = this.getPageIndex(properties);
        const prevPageIndex = currentPageIndex - 1;
        if( prevPageIndex >= 1 ) {
            return prevPageIndex;
        } else {
            return 1;
        }
    }
    
    handleNextClick(e) {
        if( this.getPageIndex(this.props) >= this.state.totalPages ) {
            e.preventDefault();
        }
    }

    handleEndClick(e) {
        let proposedPage = this.state.totalPages;

        if( this.getPageIndex(this.props) === proposedPage ) {
            e.preventDefault();
        }
    }

    handlePrevClick(e) {
        if( this.getPageIndex(this.props) <= 1 ) {
            e.preventDefault();
        }
    }

    handleBeginningClick(e) {      
        let proposedPage = 1;

        if( this.getPageIndex(this.props) === proposedPage ) {
            e.preventDefault();
        }
    }

    getEvents( pageNum ) {
        this.eventsService.getEvents( pageNum )
            .then( response => {
                //console.log("EventsService :: response : ", response);

                this.setState(
                    {
                        events: response.data,
                        totalEvents: response.meta.total,
                        totalPages: Math.floor(response.meta.total/Constants.EVENTS_PER_PAGE)+1,
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
        const pageIndex = this.getPageIndex( this.props );

        this.getEvents( pageIndex );
    }

    componentDidUpdate(prevProps) {
        const pageIndex = this.getPageIndex( this.props );

        if( pageIndex !== this.getPageIndex( prevProps ) ){
          this.getEvents( pageIndex );
        }
    }    

    render() {
        //console.log("this.state", this.state);

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Events List</h1>
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

                        <hr />

                        <Link 
                            to={'/page/' + 1 } 
                            onClick={ (ev) => this.handleBeginningClick(ev) }                            
                            className={ this.getPageIndex(this.props) === 1 ? 'button page' + ' disabled' : 'button page' }
                        >
                            &laquo; Start 
                        </Link>&nbsp;

                        <Link 
                            to={'/page/' + this.getPrevPageIndex(this.props) } 
                            onClick={ (ev) => this.handlePrevClick(ev) }
                            className={ this.getPageIndex(this.props) === 1 ? 'button page' + ' disabled' : 'button page' }
                        >
                            &lt; Prev
                        </Link>&nbsp;

                        Page { this.getPageIndex(this.props) } / { this.state.totalPages }
                        &nbsp;

                        <Link 
                            to={'/page/' + this.getNextPageIndex(this.props) } 
                            onClick={ (ev) => this.handleNextClick(ev) }
                            className={ this.getPageIndex(this.props) === this.state.totalPages ? 'button page' + ' disabled' : 'button page' }
                        >
                            Next &gt;
                        </Link>&nbsp;

                        <Link 
                            to={'/page/' + this.state.totalPages } 
                            onClick={ (ev) => this.handleEndClick(ev) }
                            className={ this.getPageIndex(this.props) === this.state.totalPages ? 'button page' + ' disabled' : 'button page' }
                        >
                            End &raquo;                        
                        </Link>

                    </div>
                }        
            </div>
        );
    }
}

export default EventsList;
