import React, { useEffect, SyntheticEvent, MouseEvent } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import Slide, { SlideProps } from '@material-ui/core/Slide';
import { getAlertState } from 'redux/selectors';
import { useAppSelector } from 'hooks/useAppSelector';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { clearAlert } from 'redux/actions';
type TransitionProps = Omit<SlideProps, 'direction'>;


function TransitionRightToLeft(props: TransitionProps) {
    return <Slide {...props} direction="down" />;
}

function AlertNotification() {

    const alert = useAppSelector(getAlertState);
    const dispatch = useAppDispatch()

    const handleClose = (event: SyntheticEvent | MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(clearAlert());
    };

    useEffect(() => {
        if (alert.type) {
            setTimeout(() => {
                dispatch(clearAlert());
            }, alert.time)
        }
        return () => { }
    }, [alert])

    return (
        <>
            {alert.type && alert.message ? <div className="alert-wrap">
                <Snackbar open={true}
                    className={alert.type}
                    autoHideDuration={alert.duration}
                    TransitionComponent={TransitionRightToLeft}
                    // message={alert.message}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                    key='topright'
                >
                    <Alert
                        // onClose={handleClose}
                        severity={alert.type}
                    // action={
                    //     <IconButton
                    //         aria-label="close"
                    //         color="inherit"
                    //         size="small"
                    //         onClick={() => {
                    //             setDisplayAlert(false);
                    //         }}
                    //     >
                    //         <CloseIcon fontSize="inherit" />
                    //     </IconButton>
                    // }
                    >{alert.message}</Alert>
                </Snackbar>
            </div> : null}
        </>
    )
}

export default AlertNotification;
