import React, { Component } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
import { withRouter } from "react-router";
import './EventsList.scss';
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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    }


    getPageIndex(properties) { //
        console.log("$$$$$$$$$$$ getPageIndex prop: ", properties);//properties
        //get page number from URL, not State
        if(properties.match && properties.match.params && properties.match.params.number){
            console.log("has params number ", properties.match.params.number)
            return parseInt(properties.match.params.number);
        } else {
            console.log("no params number")
            return 1;
        }
    }
    
    getEvents( pageNum, searchKeyword ) {
        this.eventsService.getEvents( pageNum, searchKeyword )
            .then( response => {
                console.log("EventsService :: response : ", response);                

                this.setState(
                    {
                        events: response.data,
                        totalPages: Math.floor( response.meta.total / Constants.EVENTS_PER_PAGE ) + 1,
                        loading: false, 
                    }
                );

                console.log("STATE is: ", this.state);
              }
            )
            .catch( function (error) {
                console.log(error);
              }
            );
    }
    
    handleChangeKeyword(keyword) {
        this.setState({                 
            filterKeyword: keyword,
        });
    }
    
    handleSubmit() {
        this.setState({
            previousFilterKeyword: this.state.filterKeyword,
        });
        
        //search with query string
        const keyword = this.state.filterKeyword.toLowerCase();
        let pageIndex = undefined;

        console.log("keyword is: ", keyword);
        console.log("prev keyword is: ", this.state.previousFilterKeyword.toLowerCase() );

        if( keyword !== this.state.previousFilterKeyword.toLowerCase() ) {
            // need to reset pageIndex to 1 if new keyword            
            pageIndex = 1;
            console.log("different keyword: pageIndex: ", pageIndex);
            this.props.history.push('/page/1');

        } else {            
            pageIndex = this.getPageIndex( this.props );
            console.log("same keyword: pageIndex: ", pageIndex);
        }  

        this.getEvents( pageIndex, keyword );  
    }

    componentDidMount() {       
        console.log("EVENTSLIST :: componentDidMount ")    
        const pageIndex = this.getPageIndex( this.props );
        const keyword = this.state.filterKeyword.toLowerCase();
        this.getEvents( pageIndex, keyword );
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("EVENTSLIST :: componentDidUpdate ") 
        const pageIndex = this.getPageIndex( this.props );
        const keyword = this.state.filterKeyword.toLowerCase();

        if( pageIndex !== this.getPageIndex( prevProps ) ){
            this.getEvents( pageIndex, keyword );
        }
    }
  
    render() {
        //console.log("this.state", this.state);
        console.log("************** EventsList :: render :: props: ", this.props);

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Events List</h1>

                        <SearchField 
                            onChangeKeyword={this.handleChangeKeyword}
                            onSubmit={this.handleSubmit}
                        />

                        <SearchResults
                            events={this.state.events} 
                        />    

                        <Pagination 
                            totalPages={this.state.totalPage}
                            currentPageIndex={this.getPageIndex}
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
