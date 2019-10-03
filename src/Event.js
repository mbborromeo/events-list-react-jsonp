import React, { Component } from 'react';
import axios from 'axios-jsonp-pro';
import { Link } from 'react-router-dom';

class Event extends React.Component {
    state = {
        loading: true,
        event: [],        
    }

    constructor(props) {
        super(props);
        console.log("props are: ", props);
        console.log("state.event is: ", this.state.event);
    }

    componentDidMount() {
        const eventID = this.props.match.params.id;

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
                { this.state.loading ?
                    <div>Loading event</div> :
                    <div>
                        { //this.state.event.name &&
                            <div>
                                Event name: { this.state.event.name }<br />
                            </div>
                        }

                        { //this.state.event.id &&
                            <div>
                                ID: { this.state.event.id }<br />
                            </div>
                        }

                        { //this.state.event.description &&
                            <div>
                                Description: { this.state.event.description }<br />
                            </div>
                        }

                        LOOP THIS categories[i].name: this.state.event.categories[0].name <br />

                        { //this.state.event.thumbnail_image_url &&
                            <div>
                                thumbnail_image_url: { this.state.event.thumbnail_image_url }<br />
                            </div>
                        }

                        { //this.state.event.time_start &&
                            <div>
                                time_start: 
                                { new Date(this.state.event.time_start).getDate() + '-' } 
                                { new Date(this.state.event.time_start).getMonth()+1 + '-' }
                                { new Date(this.state.event.time_start).getFullYear() + ', ' }
                                { new Date(this.state.event.time_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' ' }
                                <br />
                            </div>
                        }

                        { //this.state.event.time_stop &&
                            <div>
                                time_stop: 
                                { new Date(this.state.event.time_stop).getDate() + '-' } 
                                { new Date(this.state.event.time_stop).getMonth()+1 + '-' }
                                { new Date(this.state.event.time_stop).getFullYear() + ', ' }
                                { new Date(this.state.event.time_stop).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' ' }
                                <br />
                            </div>
                        }

                        { //this.state.event.location &&
                            <div>
                                location.name: { this.state.event.location }<br />
                            </div>
                        }

                        <br /><br />
                        <Link to='/'>Back to Event List</Link>
                    </div>
                }
            </div>
        );
    }
}

export default Event;
