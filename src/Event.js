import React, { Component } from 'react';
import EventsService from './EventsService';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router";
import DateTimeFromTo from './DateTimeFromTo';
import './Event.scss';

class Event extends React.Component {
    constructor(props) {
        super(props);        

        this.state = {
            loading: true,
            event: [],
            loadingImage: true,
            imageError: false,
        }
        
        this.eventsService = new EventsService();
        this.handleImageLoaded = this.handleImageLoaded.bind(this);
        this.handleImageError = this.handleImageError.bind(this);
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

    handleImageLoaded() {
        this.setState({ 
            loadingImage: false,
        });
    }

    handleImageError() {        
        this.setState({ 
            imageError: true,
        });
    }

    render() {
        return (
            <div>
                { this.state.loading ?
                    <div>Loading event</div> :
                    <div>                        
                        <h1>
                            { this.state.event.name ? this.state.event.name : "" }                                
                        </h1>
                        
                        <div>
                            Where:
                            { (this.state.event.location && this.state.event.location.name) ?
                                ' ' + this.state.event.location.name
                                : ""
                            }
                        </div>

                        <div>When:&nbsp;
                            <DateTimeFromTo time_start={this.state.event.time_start} time_stop={this.state.event.time_stop} />
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
                    
                        { this.state.event.thumbnail_image_url &&
                            <div className='image-event'>
                                { (this.state.loadingImage && this.state.imageError===false) &&
                                    <span className="loading">loading... </span>
                                }  

                                { this.state.imageError && 
                                    <span className="error">error! </span>
                                }  

                                <img 
                                    src={ this.state.event.thumbnail_image_url }
                                    alt="Image"
                                    onLoad={ this.handleImageLoaded }
                                    onError={ this.handleImageError }
                                />
                            </div>   
                        }                        

                        <div>
                            Event ID: 
                            { this.state.event.id ? ' ' + this.state.event.id : "" }
                        </div>

                        <br /><br />

                        <hr />
                        <Link 
                            to={'/'}
                            className='button back'
                            //<button onClick={ () => this.props.history.goBack() }>
                        >
                            &lt; Back 
                        </Link>
                    </div>
                }
            </div>
        );
    }
}

const EventWithRouter = withRouter( Event );

export default Event;
