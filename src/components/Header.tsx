import { AppBar, Box, Button, makeStyles, TextField, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import { createSelector } from '@reduxjs/toolkit';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAirports, selectArrival, selectDeparture, setArrival, setDeparture } from '../app/appSlice';

const useStyles = makeStyles(theme => ({
    title: {
        margin: `${theme.spacing(1)}px 0`
    },
    toolbar: {
        display: 'flex', 
        justifyContent: 'space-between' 
    },
    comboContainer: {
        flex: '1 1 100%', 
        display: 'flex', 
        flexWrap: 'wrap'
    },
    comboItem: {
        minWidth: 200,
        maxWidth: 300,
        marginRight: theme.spacing(1)
    },
}))

interface Props {
    children: React.ReactElement;
}


function ElevationScroll({ children }: Props) {
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const selectArrivals = createSelector(
    selectAirports,
    selectDeparture,
    (airports, departure) => airports.filter(el => el.codeIata !== departure)
)

const selectDepartures = createSelector(
    selectAirports,
    selectArrival,
    (airports, arrival) => airports.filter(el => el.codeIata !== arrival)
)

const Header = () => {
    const dispatch = useDispatch();
    const departures = useSelector(selectDepartures);
    const arrivals = useSelector(selectArrivals);
    const selectedDeparture = useSelector(selectDeparture);
    const selectedArrival = useSelector(selectArrival);
    const classes = useStyles()
    return (
        <ElevationScroll>
            <AppBar>
                <Typography align="center" variant="h6" className={classes.title}>Find a flight</Typography>
                <Toolbar className={classes.toolbar}>
                    <Box component="span" className={classes.comboContainer}>
                        <Autocomplete
                            id="combo-box-departure"
                            options={departures}
                            getOptionLabel={(airports) => airports.codeIata}
                            className={classes.comboItem}
                            renderInput={(params) => <TextField {...params} label="From" variant="outlined" />}
                            onChange={(_, value) => dispatch(setDeparture(!!value ? value.codeIata : null))}
                        />
                        <Autocomplete
                            id="combo-box-arrival"
                            options={arrivals}
                            getOptionLabel={(airports) => airports.codeIata}
                            className={classes.comboItem}
                            color="primary"
                            renderInput={(params) => <TextField {...params} label="To" variant="outlined" />}
                            onChange={(_, value) => dispatch(setArrival(!!value ? value.codeIata : null))}
                        />
                    </Box>
                    <Button variant="contained" color="primary" disabled={!selectedArrival || !selectedDeparture}><span className="material-icons">search</span></Button>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
    )
}


export default Header
