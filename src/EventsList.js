import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Event List</h1>
                { 
                    this.props.events.map( event =>
                        <h2 key={event.id}><Link to={'/event/' + event.id}>{event.name}</Link></h2>
                    )
                }                
            </div>
        );
    }
}

export default EventsList;
