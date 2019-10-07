import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as Constants from './constants';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);

        this.getMonthName = this.getMonthName.bind(this);
    }

    getMonthName(m) {
        return Constants.MONTH_NAME[m];
    }

    render () {


        return (
            <div>
                { this.props.events &&
                    this.props.events.map( event =>
                        <h3 key={event.id}>
                            <Link to={'/event/' + event.id}>
                                { event.name } 
                                <br />

                                {                                    
                                    new Date(event.time_start).getDate() + ' ' + 
                                    this.getMonthName( new Date(event.time_start).getMonth() ) + ' ' + 
                                    new Date(event.time_start).getFullYear() + ', ' + 
                                    new Date(event.time_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' 
                                }

                                { ( new Date(event.time_stop)!==new Date(event.time_start) && 
                                    new Date(event.time_stop).getMonth()!==new Date(event.time_start).getMonth() &&
                                    new Date(event.time_stop).getFullYear()!==new Date(event.time_start).getFullYear()
                                  ) &&
                                    new Date(event.time_stop).getDate() + ' ' + 
                                    this.getMonthName( new Date(event.time_stop).getMonth() ) + ' ' + 
                                    new Date(event.time_stop).getFullYear() + ', '
                                }

                                {
                                    new Date(event.time_stop).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
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
