import { Paper, Typography } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectFlights, selectAirlines, selectAirports } from '../app/appSlice';

const Flights = () => {
    const flights = useSelector(selectFlights);
    const airlinesInfo = useSelector(selectAirlines);
    const airportsInfo = useSelector(selectAirports);
    return (
        <>
            {flights
                .map(
                    flight => (
                        <FlightItem
                            key={flight.id}
                            airline={airlinesInfo.find(airline => airline.id === flight.airlineId)?.name || 'Could not find airline name'}
                            departureAirport={airportsInfo.find(airport => airport.id === flight.departureAirportId)?.codeIata || 'Could not find departure information'}
                            arrivalAirport={airportsInfo.find(airport => airport.id === flight.arrivalAirportId)?.codeIata || 'Could not find departure information'}
                            price={flight.price}
                        />),
                )}
        </>
    )
}

interface FlightItemProps {
    airline: string;
    departureAirport: string;
    arrivalAirport: string;
    price: number;
}

const FlightItem = ({ airline, departureAirport, arrivalAirport, price }: FlightItemProps) => {

    return (
        <Paper style={{ padding: 20, margin: '20px 0', display: 'flex', justifyContent: 'space-around' }} >
            <Typography variant="h6">{airline}</Typography>
            <Typography variant="h6">{departureAirport}<span className="material-icons">flight</span>{arrivalAirport}</Typography>
            <Typography variant="h6">{price}€</Typography>
        </Paper>
    )
}

export default Flights
