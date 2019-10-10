import React, { Component } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
import {RouteComponentProps, withRouter} from "react-router";
import SearchField from './SearchField';
import SearchResults from './SearchResults';
import Pagination from './Pagination';

class EventsList extends React.Component< RouteComponentProps<any> > {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            events: [],
            filterKeyword: '',
            submittedFilterKeyword: '',
            totalPages: undefined,
        }

        this.eventsService = new EventsService();

        this.getCurrentPageIndex = this.getCurrentPageIndex.bind(this);
        this.getFilterKeyword = this.getFilterKeyword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeKeyword = this.handleChangeKeyword.bind(this);   
        this.handleCancel = this.handleCancel.bind(this);
        this.getSubmittedFilterKeyword = this.getSubmittedFilterKeyword.bind(this);
    }

    /*
    getPageIndex(properties) {
        //get page number from URL, not State
        if(properties.match.params.number){
            return parseInt(properties.match.params.number);
        } else {
            return 1;
        }
    }
    */
    
    /*
    getCurrentPageIndex(properties) {
        console.log("EventsList :: getCurrentPageIndex : properties : ", properties )        
        
        // if(properties.match.params.number){
        //     return parseInt(properties.match.params.number);
        // } else {
        //     return 1;
        // }

        return this.props.currentPageIndex || 1;
    }
    */

    getCurrentPageIndex( properties ) { //: string
        let search = this.getUrlParams( properties );
        return parseInt( search.get("page") ) || 1; //if page param not found, return 1 for 1st page
    }
    
    getUrlParams( properties ) { //: URLSearchParamsd
        console.log("this.props is: ", properties)
        console.log("this.props.location is: ", properties.location)
        console.log("this.props.location.search: ", properties.location.search)

        if( !properties.location.search ) {
            return new URLSearchParams();
        } else {
            return new URLSearchParams( properties.location.search );
        }        
    }
    
    getEvents( pageNum, searchKeyword ) {
        console.log("getEventS()")
        this.eventsService.getEvents( pageNum, searchKeyword )
            .then( response => {      
                this.setState(
                    {
                        events: response.data,
                        totalPages: Math.floor( response.meta.total / Constants.EVENTS_PER_PAGE ) + 1,
                        loading: false, 
                    }
                );
            })
            .catch( function (error) {
                console.log(error);
            });
    }

    getFilterKeyword() {
        return this.state.filterKeyword.toLowerCase();
    }

    getSubmittedFilterKeyword( state ) {
        return state.submittedFilterKeyword.toLowerCase();
    }
    
    handleChangeKeyword(keyword) {
        this.setState({                 
            filterKeyword: keyword,
        });
    }

    handleCancel() {
        //asynchronous state update/read
        this.setState({ 
            filterKeyword: '',
            submittedFilterKeyword: '',
        });
    }
    
    handleSubmit() {        
        const keyword = this.getFilterKeyword();
        const submittedFilterKeyword = this.getSubmittedFilterKeyword( this.state ); //initially is blank ""

        //compare to last submitted filter keyword
        if( keyword !== submittedFilterKeyword ) {   
            this.setState({
                submittedFilterKeyword: keyword,
            });
        }  

        //componentDidUpdate will render page accordingly
    }
    
    componentDidMount() {
        const pageIndex = this.getCurrentPageIndex( this.props );
        const keyword = this.getFilterKeyword();

        console.log("componentDidMount :: pageIndex : ", pageIndex)
        this.getEvents( pageIndex, keyword );
    }

    componentDidUpdate(prevProps, prevState) {
        let pageIndex = this.getCurrentPageIndex( this.props );
        const submittedFilterKeyword = this.getSubmittedFilterKeyword( this.state );

        console.log("componentDidUpdate ::");
        
        //if keyword is different from last search
        if( submittedFilterKeyword !== this.getSubmittedFilterKeyword( prevState ) ) {
            console.log(" submittedFilterKeyword DIFFERNT - submittedFilterKeyword is: ", submittedFilterKeyword)   

            //reset to first page of results
            pageIndex = 1; 

            //force update URL in browser
            console.log("want to reload with PAGE 1")
            //this.props.history.push('/page/1');
            
            this.getEvents( pageIndex, submittedFilterKeyword );         
        } else if( submittedFilterKeyword === this.getSubmittedFilterKeyword( prevState ) && pageIndex !== this.getCurrentPageIndex( prevProps ) ) {
            console.log(" submittedFilterKeyword SAME, pageIndex DIFFERNT : pageIndex", pageIndex )
            this.getEvents( pageIndex, submittedFilterKeyword );
        }  


    }

    render() {
        const pageIndex = this.getCurrentPageIndex( this.props );

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Events</h1>

                        <SearchField 
                            filterKeyword={ this.state.filterKeyword }
                            onChangeKeyword={ this.handleChangeKeyword }
                            onCancel={ this.handleCancel }
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

/*
// Create a new component that is "connected" (to borrow redux terminology) to the router.
const EventsListWithRouter = withRouter( EventsList );
*/

export default EventsList;
