import { BASE_URL, API } from '../../api';
import { AxiosPromise } from 'axios';

export const getCategories = (): AxiosPromise =>
    API.get(`${BASE_URL}/api/categories`);

export default getCategories;