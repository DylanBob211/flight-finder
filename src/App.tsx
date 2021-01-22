import { Box, Container } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getInitialData } from './app/appSlice';
import Flights from './components/Flights';
import Header from './components/Header';


function App() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getInitialData());
    }, [dispatch])
    return (
        <>
            <CssBaseline />
            <Header />
            <Container>
                <Box my={20}>
                    <Flights />
                </Box>
            </Container>
        </>
    );
}



export default App;
