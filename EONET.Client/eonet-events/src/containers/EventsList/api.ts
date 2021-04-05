import { BASE_URL, API } from '../../api';
import { AxiosPromise } from 'axios';
import { EventsFilterModel } from '../../core/models/EventsFilterModel'

export const getEventsList = (filter: EventsFilterModel): AxiosPromise => {
    let parameters = "";
    if (filter) {
        parameters = "?"

        if (filter.statusFilter)
            parameters += `status=${filter.statusFilter}&`;

        if (filter.lastDaysFilter)
            parameters += `days=${filter.lastDaysFilter}&`;

        if (filter.categoryId)
            parameters += `categoryId=${filter.categoryId}&`;

        if (filter.sorting)
            parameters += `sorting=${filter.sorting}`;
    }

    return API.get(`${BASE_URL}/api/events${parameters}`);
}

export default getEventsList;