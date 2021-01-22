import { Box, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react'
import { useSelector } from 'react-redux';
import { selectFlights, selectAirlines, selectAirports } from '../app/appSlice';

const useStyles = makeStyles((theme) => ({
    card: {
        padding: theme.spacing(3),
        margin: `${theme.spacing(3)}px 0`,
        display: 'flex',
        alignItems: 'center'
    }
}))

const Flights = () => {
    const classes = useStyles();
    const flights = useSelector(selectFlights);
    const airlines = useSelector(selectAirlines);
    const airports = useSelector(selectAirports);
    return (
        <>
            {flights
                .map(
                    flight => (
                        <FlightItem
                            key={flight.id}
                            airline={airlines.find(airline => airline.id === flight.airlineId)?.name || 'Could not find airline name'}
                            departureAirport={airports.find(airport => airport.id === flight.departureAirportId)?.codeIata || 'Could not find departure information'}
                            arrivalAirport={airports.find(airport => airport.id === flight.arrivalAirportId)?.codeIata || 'Could not find departure information'}
                            price={flight.price}
                        />),
                )}
            {
                !!flights.length &&
                <Paper elevation={5} className={classes.card} style={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6">Flights amount: {flights.length}</Typography>
                    <Typography variant="h6">Total price: {flights.map(el => el.price).reduce((acc, cur) => acc + cur, 0).toFixed(2)}€</Typography>
                </Paper>
            }
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
    const classes = useStyles();
    return (
        <Paper className={classes.card} style={{ justifyContent: 'space-between' }} >
            <Box>
                <Typography variant="h6">{departureAirport}<span className="material-icons">flight</span>{arrivalAirport}</Typography>
                <Typography variant="h6">{airline}</Typography>
            </Box>
            <Typography variant="h6">{price}€</Typography>
        </Paper>
    )
}

export default Flights
