import React, { useEffect } from 'react'
import { useAppSelector } from 'hooks/useAppSelector';
import { getLoaderState } from 'redux/selectors';

function Loader() {
    const loading = useAppSelector(getLoaderState);
    return (
        <>
            {loading ? <div className="loaderbody">
                <div className="spinner">
                    <div className="bounce1"></div>
                    <div className="bounce2"></div>
                    <div className="bounce3"></div>
                </div>
            </div> : null}
        </>
    )
}

export default Loader;
