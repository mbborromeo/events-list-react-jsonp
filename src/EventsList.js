import React, { Component } from 'react';
import * as Constants from './constants';
import EventsService from './EventsService';
import { Link } from 'react-router-dom';
//import PropTypes from "prop-types"
import { withRouter } from "react-router"
import './EventsList.scss';

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
    
    /*
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    */

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

    handleChangeKeyword(event) {
        this.setState({                 
            filterKeyword: event.target.value,
        });
    }
    
    handleSubmit(event) {
        event.preventDefault();    

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
            //force update URL in browser
            this.props.history.push('/page/1');

        } else {            
            pageIndex = this.getPageIndex( this.props );
            console.log("same keyword: pageIndex: ", pageIndex);
        }  

        console.log("!!!!!!!!!! handleSubmit : this.getEvents !!!!!!!!!!!!!!!!");
        //load events according to page number and keyword
        this.getEvents( pageIndex, keyword );        
    }
    
    handleCancel(event) {
        event.preventDefault();    

        //resetting string only works after this function finishes...
        this.setState({
            filterKeyword: '',
        });

        //search with query string
        const keyword = this.state.filterKeyword.toLowerCase();
        let pageIndex = undefined;

        console.log("@@@@@@@@@@@@@@ handleCancel :: keyword is: ", keyword);
        console.log("@@@@@@@@@@@@@@ prev keyword is: ", this.state.previousFilterKeyword.toLowerCase() );

        if( keyword != this.state.previousFilterKeyword.toLowerCase() ) {
            // need to reset pageIndex to 1 if new keyword            
            pageIndex = 1;
            console.log("different keyword: pageIndex: ", pageIndex);
            //force update URL in browser
            this.props.history.push('/page/1');

            //load events according to page number and keyword
            this.getEvents( pageIndex, keyword ); 
        }
    }

    render() {
        //console.log("this.state", this.state);
        const { match, location, history } = this.props;
        console.log("EventsList :: render :: props: ", this.props);

        return (
            <div>
                { this.state.loading ?
                    <div>Loading events list</div> :
                    <div>
                        <h1>Events List</h1>

                        <form onSubmit={ this.handleSubmit.bind(this) }>
                            <label>
                                Title: 
                                <input type="text" name="keyword"
                                    value={ this.state.filterKeyword }
                                    onChange={ this.handleChangeKeyword.bind(this) }
                                    placeholder="eg Band"
                                />
                            </label>
                            <input type="submit" value="Search" />
                            <input type="reset" value="Cancel" onClick={ this.handleCancel.bind(this) } />
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

// Create a new component that is "connected" (to borrow redux
// terminology) to the router.
const EventsListWithRouter = withRouter( EventsList );

export default EventsList;
