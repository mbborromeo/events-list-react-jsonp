import React, { Component } from 'react';
import * as Constants from './constants';

class DateTimeFromTo extends Component {    
    constructor(props) {
        super(props);
        
        this.getMonthName = this.getMonthName.bind(this);
    }

    getMonthName(m) {
        return Constants.MONTH_NAME[m];
    }

    render () {
        return (
            <span>
                { this.props.time_start &&  
                    <span>
                        {
                            new Date(this.props.time_start).getDate() + ' ' + 
                            this.getMonthName( new Date(this.props.time_start).getMonth() ) + ' ' + 
                            new Date(this.props.time_start).getFullYear() + ', ' + 
                            new Date(this.props.time_start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + ' - ' 
                        }
                    </span>
                }

                { this.props.time_stop && 
                    <span>
                        { (new Date(this.props.time_stop)!==new Date(this.props.time_start) && 
                            new Date(this.props.time_stop).getMonth()!==new Date(this.props.time_start).getMonth() &&
                            new Date(this.props.time_stop).getFullYear()!==new Date(this.props.time_start).getFullYear()
                        ) &&
                                new Date(this.props.time_stop).getDate() + ' ' + 
                                this.getMonthName( new Date(this.props.time_stop).getMonth() ) + ' ' + 
                                new Date(this.props.time_stop).getFullYear() + ', '
                        }

                        { //show no matter what
                            new Date(this.props.time_stop).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
                        }
                    </span>
                }
            </span>
        );
    }
}

export default DateTimeFromTo;
