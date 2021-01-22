import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Airline } from '../model/airline.model';
import { Airport } from '../model/airport.model';
import { Flight } from '../model/flight.model';
import { AppThunk, RootState } from './store';
import * as api from '../api';

interface AppState {
    flights: Flight[];
    airlines: Airline[];
    airports: Airport[];
    departure: string | null;
    arrival: string | null;
    initialLoading: boolean;
    bodyLoading: boolean;
}

const initialState: AppState = {
    flights: [] as Flight[],
    airlines: [] as Airline[],
    airports: [] as Airport[],
    departure: null,
    arrival: null,
    initialLoading: true,
    bodyLoading: false
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        getAirports: (state, action: PayloadAction<Airport[]>) => {
            state.airports = action.payload;
        },
        setDeparture: (state, action: PayloadAction<string | null>) => {
            state.departure = action.payload;
        },
        setArrival: (state, action: PayloadAction<string | null>) => {
            state.arrival = action.payload;
        },
        getBestFlight: (state, action: PayloadAction<Flight[]>) => {
            state.flights = action.payload;
            state.bodyLoading = false;
        },
        getAirlines: (state, action: PayloadAction<Airline[]>) => {
            state.airlines = action.payload;
        },
        stopInitialLoading: (state) => {
            state.initialLoading = false;
        },
        startBodyLoading: (state) => {
            state.bodyLoading = true;
        }
    }
});

// ACTIONS

export const { setDeparture, setArrival } = appSlice.actions;

export const searchBestFlight = (from: string, to: string): AppThunk => (dispatch) => {
    dispatch(appSlice.actions.startBodyLoading());
    api.getFlight(from, to).then((res) => dispatch(appSlice.actions.getBestFlight(res.data.data)));
};
export const getInitialData = (): AppThunk => dispatch => {
    Promise.all([api.getAirlines(), api.getAirports()]).then(([airlines, airports]) => {
        dispatch(appSlice.actions.getAirlines(airlines.data.data))
        dispatch(appSlice.actions.getAirports(airports.data.data))
        dispatch(appSlice.actions.stopInitialLoading());
    });
}

// SELECTORS

export const selectAirports = (state: RootState) => state.app.airports;
export const selectDeparture = (state: RootState) => state.app.departure;
export const selectArrival = (state: RootState) => state.app.arrival;
export const selectFlights = (state: RootState) => state.app.flights;
export const selectAirlines = (state: RootState) => state.app.airlines;
export const selectInitialLoading = (state: RootState) => state.app.initialLoading;
export const selectBodyLoading = (state: RootState) => state.app.bodyLoading;
export default appSlice.reducer;
