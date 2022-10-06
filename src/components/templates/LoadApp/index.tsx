import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import { updateCurrentPage } from 'redux/actions';

function LoadApp() {

    const dispatch = useAppDispatch();
    const state = useAppSelector((state: any) => state);
    useEffect(() => {
        console.log(`%c ____CURRENT REDUX STATE_____(${new Date().toLocaleTimeString()})\n`, 'background: #04c8c80f; color: #04c8c8; padding:2px; margin:10px 0 0', state)
        console.log(`%c _____________________________`, ' color: #04c8c8;')
    }, [state])

    const location = useLocation();
    useEffect(() => {
        // console.log("Location changed", location);
        dispatch(updateCurrentPage(location));
    }, [location]);

    return null
}

export default LoadApp