import React, { Component } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router"
import './EventsList.scss';
import SearchField from './SearchField';
import SearchResults from './SearchResults';

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

        if( keyword != this.state.previousFilterKeyword.toLowerCase() ) {
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
        const keyword = this.state.filterKeyword.toLowerCase();
        this.getEvents( pageIndex, keyword );
    }

    componentDidUpdate(prevProps, prevState) {
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
                            onChangeKeyword={this.handleChangeKeyword.bind(this)}
                            onSubmit={this.handleSubmit.bind(this)}
                        />

                        <SearchResults
                            events={this.state.events} 
                        />                       

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

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const EventsListWithRouter = withRouter( EventsList );

export default EventsList;
