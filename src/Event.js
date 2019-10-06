import React, { Component } from 'react';
import EventsService from './EventsService';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router"

class Event extends React.Component {
    constructor(props) {
        super(props);        

        this.state = {
            loading: true,
            event: [],        
        }
        
        this.eventsService = new EventsService();
    }

    getEvent( id ) {
        this.eventsService.getEvent( id )
            .then( response => {
                //console.log("Event :: getEvent : ", response);

                this.setState(
                    {
                        event: response.data,
                        loading: false,
                    }
                );
            })
            .catch( function (error) {
                console.log(error);
            });
    }
    
    getEventID(properties) {
        //console.log("props are: ", properties);
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
                        <h1>
                            { this.state.event.name ? this.state.event.name : "" }                                
                        </h1>
                        
                        <div>
                            Location: 
                            { (this.state.event.location && this.state.event.location.name) ?
                                ' ' + this.state.event.location.name
                                : ""
                            }
                        </div>
                                               
                        <div>
                            From: 
                            { this.state.event.time_start ?
                                ' ' + new Date(this.state.event.time_start).getDate() + '-' + 
                                (new Date(this.state.event.time_start).getMonth()+1) + '-' + 
                                new Date(this.state.event.time_start).getFullYear() + ', ' + 
                                new Date(this.state.event.time_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' ' 
                                : ""
                            }
                        </div>

                        <div>
                            To: 
                            { this.state.event.time_stop ?
                                ' ' + new Date(this.state.event.time_stop).getDate() + '-' + 
                                (new Date(this.state.event.time_stop).getMonth()+1) + '-' + 
                                new Date(this.state.event.time_stop).getFullYear() + ', ' + 
                                new Date(this.state.event.time_stop).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' '
                                : ""
                            }
                        </div>

                        <div>
                            Categories:&nbsp;
                            { (this.state.event.categories && this.state.event.categories.length>0 ) ? 
                                this.state.event.categories.map(
                                    (category) => <span key={ category.id }>{ category.name + ' ' }</span>
                                )
                                : ""
                            }
                        </div>

                        <div>
                            Description: { this.state.event.description ? this.state.event.description : "" }
                        </div>
                        
                        <div>
                            { (this.state.event.thumbnail_image_url && this.state.event.name) &&
                                <img 
                                    src={ this.state.event.thumbnail_image_url }
                                    alt={ 'Image of event ' + this.state.event.name } 
                                />
                            }                            
                        </div>

                        <div>
                            Event ID: 
                            { this.state.event.id ? ' ' + this.state.event.id : "" }
                        </div>

                        <br /><br />

                        <hr />
                        <button      
                            //to='/page/1'                       
                            onClick={ () => this.props.history.goBack() }
                            className='button back'
                        >
                            &lt; Back
                        </button>
                    </div>
                }
            </div>
        );
    }
}

const EventWithRouter = withRouter( Event );

export default Event;
