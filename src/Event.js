import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Event extends React.Component {
    constructor(props) {
        super(props);

        console.log("props are: ", props);
        const albumID = this.props.match.params.id;
        console.log("albumID is: ", albumID);
    }

    render() {
        return (
            <div>
                Event ID is { this.albumID }

                <hr />
                <Link to='/'>Back to Event List</Link>
            </div>
        );
    }
}

export default Event;
