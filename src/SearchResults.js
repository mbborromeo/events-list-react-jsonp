import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

    }

    render () {
        return (
            <div>
                {
                    this.props.events.map( event =>
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
                                    new Date(event.time_stop).getDate() + '-' + 
                                    (new Date(event.time_stop).getMonth()+1) + '-' + 
                                    new Date(event.time_stop).getFullYear() + ', ' + 
                                    new Date(event.time_stop).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ')' 
                                }
                            </Link>
                        </h3>
                    )
                }  

                <br />
            </div>
        );
    }
}

export default SearchResults;
