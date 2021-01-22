import { Container, Box, CircularProgress } from '@material-ui/core'
import React from 'react'
import { useSelector } from 'react-redux';
import { selectBodyLoading } from '../app/appSlice';

const Body = ({ children }: { children: React.ReactElement | React.ReactElement[] }) => {
    const bodyLoading = useSelector(selectBodyLoading);
    return (
        <Container>
            {bodyLoading ? (
                <Box style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <CircularProgress />
                </Box>
            ) : (
                    <Box my={22}>{children}</Box>
                )}
        </Container>
    )
}


export default Body
