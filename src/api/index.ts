import axios, { AxiosResponse } from 'axios';
import { Airline } from '../model/airline.model';
import { Airport } from '../model/airport.model';
import { Collection } from '../model/collection.model';
import { Flight } from '../model/flight.model';

type ApiResponse<T> = Promise<AxiosResponse<T>>;

const api = axios.create({
    baseURL: 'https://recruitment.shippypro.com/flight-engine/api',
    headers: {
        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`
    }
})

export const getAirports = (): ApiResponse<Collection<Airport>> => api.get('/airports/all');
export const getAirlines = (): ApiResponse<Collection<Airline>> => api.get('/airlines/all');
export const getFlights = (): ApiResponse<Collection<Flight>> => api.get('/flights/all');
export const getFlight = (departureCode: string, arrivalCode: string): ApiResponse<Collection<Flight>> => api.get(`/flights/from/${departureCode}/to/${arrivalCode}`);