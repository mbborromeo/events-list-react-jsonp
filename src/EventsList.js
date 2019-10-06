import React, { Component } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
import { withRouter } from "react-router";
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

class EventsList extends React.Component {    
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            filterKeyword: '',
            previousFilterKeyword: '',
            totalPages: undefined,
        }

        this.eventsService = new EventsService();

        this.getPageIndex = this.getPageIndex.bind(this);
        this.getFilterKeyword = this.getFilterKeyword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);        
    }


    getPageIndex(properties) {
        //get page number from URL, not State
        if(properties.match.params.number){
            return parseInt(properties.match.params.number);
        } else {
            return 1;
        }
    }
    
    getEvents( pageNum, searchKeyword ) {
        this.eventsService.getEvents( pageNum, searchKeyword )
            .then( response => {
                //console.log("EventsService :: response : ", response);                

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

    getFilterKeyword() {
        return this.state.filterKeyword.toLowerCase();
    }
    
    handleChangeKeyword(keyword) {
        this.setState({                 
            filterKeyword: keyword,
        });
    }
    
    handleSubmit() {        
        const keyword = this.getFilterKeyword();
        const previousKeyword = this.state.previousFilterKeyword.toLowerCase();
        let pageIndex = undefined;

        this.setState({
            previousFilterKeyword: keyword,
        });

        // need to reset pageIndex to 1 if new keyword   
        if( keyword !== previousKeyword ) {                     
            pageIndex = 1;
            this.props.history.push('/page/1');

        } else {            
            pageIndex = this.getPageIndex( this.props );
        }  

        //search with query string
        this.getEvents( pageIndex, keyword );  
    }

    componentDidMount() {
        const pageIndex = this.getPageIndex( this.props );
        const keyword = this.getFilterKeyword();

        this.getEvents( pageIndex, keyword );
    }

    componentDidUpdate(prevProps, prevState) {        
        const pageIndex = this.getPageIndex( this.props );
        const keyword = this.getFilterKeyword();

        if( pageIndex !== this.getPageIndex( prevProps ) ){
            this.getEvents( pageIndex, keyword );
        }
    }
  
    render() {
        //console.log("this.state", this.state);
        const pageIndex = this.getPageIndex( this.props );

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Events List</h1>

                        <SearchField 
                            //filterKeyword={this.getFilterKeyword}
                            onChangeKeyword={ this.handleChangeKeyword }
                            onSubmit={ this.handleSubmit }
                        />

                        <SearchResults
                            events={ this.state.events } 
                        />    

                        <Pagination 
                            currentPageIndex={ pageIndex }
                            totalPages={ this.state.totalPages }                            
                        />
                    </div>
                }        
            </div>
        );
    }
}

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const EventsListWithRouter = withRouter( EventsList );

export default EventsList;
