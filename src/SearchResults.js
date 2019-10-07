import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateTimeFromTo from './DateTimeFromTo';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
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

                                <DateTimeFromTo time_start={event.time_start} time_stop={event.time_stop} />
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
