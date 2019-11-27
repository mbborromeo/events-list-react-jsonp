import React, { useState, useEffect, useCallback, useMemo } from 'react';
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
    const [ totalPages, setTotalPages ] = useState( 1 );  
    
    const pageIndex = getPageIndex( props );

    // useMemo will save a memoized copy of the function for re-use, instead of creating a new function each time    
    const eventsService = useMemo(
        () => new EventsService(), 
        []
    );

    function getPageIndex(properties) {
        //get page number from URL, not State
        if(properties.match.params.number){
            return parseInt(properties.match.params.number);
        } else {
            return 1;
        }
    }
    
    // when you wrap a useCallback() hook around a function, the function inside it doesn't re-render 
    const getEvents = useCallback(
        ( pageNum, searchKeyword ) => {
            console.log("before eventsService.getEvents() call: eventsService", eventsService )
            eventsService.getEvents( pageNum, searchKeyword )
                .then( response => {
                    setEvents( response.data );
                    setTotalPages( Math.floor( response.meta.total / Constants.EVENTS_PER_PAGE ) + 1 );
                    setLoading( false );
                })
                .catch( function (error) {
                    console.log(error);
                });
        },
        [eventsService] // dependencies that require a re-render for
    );
    
    function handleCancel() {
        setFilterKeyword( '' );
        setSubmittedFilterKeyword( '' );
    }
    
    const handleSubmit = useCallback( 
        () => {
            const keyword = filterKeyword.toLowerCase();
            const submittedKeyword = submittedFilterKeyword.toLowerCase(); //initially is blank ""

            //compare to last submitted filter keyword
            if( keyword !== submittedKeyword ) {
                setSubmittedFilterKeyword( keyword );
            }
        },
        [filterKeyword, submittedFilterKeyword]
    );
    
    // Similar to componentDidMount and componentDidUpdate in class components:   
    useEffect( 
        () => {   
            console.log("useEffect calling getEvents() : getEvents", getEvents )   
            getEvents( pageIndex, submittedFilterKeyword );
        },
        [getEvents, pageIndex, submittedFilterKeyword] // Only re-run the effect if these values change
    );

    return (
        <div>   
            { loading ?
                <div>Loading events list</div> :
                <div>
                    <h1>Events</h1>

                    <SearchField 
                        filterKeyword={ filterKeyword }
                        onChangeKeyword={ setFilterKeyword } // handleChangeKeyword
                        onCancel={ handleCancel }
                        onSubmit={ handleSubmit }
                    />

                    <SearchResults
                        events={ events } 
                    />

                    <Pagination 
                        currentPageIndex={ pageIndex }
                        totalPages={ totalPages }                            
                    />
                </div>
            }        
        </div>
    );
}

export default EventsList;
