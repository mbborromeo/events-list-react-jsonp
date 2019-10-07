import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DateTimeFromTo from './DateTimeFromTo';
import './SearchResults.scss';

class SearchResults extends React.Component {
    render () {
        return (
            <div>
                { this.props.events &&
                    <ul>
                        { this.props.events.map( event =>
                            <li key={event.id}>
                                <Link to={'/event/' + event.id}>
                                    { event.name && <h3>{ event.name }</h3> }

                                    <DateTimeFromTo time_start={event.time_start} time_stop={event.time_stop} />
                                </Link>
                            </li>
                        )
                        }
                    </ul>
                }  

                <br />
                <br />
                <br />
            </div>
        );
    }
}

export default SearchResults;
