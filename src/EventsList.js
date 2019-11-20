import React, { useState, useEffect, useCallback, memo } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
//import { withRouter } from "react-router";
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import Pagination from './Pagination';
import Timer from './Timer';

function EventsList( props, state ) {
    //define State variables
    const [ loading, setLoading ] = useState( true );
    const [ events, setEvents ] = useState( [] );
    const [ filterKeyword, setFilterKeyword ] = useState( '' );    
    const [ submittedFilterKeyword, setSubmittedFilterKeyword ] = useState( '' );
    const [ totalPages, setTotalPages ] = useState( 1 );  
    
    const pageIndex = getPageIndex( props );
    //const keyword = getFilterKeyword();

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

    function getSubmittedFilterKeyword() {
        return submittedFilterKeyword.toLowerCase();
    }

    function handleChangeKeyword(keyword) {
        setFilterKeyword( keyword );
    }

    function handleCancel() {
        setFilterKeyword( '' );
        setSubmittedFilterKeyword( '' );
    }
    
    function handleSubmit() {      
        const keyword = getFilterKeyword();
        const submittedFilterKeyword = getSubmittedFilterKeyword(); //initially is blank ""

        //compare to last submitted filter keyword
        if( keyword !== submittedFilterKeyword ) {
            setSubmittedFilterKeyword( keyword );
        }  

        // useEffect/componentDidUpdate will render page accordingly
    }

    // Similar to componentDidMount and componentDidUpdate in class components:   
    useEffect( 
        () => {      
            getEvents( pageIndex, submittedFilterKeyword );
        },
        [getEvents, pageIndex, submittedFilterKeyword] // Only re-run the effect if these values change
    );

    return (
        <div>   
            <Timer />

            { loading ?
                <div>Loading events list</div> :
                <div>
                    <h1>Events</h1>

                    <SearchField 
                        filterKeyword={ filterKeyword }
                        onChangeKeyword={ handleChangeKeyword }
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
