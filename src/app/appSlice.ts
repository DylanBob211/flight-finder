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
}

const initialState: AppState = {
    flights: [] as Flight[],
    airlines: [] as Airline[],
    airports: [] as Airport[],
    departure: null,
    arrival: null
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
        },
        getAirlines: (state, action: PayloadAction<Airline[]>) => {
            state.airlines = action.payload;
        }
    }
});

export const { setDeparture, setArrival } = appSlice.actions;

export const getAirports = (): AppThunk => (dispatch) => {
    api.getAirports().then((res) => dispatch(appSlice.actions.getAirports(res.data.data)));
};
export const getAirlines = (): AppThunk => dispatch => {
    api.getAirlines().then(res => dispatch(appSlice.actions.getAirlines(res.data.data)))
}
export const searchBestFlight = (from: string, to: string): AppThunk => (dispatch) => {
    api.getFlight(from, to).then((res) => dispatch(appSlice.actions.getBestFlight(res.data.data)));
};

export const selectAirports = (state: RootState) => state.app.airports;
export const selectDeparture = (state: RootState) => state.app.departure;
export const selectArrival = (state: RootState) => state.app.arrival;

export default appSlice.reducer;
