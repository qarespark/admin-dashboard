import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { Select, MenuItem, InputLabel, Switch } from '@material-ui/core';
import { PAYMENT_TYPES } from 'constants/common';
import { storesList, tenantsList } from 'services/dummyData';

type pageProps = {
    resparkDetails: any,
    open: any,
    handleClose: any
}

const AddStoreToGupshupModal: FC<pageProps> = ({ open, handleClose, resparkDetails }) => {

    const [gupshupStoreState, setGupshupStoreState] = useState({ tenant: null, store: null, registered: false, appKey: resparkDetails[0].appKey, appName: resparkDetails[0].appName, appNumber: resparkDetails[0].appNumber, chargePerMessage: 0.80 })
    const [error, setError] = useState<any>('');
    const [activeTenants, setActiveTenants] = useState<any>([{ name: 'Select Tenant', id: '111' }]);
    const [activeStores, setActiveStores] = useState<any>([{ name: 'Select Store', id: '111' }]);

    useEffect(() => {
        setGupshupStoreState({ tenant: null, store: null, registered: false, appKey: resparkDetails[0].appKey, appName: resparkDetails[0].appName, appNumber: resparkDetails[0].appNumber, chargePerMessage: 0.80 });

        setError({})
    }, [open])

    useEffect(() => {
        if (tenantsList) {
            setActiveTenants([{ name: 'Select Tenant', id: '111' }, ...tenantsList])
        }
    }, [tenantsList])

    useEffect(() => {
        if (storesList) {
            setActiveStores([{ name: 'Select Store', id: '111' }, ...storesList.filter((s: any) => s.tenantId == gupshupStoreState?.tenant?.id)])
        }
    }, [storesList, gupshupStoreState.tenant])


    const onChangeInput = (from: any, value: any) => {
        setError({})
        const rechargeStateCopy = { ...gupshupStoreState };
        rechargeStateCopy[from] = value;
        setGupshupStoreState(rechargeStateCopy)
    }

    const onSave = () => {
        if (!gupshupStoreState.tenant) {
            setError({ text: 'Please select tenant', id: 'tenant' })
        } else if (!gupshupStoreState.store) {
            setError({ text: 'Please select store', id: 'store' })
        } else if (!gupshupStoreState.appName) {
            setError({ text: 'Please select app name', id: 'appName' })
        } else if (!gupshupStoreState.appNumber) {
            setError({ text: 'Please select app number', id: 'appNumber' })
        } else if (!gupshupStoreState.appKey) {
            setError({ text: 'Please select app key', id: 'appKey' })
        } else {
            handleClose(gupshupStoreState);
        }
    }

    const onCancel = () => {
        handleClose();
    }

    const onAccountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const gupshupStoreStateCopy = { ...gupshupStoreState };
        gupshupStoreStateCopy.registered = event.target.checked;
        if (gupshupStoreStateCopy.registered) {
            gupshupStoreStateCopy.appKey = gupshupStoreStateCopy.appName = gupshupStoreStateCopy.appNumber = '';
        } else {
            gupshupStoreStateCopy.appKey = resparkDetails[0].appKey;
            gupshupStoreStateCopy.appName = resparkDetails[0].appName;
            gupshupStoreStateCopy.appNumber = resparkDetails[0].appNumber;
        }
        setGupshupStoreState({ ...gupshupStoreStateCopy })

    }

    return (
        <Backdrop
            className="common-modal-wrap add-store-to-gupshup-modal-wrap"
            open={open}
        // onClick={() => handleClose(false)}
        >
            <div className=" modal-content-wrap" style={{ height: `${open ? '525px' : '0'}`, width: '660px' }}>
                <div className="close-modal" onClick={() => handleClose()}>
                    <CloseIcon />
                </div>
                <div className="heading"> Register store to whatsapp</div>
                <div className='modal-content'>
                    <div className='element-group-wrap'>
                        <div className='element-group card'>
                            <div className="input-wrap">
                                <div className='label'>Tenant<span className='mandatory'>*</span></div>
                                <Select
                                    className={`input ${error.id == 'tenant' ? 'error ' : ''}`}
                                    labelId="paid-via-label"
                                    placeholder='Select payment type'
                                    value={gupshupStoreState.tenant || activeTenants[0]}
                                    onChange={(e) => onChangeInput('tenant', e.target.value)}
                                >
                                    {activeTenants.map((tenant: any, i: number) => {
                                        return <MenuItem className='sub-heading' value={tenant} key={i}>{tenant.name}</MenuItem>
                                    })}
                                </Select>
                                {error.id == 'tenant' && <div className="error error-text">{error.text}</div>}
                            </div>
                        </div>

                        <div className='element-group card'>
                            <div className="input-wrap">
                                <div className='label'>Store<span className='mandatory'>*</span></div>
                                <Select
                                    className={`input ${error.id == 'store' ? 'error ' : ''}`}
                                    labelId="paid-via-label"
                                    placeholder='Select payment type'
                                    value={gupshupStoreState.store || activeStores[0]}
                                    onChange={(e) => onChangeInput('store', e.target.value)}
                                >
                                    {activeStores.map((store: any, i: number) => {
                                        return <MenuItem className='sub-heading' value={store} key={i}>{store.name}</MenuItem>
                                    })}
                                </Select>
                                {error.id == 'store' && <div className="error error-text">{error.text}</div>}
                            </div>
                        </div>
                    </div>

                    <div className='element-group switch-wrap card'>
                        <Switch
                            checked={gupshupStoreState.registered}
                            onChange={onAccountChange}
                        />
                        <div className='label'>Use Personal account for whatsapp</div>
                    </div>

                    <div className={`element-group-wrap ${gupshupStoreState.registered ? '' : 'disabled'}`}>
                        <div className='element-group card'>
                            <div className="input-wrap">
                                <div className='label'>App name<span className='mandatory'>*</span></div>
                                <input className={`${error.id == 'appName' ? 'error ' : ''}`}
                                    autoComplete="off"
                                    type="text"
                                    value={gupshupStoreState.appName || ''}
                                    onChange={(e) => onChangeInput('appName', e.target.value)}
                                    placeholder="App name on gupshup dashboard*"
                                />
                                {error.id == 'appName' && <div className="error error-text">{error.text}</div>}
                            </div>
                        </div>

                        <div className='element-group card'>
                            <div className="input-wrap">
                                <div className='label'>App number<span className='mandatory'>*</span></div>
                                <input className={`${error.id == 'appNumber' ? 'error ' : ''}`}
                                    autoComplete="off"
                                    type="number"
                                    value={gupshupStoreState.appNumber || ''}
                                    onChange={(e) => onChangeInput('appNumber', e.target.value)}
                                    placeholder="App number on gupshup dashboard*"
                                />
                                {error.id == 'appNumber' && <div className="error error-text">{error.text}</div>}
                            </div>
                        </div>
                    </div>

                    <div className={`element-group-wrap ${gupshupStoreState.registered ? '' : 'disabled'}`}>
                        <div className='element-group card'>
                            <div className="input-wrap">
                                <div className='label'>App API key<span className='mandatory'>*</span></div>
                                <input className={`${error.id == 'appKey' ? 'error ' : ''}`}
                                    autoComplete="off"
                                    type="text"
                                    value={gupshupStoreState.appKey || ''}
                                    onChange={(e) => onChangeInput('appKey', e.target.value)}
                                    placeholder="App API key on gupshup dashboard*"
                                />
                                {error.id == 'appKey' && <div className="error error-text">{error.text}</div>}
                            </div>
                        </div>

                        <div className='element-group card'>
                            <div className="input-wrap">
                                <div className='label'>Charges per message<span className='mandatory'>*</span></div>
                                <input className={`${error.id == 'chargePerMessage' ? 'error ' : ''}`}
                                    autoComplete="off"
                                    type="number"
                                    value={gupshupStoreState.chargePerMessage || ''}
                                    onChange={(e) => onChangeInput('chargePerMessage', e.target.value)}
                                    placeholder="Enter charges per message*"
                                />
                                {error.id == 'chargePerMessage' && <div className="error error-text">{error.text}</div>}
                            </div>
                        </div>
                    </div>

                    <div className='footer-btn-wrap clearfix'>
                        <div className="primary-btn" onClick={onSave}>Add</div>
                        <div className="primary-btn border-btn" onClick={onCancel}>Cancel</div>
                    </div>
                </div>
            </div>
        </Backdrop>
    );
}

export default AddStoreToGupshupModal;