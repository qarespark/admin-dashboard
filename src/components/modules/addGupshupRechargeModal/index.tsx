import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { Select, MenuItem } from '@material-ui/core';
import { PAYMENT_TYPES } from 'constants/common';

type pageProps = {
    open: any,
    handleClose: any,
    activeTenant: any
}

const AddGupshupRechargeModal: FC<pageProps> = ({ open, handleClose, activeTenant }) => {

    const [rechargeState, setRechargeState] = useState({ amount: '', paidVia: '' })
    const [error, setError] = useState<any>('');

    useEffect(() => {
        setRechargeState({ amount: '', paidVia: '' })
        setError({})
    }, [open])


    const onChangeInput = (from: any, value: any) => {
        setError({})
        const rechargeStateCopy = { ...rechargeState };
        rechargeStateCopy[from] = value;
        setRechargeState(rechargeStateCopy)
    }

    const onSave = () => {
        if (!rechargeState.amount) {
            setError({ text: 'Please enter recharge amount', id: 'amount' })
        } else if (!rechargeState.paidVia || rechargeState.paidVia == 'Select Payment Type') {
            setError({ text: 'Please select recharge payment type', id: 'paidVia' })
        } else {
            handleClose(rechargeState);
        }
    }

    const onCancel = () => {
        handleClose();
    }

    return (
        <Backdrop
            className="common-modal-wrap"
            open={open}
        // onClick={() => handleClose(false)}
        >
            <div className=" modal-content-wrap" style={{ height: `${open ? '560px' : '0'}`, width: '400px' }}>
                <div className="close-modal" onClick={() => handleClose()}>
                    <CloseIcon />
                </div>
                <div className="heading"> Add Recharge</div>
                <div className='modal-content'>
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Amount<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'amount' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="number"
                                value={rechargeState.amount || ''}
                                onChange={(e) => onChangeInput('amount', e.target.value)}
                                placeholder="Enter recharge amount*"
                            />
                            {error.id == 'amount' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Paid Via<span className='mandatory'>*</span></div>
                            <Select
                                className={`input ${error.id == 'paidVia' ? 'error ' : ''}`}
                                labelId="paid-via-label"
                                placeholder='Select payment type'
                                value={rechargeState.paidVia || 'Select Payment Type'}
                                label="Pais Via"
                                onChange={(e) => onChangeInput('paidVia', e.target.value)}
                            >
                                {[{ name: 'Select Payment Type' }, ...PAYMENT_TYPES].map((type: any, i: number) => {
                                    return <MenuItem className='sub-heading' value={type.name} key={i}>{type.name}</MenuItem>
                                })}
                            </Select>
                            {error.id == 'paidVia' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>
                    <div className='element-group card'>
                        <div className='details-row blns-wrap'>
                            <div className='details-col'>
                                <div className='value'>₹ {activeTenant?.walletBlns}</div>
                                <div className='title'>Current Balance</div>
                            </div>
                            <div className='details-col'>
                                <div className='value'>{(activeTenant?.walletBlns * 100) / (activeTenant?.chargePerMessage * 100)}</div>
                                <div className='title'>Current Messages</div>
                            </div>
                            <div className='details-col'>
                                <div className='value'>₹ {Number(activeTenant?.walletBlns || 0) + Number(rechargeState?.amount || 0)}</div>
                                <div className='title'>New Balance</div>
                            </div>
                            <div className='details-col'>
                                <div className='value'>{((Number(activeTenant?.walletBlns || 0) + Number(rechargeState?.amount || 0)) * 100) / (activeTenant?.chargePerMessage * 100)}</div>
                                <div className='title'>New Messages</div>
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

export default AddGupshupRechargeModal;