import React, { Component } from 'react';
import axios from 'axios-jsonp-pro';
import { Link } from 'react-router-dom';

class Event extends React.Component {
    constructor(props) {
        super(props);        

        this.state = {
            loading: true,
            event: [],        
        }
    }

    getEvent( id ) {
        axios.jsonp(`https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions/${ id }`, 
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
    
    getEventID(properties) {
        console.log("props are: ", properties);
        return properties.match.params.id;
    }

    componentDidMount() {
        const eventID = this.getEventID( this.props );
        this.getEvent( eventID );
    }

    componentDidUpdate(prevProps) {
        const eventID = this.getEventID( this.props );

        if( eventID !== this.getEventID( prevProps ) ){
          this.getEvent( eventID );
        }
    }

    render() {
        console.log("this.state.event is: ", this.state.event);

        return (
            <div>
                { this.state.loading ?
                    <div>Loading event</div> :
                    <div>
                        { this.state.event.name &&
                            <div>
                                { this.state.event.name }
                                { this.state.event.id &&
                                    <span>
                                        { ' (ID: ' + this.state.event.id + ')' }<br />
                                    </span>
                                }
                            </div>
                        }

                        { this.state.event.description &&
                            <div>
                                Description: { this.state.event.description }<br />
                            </div>
                        }
                        
                        { this.state.event.categories && this.state.event.categories.length>0 &&
                            <div>
                                Categories: 
                                {
                                    this.state.event.categories.map(
                                        (category) => <span key={ category.id }>{ category.name + ' ' }</span>
                                    )
                                }
                            </div>
                        }

                        { this.state.event.time_start &&
                            <div>
                                From: 
                                { 
                                    ' ' + new Date(this.state.event.time_start).getDate() + '-' + 
                                    (new Date(this.state.event.time_start).getMonth()+1) + '-' + 
                                    new Date(this.state.event.time_start).getFullYear() + ', ' + 
                                    new Date(this.state.event.time_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' ' 
                                 }
                                <br />
                            </div>
                        }

                        { this.state.event.time_stop &&
                            <div>
                                To: 
                                { 
                                    ' ' + new Date(this.state.event.time_stop).getDate() + '-' + 
                                    (new Date(this.state.event.time_stop).getMonth()+1) + '-' + 
                                    new Date(this.state.event.time_stop).getFullYear() + ', ' + 
                                    new Date(this.state.event.time_stop).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' '
                                }
                                <br />
                            </div>
                        }

                        { this.state.event.location && this.state.event.location.name &&
                            <div>
                                location.name: { this.state.event.location.name }<br />
                            </div>
                        }
                        
                        { this.state.event.thumbnail_image_url &&
                            <div>
                                <img src={ this.state.event.thumbnail_image_url } />
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
