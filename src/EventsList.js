import React, { Component } from 'react';
import axios from 'axios-jsonp-pro'; //https://www.npmjs.com/package/axios-jsonp-pro
import { Link } from 'react-router-dom';
import './EventsList.scss';
import { thisExpression } from '@babel/types';

class EventsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],            
            eventsPerPage: 30,
            totalEvents: undefined,
            totalPages: undefined,
        }
    }

    getEvents( currentPage=1 ) {
        axios.jsonp(`https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions`, 
          {
            timeout: 2000,
            params: {
              api: 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2',
              per_page: this.state.eventsPerPage,
              page: currentPage,
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

    getPageIndex(prop) {
        console.log("getPageIndex properties: ", prop);

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
            console.log("handleNextClick : on last page");
            e.preventDefault();
        }
    }

    handleEndClick(e) {
        let proposedPage = this.state.totalPages;

        if( this.getPageIndex(this.props) === proposedPage ) {
            console.log("handleEndClick : on very last page");
            e.preventDefault();
        }
    }

    handlePrevClick(e) {
        if( this.getPageIndex(this.props) <= 1 ) {
            console.log("handlePrevClick : on first page");
            e.preventDefault();
        }
    }

    handleBeginningClick(e) {      
        let proposedPage = 1;

        if( this.getPageIndex(this.props) === proposedPage ) {
            console.log("handleBeginningClick : on very first page");
            e.preventDefault();
        }
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
        console.log("this.state", this.state);

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
                            className={ this.getPageIndex(this.props) === 1 ? 'page-button ' + 'disabled' : 'page-button' }
                        >
                            &laquo; Start 
                        </Link>&nbsp;

                        <Link 
                            to={'/page/' + this.getPrevPageIndex(this.props) } 
                            onClick={ (ev) => this.handlePrevClick(ev) }
                            className={ this.getPageIndex(this.props) === 1 ? 'page-button ' + 'disabled' : 'page-button' }
                        >
                            &lt; Prev
                        </Link>&nbsp;

                        Page { this.getPageIndex(this.props) } / { this.state.totalPages }
                        &nbsp;

                        <Link 
                            to={'/page/' + this.getNextPageIndex(this.props) } 
                            onClick={ (ev) => this.handleNextClick(ev) }
                            className={ this.getPageIndex(this.props) === this.state.totalPages ? 'page-button ' + 'disabled' : 'page-button' }
                        >
                            Next &gt;
                        </Link>&nbsp;

                        <Link 
                            to={'/page/' + this.state.totalPages } 
                            onClick={ (ev) => this.handleEndClick(ev) }
                            className={ this.getPageIndex(this.props) === this.state.totalPages ? 'page-button ' + 'disabled' : 'page-button' }
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
