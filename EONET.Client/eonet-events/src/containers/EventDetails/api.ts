import { BASE_URL, API } from '../../api';
import { AxiosPromise } from 'axios';

export const getEvent = (eventId: string): AxiosPromise =>
    API.get(`${BASE_URL}/api/events/${eventId}`);

export default getEvent;