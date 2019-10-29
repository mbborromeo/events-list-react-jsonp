import React, { useState, useEffect } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
//import { withRouter } from "react-router";
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

function EventsList( props ) {
    //define State variables
    const [ loading, setLoading ] = useState( true );
    const [ events, setEvents ] = useState( [] );
    const [ filterKeyword, setFilterKeyword ] = useState( '' );    
    const [ submittedFilterKeyword, setSubmittedFilterKeyword ] = useState( '' );
    const [ totalPages, setTotalPages ] = useState( undefined );    

    const eventsService = new EventsService();

    function getPageIndex(properties) {
        //get page number from URL, not State
        if(properties.match.params.number){
            return parseInt(properties.match.params.number);
        } else {
            return 1;
        }
    }
    
    function getEvents( pageNum, searchKeyword ) {
        console.log("getEventS()")
        eventsService.getEvents( pageNum, searchKeyword )
            .then( response => {      
                /*
                this.setState(
                    {
                        events: response.data,
                        totalPages: Math.floor( response.meta.total / Constants.EVENTS_PER_PAGE ) + 1,
                        loading: false, 
                    }
                );
                */

                setEvents( response.data );
                setTotalPages( Math.floor( response.meta.total / Constants.EVENTS_PER_PAGE ) + 1 );
                setLoading( false );

            })
            .catch( function (error) {
                console.log(error);
            });
    }

    function getFilterKeyword() {
        return filterKeyword.toLowerCase();
    }

    const pageIndex = getPageIndex( props );
    const keyword = getFilterKeyword();
   

    // Similar to componentDidMount and componentDidUpdate:   
    useEffect( 
        () => {
            console.log("useEffect!!!!");            
            getEvents( pageIndex, keyword );
        },
        [pageIndex, keyword] // Only re-run the effect if these values change
    );

    return (
        <div>
            { loading ?
                <div>Loading events list</div> :
                <div>
                    <h1>Events</h1>

                    <SearchResults
                        events={ events } 
                    />   
                </div>
            }        
        </div>
    );
}

export default EventsList;
