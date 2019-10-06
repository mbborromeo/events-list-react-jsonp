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
        this.getFilterKeyword = this.getFilterKeyword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);        
    }


    getPageIndex(properties) { //
        console.log("EventsList :: getPageIndex prop: ", properties);//properties
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

    getFilterKeyword() {
        return this.state.filterKeyword.toLowerCase();
    }
    
    handleChangeKeyword(keyword) {
        this.setState({                 
            filterKeyword: keyword,
        });
    }
    
    handleSubmit() {
        //search with query string
        const keyword = this.getFilterKeyword();
        const previousKeyword = this.state.previousFilterKeyword.toLowerCase();
        let pageIndex = undefined;

        this.setState({
            previousFilterKeyword: keyword,
        });

        console.log("keyword is: ", keyword);
        console.log("prev keyword is: ",  );

        if( keyword !== previousKeyword ) {
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
         
        const pageIndex = this.getPageIndex( this.props );
        const keyword = this.getFilterKeyword();

        console.log("EVENTSLIST :: componentDidMount : pageIndex: ", pageIndex)   

        this.getEvents( pageIndex, keyword );
    }

    componentDidUpdate(prevProps, prevState) {
        
        const pageIndex = this.getPageIndex( this.props );
        const keyword = this.getFilterKeyword();

        console.log("EVENTSLIST :: componentDidUpdate : pageIndex: ", pageIndex) 

        if( pageIndex !== this.getPageIndex( prevProps ) ){
            this.getEvents( pageIndex, keyword );
        }
    }
  
    render() {
        //console.log("this.state", this.state);
        //console.log("************** EventsList :: render :: props: ", this.props);
        const pageIndex = this.getPageIndex( this.props );

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Events List</h1>

                        <SearchField 
                            //filterKeyword={this.getFilterKeyword}
                            onChangeKeyword={this.handleChangeKeyword}
                            onSubmit={this.handleSubmit}
                        />

                        <SearchResults
                            events={this.state.events} 
                        />    

                        <Pagination 
                            totalPages={this.state.totalPages}
                            currentPageIndex={ pageIndex } //this.
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
