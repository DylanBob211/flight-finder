import { Box, Container, Paper } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React from 'react';
import './App.css';
import Header from './components/Header';

function App() {
    return (
        <>
            <CssBaseline />
            <Header />
            <Container>
                <Box my={10}>
                    {[...new Array(12)]
                        .map(
                            () => <Paper > Hello world</Paper>,
                        )}
                </Box>
            </Container>
        </>
    );
}



export default App;
