import axios, { AxiosResponse } from 'axios';
import { Airport } from '../model/airport.model';
import { Collection } from '../model/collection.model';

type ApiResponse<T> = Promise<AxiosResponse<T>>;

const api = axios.create({
    baseURL: process.env.REACT_APP_BASE_PATH,
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
})

export const getAirports = (): ApiResponse<Collection<Airport>> => api.get('/airports/all');
// export const getFlight = (from, to) =>