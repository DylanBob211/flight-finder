import { CircularProgress, LinearProgress } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getInitialData, selectInitialLoading } from './app/appSlice';
import Body from './components/Body';
import ErrorDialog from './components/ErrorDialog';
import Flights from './components/Flights';
import Header from './components/Header';


function App() {
    const dispatch = useDispatch();
    const initialLoading = useSelector(selectInitialLoading);
    useEffect(() => {
        dispatch(getInitialData());
    }, [dispatch])

    if (initialLoading) return <LinearProgress />

    return (
        <>
            <CssBaseline />
            <Header />
            <Body>
                <Flights />
            </Body>
            <ErrorDialog />
        </>
    );
}



export default App;
