import { BASE_URL, API } from '../../api';
import { AxiosPromise } from 'axios';
import { EventsFilterModel } from '../../core/models/EventsFilterModel'

export const getEventsList = (filter: EventsFilterModel): AxiosPromise =>
    API.get(`${BASE_URL}/api/events`);

export default getEventsList;