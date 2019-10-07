import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateTimeFromTo from './DateTimeFromTo';
import './SearchResults.scss';

class SearchResults extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        return (
            <div>
                { this.props.events &&
                    this.props.events.map( event =>
                        <Link key={event.id} to={'/event/' + event.id}>
                            { event.name && <h3>{ event.name }</h3> }

                            <DateTimeFromTo time_start={event.time_start} time_stop={event.time_stop} />
                            <br />

                        </Link>
                    )
                }  

                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default SearchResults;
