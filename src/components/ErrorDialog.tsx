import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetError, selectErrorState } from '../app/appSlice';


const ErrorDialog = () => {
    const dispatch = useDispatch();
    const hasError = useSelector(selectErrorState);
    const handleClose = () => dispatch(resetError());
    return (
        <Dialog
            open={hasError}
            onClose={handleClose}
        >
            <DialogTitle id="error-dialog-title">{"Something wrong happened"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="error-dialog-description">
                    An error occurred while trying to load the data. Try to reload the page. If that won't work either contact me
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default ErrorDialog
