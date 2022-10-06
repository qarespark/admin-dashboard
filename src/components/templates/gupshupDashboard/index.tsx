import Checkbox from '@material-ui/core/Checkbox';
import AddGupshupRechargeModal from 'components/modules/addGupshupRechargeModal';
import AddStoreToGupshupModal from 'components/modules/addStoreToGupshupModal';
import Close from 'components/svgs/Close';
import SearchIcon from 'components/svgs/SearchIcon'
import { BACKGROUND_COLORS } from 'constants/common'
import React, { useEffect, useState } from 'react'
import { gupshupClients, gupshupRechargHistory } from 'services/dummyData'

function GupshupDashboard() {
    const [activeTenant, setActiveTenant] = useState<any>(gupshupClients[0]);
    const [rechargeHistory, setRechargeHistory] = useState([])
    const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
    const [showAddStoreToGupshupModal, setShowAddStoreToGupshupModal] = useState(false);
    const [searchQuery, setSearchQuery] = useState('')
    useEffect(() => {
        if (gupshupRechargHistory?.length != 0 && (rechargeHistory.length != 0 ? !(rechargeHistory[0].tenantId == activeTenant?.tenantId && rechargeHistory[0].storeId == activeTenant?.storeId) : true)) {
            console.log(gupshupRechargHistory)
            setRechargeHistory(gupshupRechargHistory.filter((r: any) => r.tenantId == activeTenant?.tenantId && r.storeId == activeTenant?.storeId))
        }
    }, [gupshupRechargHistory, activeTenant])

    const onChangeValue = (from: any) => {
        const activeTenantCopy = { ...activeTenant };
        switch (from) {
            case 'transactionalMsg-selfWallet':
                activeTenantCopy.transactionalMsg.selfWallet = !activeTenantCopy.transactionalMsg.selfWallet;
                break;
            case 'transactionalMsg-active':
                activeTenantCopy.transactionalMsg.active = !activeTenantCopy.transactionalMsg.active;
                break;
            case 'promotionalMsg-selfWallet':
                activeTenantCopy.promotionalMsg.selfWallet = !activeTenantCopy.promotionalMsg.selfWallet;
                break;
            case 'promotionalMsg-active':
                activeTenantCopy.promotionalMsg.active = !activeTenantCopy.promotionalMsg.active;
                break;
            default:
                break;
        }
        setActiveTenant({ ...activeTenantCopy });
    }

    const handleRechargeModalResponse = (rechargeData: any) => {
        if (rechargeData) {
            let totalMsgPerResparkRate = (rechargeData.amount * 100) / (activeTenant?.chargePerMessage * 100);
            let totaRsPerGupshupRate = totalMsgPerResparkRate * 0.66;
            let resparkCredit = Number((rechargeData.amount - totaRsPerGupshupRate).toFixed(1));
            const apiBody = {
                tenantId: activeTenant?.tenantId,
                storeId: activeTenant?.storeId,
                amount: rechargeData.amount,//newly added amount in rs
                prevBlns: activeTenant?.walletBlns,//balns at the time of recharge
                staffId: 1,
                createdOn: new Date(),
                paidVia: rechargeData.paidVia,//
                resparkCredit: resparkCredit,//amount credited to respark account as per 0.66 rs per msg charges
            }
            //update local recharge history
            setRechargeHistory([...rechargeHistory, apiBody])
            //update local balance
            setActiveTenant({ ...activeTenant, walletBlns: Number(activeTenant?.walletBlns) + Number(rechargeData.amount) });
        }
        setShowAddBalanceModal(false)
    }

    const handleAddGupshupStoreModalResponse = (modalData: any) => {
        setShowAddStoreToGupshupModal(false)
    }

    const onCancel = () => {
        setActiveTenant(null);
    }

    const onSave = () => {
        console.log(activeTenant)
    }

    const onSearchChange = (query: any) => {
        setSearchQuery(query ? query.toLowerCase() : '');
    }

    return (
        <div className='gupshup-dashboard-container'>
            <div className='left-content'>
                <div className='search-wrap'>
                    {!searchQuery ? <div className='search-icon'>
                        {SearchIcon()}
                    </div> :
                        <div className='search-icon' onClick={() => onSearchChange(null)}>
                            {Close()}
                        </div>}
                    <input placeholder='Search by tenent name' value={searchQuery || ''} onChange={(e) => onSearchChange(e.target.value)} />
                </div>
                <div className='tenant-list-wrap'>
                    {gupshupClients.map((tenant: any, i: number) => {
                        return <React.Fragment key={i} >
                            {(tenant.tenantName.toLowerCase().includes(searchQuery) || tenant.storeName.toLowerCase().includes(searchQuery)) && <div className='tenant-details' onClick={() => setActiveTenant(tenant)} style={{ backgroundColor: tenant.tenantId == '000' ? '#04c8c80f' : BACKGROUND_COLORS[tenant.tenantId] }}>
                                <div className='details-row'>
                                    <div className='logo-wrap name'><img src={tenant.logo} /></div>
                                    <div className='avl-blns date'>₹ {tenant.walletBlns}</div>
                                </div>
                                <div className='details-row'>
                                    <div className='name'>{tenant.tenantName} - {tenant.storeName}</div>
                                    <div className='date'>{new Date(tenant.createdOn).toDateString()}</div>
                                </div>
                            </div>}
                        </React.Fragment>
                    })}
                </div>
                <div className='footer-btn-wrap'>
                    <div className='primary-btn' onClick={() => setShowAddStoreToGupshupModal(true)}>Add Store</div>
                </div>
            </div>
            <div className='right-content'>
                {activeTenant ? <div className='tenant-details-wrap'>
                    <div className='details-row logo-name-wrap'>
                        <div className='logo-wrap name'><img src={activeTenant?.logo} /></div>
                        <div className='heading tenant-name'>{activeTenant?.tenantName} - <div className='sub-heading'>{activeTenant?.storeName}</div></div>
                        <div className='date'>Registered on: {new Date(activeTenant?.createdOn).toDateString()}</div>
                    </div>

                    <div className='tenant-details-outer'>
                        <div className='tenant-details card'>
                            <div className='details-row blns-wrap'>
                                <div className='details-col'>
                                    <div className='value'>₹ {activeTenant?.walletBlns}</div>
                                    <div className='title'>Available Balance</div>
                                </div>
                                <div className='details-col'>
                                    <div className='value'>{(activeTenant?.walletBlns * 100) / (activeTenant?.chargePerMessage * 100)}</div>
                                    <div className='title'>Available Messages</div>
                                </div>
                                <div className='details-col'>
                                    <div className='value'>{activeTenant?.chargePerMessage}</div>
                                    <div className='title'>Charges Per Messages</div>
                                </div>
                                <div className='details-col'>
                                    <div className='value'>{activeTenant?.appName}</div>
                                    <div className='title'>App Name</div>
                                </div>
                                <div className='details-col'>
                                    <div className='value'>{activeTenant?.appNumber}</div>
                                    <div className='title'>App Number</div>
                                </div>
                            </div>
                        </div>

                        <div className='card config-input-wrap'>
                            <div className='sub-heading checkbox-input-heading'>Transactional Messages</div>
                            <div className="checkbox-input-wrapper">
                                <div className="checkbox-input-wrap ckeckbox-wrap">
                                    <Checkbox
                                        checked={activeTenant?.transactionalMsg?.active || false}
                                        onClick={() => onChangeValue('transactionalMsg-active')}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <div className="label" onClick={() => onChangeValue('transactionalMsg-active')}>Enable Transactional SMS</div>
                                </div>
                                <div className={`checkbox-input-wrap ckeckbox-wrap ${activeTenant?.transactionalMsg?.active ? '' : 'disabled'}`}>
                                    <Checkbox
                                        checked={activeTenant?.transactionalMsg?.selfWallet || false}
                                        onClick={() => onChangeValue('transactionalMsg-selfWallet')}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <div className="label" onClick={() => onChangeValue('transactionalMsg-selfWallet')}>Use Store Account</div>
                                </div>
                            </div>
                        </div>

                        <div className='card config-input-wrap'>
                            <div className='sub-heading checkbox-input-heading'>Promotional Messages</div>
                            <div className="checkbox-input-wrapper">
                                <div className="checkbox-input-wrap ckeckbox-wrap">
                                    <Checkbox
                                        checked={activeTenant?.promotionalMsg?.active || false}
                                        onClick={() => onChangeValue('promotionalMsg-active')}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <div className="label" onClick={() => onChangeValue('promotionalMsg-active')}>Enable Promotional SMS</div>
                                </div>
                                <div className={`checkbox-input-wrap ckeckbox-wrap ${activeTenant?.promotionalMsg?.active ? '' : 'disabled'}`}>
                                    <Checkbox
                                        checked={activeTenant?.promotionalMsg?.selfWallet || false}
                                        onClick={() => onChangeValue('promotionalMsg-selfWallet')}
                                        inputProps={{ 'aria-label': 'controlled' }}
                                    />
                                    <div className="label" onClick={() => onChangeValue('promotionalMsg-selfWallet')}>Use Store Account</div>
                                </div>
                            </div>
                        </div>

                        {rechargeHistory.length != 0 && <div className='history-wrap'>
                            <div className='heading'>Recharge History</div>
                            <div className='history-content card'>
                                <div className='details-row'>
                                    <div className='details-col'>No.</div>
                                    <div className='details-col'>Added Balance </div>
                                    <div className='details-col'>Added Messages</div>
                                    <div className='details-col'>Paid Via </div>
                                    <div className='details-col'>Respark Credit</div>
                                    <div className='details-col'>Date</div>
                                </div>
                                <div className='history-list'>
                                    {rechargeHistory.map((rechargDetails: any, i: number) => {
                                        return <div className='details-row' key={i}>
                                            <div className='details-col'>{i + 1}</div>
                                            <div className='details-col'>₹ {rechargDetails?.amount}</div>
                                            <div className='details-col'>{(rechargDetails?.amount * 100) / (activeTenant?.chargePerMessage * 100)}</div>
                                            <div className='details-col'>{rechargDetails?.paidVia}</div>
                                            <div className='details-col'>₹ {rechargDetails?.resparkCredit}</div>
                                            <div className='details-col'>{new Date(rechargDetails?.createdOn).toLocaleDateString()}</div>
                                        </div>
                                    })}
                                    <div className='details-row total-row'>
                                        <div className='details-col'>Total</div>
                                        <div className='details-col'>₹ {rechargeHistory.reduce((a: any, b: any) => Number(a) + Number(b.amount), 0)}</div>
                                        <div className='details-col'>{rechargeHistory.reduce((a: any, b: any) => Number(a) + Number((b?.amount * 100) / (activeTenant?.chargePerMessage * 100)), 0)}</div>
                                        <div className='details-col'>-</div>
                                        <div className='details-col'>₹ {rechargeHistory.reduce((a: any, b: any) => Number((Number(a) + Number(b.resparkCredit)).toFixed(1)), 0)}</div>
                                        <div className='details-col'>-</div>
                                    </div>
                                </div>
                            </div>
                        </div>}
                    </div>

                    <div className='btn-wrap footer-btn-wrap'>
                        <div className='btn primary-btn border-btn' onClick={onCancel}>Cancel</div>
                        <div className='btn primary-btn ' onClick={() => setShowAddBalanceModal(true)}>Add Balance +</div>
                        <div className='btn primary-btn ' onClick={onSave}>Save</div>
                    </div>
                </div> : <div className='no-data'>Select store to view whatsapp integration details</div>}
                <AddGupshupRechargeModal
                    open={showAddBalanceModal}
                    activeTenant={activeTenant}
                    handleClose={(rechargeData: any) => handleRechargeModalResponse(rechargeData)}
                />
            </div>
            <AddStoreToGupshupModal
                resparkDetails={gupshupClients.filter((c: any) => c.tenantId == '000')}
                open={showAddStoreToGupshupModal}
                handleClose={(rechargeData: any) => handleAddGupshupStoreModalResponse(rechargeData)}
            />
        </div>
    )
}

export default GupshupDashboard