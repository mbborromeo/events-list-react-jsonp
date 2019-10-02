import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Event extends React.Component {
    constructor(props) {
        super(props);

        console.log("props are: ", props);
        const eventID = this.props.match.params.id;
        console.log("eventID is: ", eventID);
    }

    render() {
        return (
            <div>
                Event ID is { this.eventID }

                <hr />
                <Link to='/'>Back to Event List</Link>
            </div>
        );
    }
}

export default Event;
