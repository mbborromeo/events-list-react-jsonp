import axios from 'axios-jsonp-pro'; //https://www.npmjs.com/package/axios-jsonp-pro
import * as Constants from './constants';

const API_BASE = 'https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions';
const API_KEY = 'cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2';

class EventsService {
    getEvents( currentPage=1 ) {
        return axios.jsonp(
            API_BASE,
            {
                timeout: 2000,
                params: {
                    api: API_KEY,
                    per_page: Constants.EVENTS_PER_PAGE,
                    page: currentPage,
                    //search: 'Jason',
                }
            }
        );        
    }

    getEvent( idx ) {
        return axios.jsonp(             
            API_BASE + `/${ idx }`,
            {
                timeout: 2000,
                params: {
                    api: API_KEY,
                }
            }
        );
    }
}

export default EventsService;
