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
            filterKeyword: '',
            totalPages: undefined,
        }

        this.eventsService = new EventsService();
    }

    getPageIndex(prop) {
        console.log("getPageIndex prop: ", prop);
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

    getEvents( pageNum, searchKeyword ) {
        this.eventsService.getEvents( pageNum, searchKeyword )
            .then( response => {
                console.log("EventsService :: response : ", response);
                console.log("STATE is: ", this.state);

                this.setState(
                    {
                        events: response.data,

                        totalPages: Math.floor( response.meta.total / Constants.EVENTS_PER_PAGE ) + 1,

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
        const keyword = this.state.filterKeyword.toLowerCase();
        this.getEvents( pageIndex, keyword );
    }

    componentDidUpdate(prevProps, prevState) {
        const pageIndex = this.getPageIndex( this.props );
        const keyword = this.state.filterKeyword.toLowerCase();

        if( pageIndex !== this.getPageIndex( prevProps ) ){
            this.getEvents( pageIndex, keyword );
        }

        /*
        //check if keyword changed
        if( keyword !== prevState.filterKeyword.toLowerCase() ) {
            this.getEvents( undefined, keyword );            
        }
        */
    }

    handleChangeKeyword(event) {
        this.setState(
            { filterKeyword: event.target.value }
        );
    }
    
    handleSubmit(event) {
        event.preventDefault();    
        
        //search with query string
        const keyword = this.state.filterKeyword.toLowerCase();

        // need to reset pageIndex to 1 if new keyword
        const pageIndex = this.getPageIndex( this.props );

        this.getEvents( pageIndex, keyword );
        
    }

    render() {
        //console.log("this.state", this.state);

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Events List</h1>

                        <form onSubmit={ this.handleSubmit.bind(this) }>
                            <label>
                                Keywords
                                <input type="text" name="keyword"
                                    value={ this.state.filterKeyword }
                                    onChange={ this.handleChangeKeyword.bind(this) }
                                    placeholder="eg Band"
                                />
                            </label>
                            <input type="submit" value="Apply"  />
                        </form>
                        <br /><br />

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

                        <br />
                        <hr />
                        
                        <Link 
                            to={'/page/' + 1 } 
                            //onClick={ (ev) => this.handleBeginningClick(ev) }                            
                            className={ this.getPageIndex(this.props) === 1 ? 'button page' + ' disabled' : 'button page' }
                        >
                            &laquo; Start 
                        </Link>&nbsp;

                        <Link 
                            to={'/page/' + this.getPrevPageIndex(this.props) } 
                            className={ this.getPageIndex(this.props) === 1 ? 'button page' + ' disabled' : 'button page' }
                        >
                            &lt; Prev
                        </Link>&nbsp;

                        Page { this.getPageIndex(this.props) } / { this.state.totalPages }
                        &nbsp;

                        <Link 
                            to={'/page/' + this.getNextPageIndex(this.props) } 
                            className={ this.getPageIndex(this.props) === this.state.totalPages ? 'button page' + ' disabled' : 'button page' }
                        >
                            Next &gt;
                        </Link>&nbsp;

                        <Link 
                            to={'/page/' + this.state.totalPages } 
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
