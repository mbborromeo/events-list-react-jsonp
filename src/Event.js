import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios-jsonp-pro';

class Event extends React.Component {
    state = {
        event: [],
    }

    /*
    constructor(props) {
        super(props);
        console.log("props are: ", props);        
    }
    */

    componentDidMount() {
        const eventID = this.props.match.params.id;
        console.log("eventID is: ", eventID);

        //call API to get Details for Event with eventID and save this in State event
        axios.jsonp(`https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions/${ eventID }`, 
        {
            timeout: 2000,
            params: {
            api: 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2'
            }
        })
        .then( response => {
            console.log(response);

            this.setState(
                {
                    event: response.data,
                    loading: false,
                }
            );
            }
        )
        .catch( function (error) {
            console.log(error);
            }
        );
    }

    render() {
        return (
            <div>
                Event name is { this.state.event.name }

                <hr />
                <Link to='/'>Back to Event List</Link>
            </div>
        );
    }
}

export default Event;
