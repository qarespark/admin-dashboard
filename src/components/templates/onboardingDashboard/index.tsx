import Close from 'components/svgs/Close';
import Loader from 'components/modules/loader';
import SearchIcon from 'components/svgs/SearchIcon'
import { BACKGROUND_COLORS } from 'constants/common'
import { emptyOriginalData, emptyTenantObj } from 'constants/emptyModel';
import { base64ToFile } from 'helpers/utils';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { useEffect, useRef, useState } from 'react'
import { showError, showSuccess, updateBusinessTypes } from 'redux/actions';
import { getAllBusinessTypes, uploadLogoToDB } from 'services/api/common';
import { getAllTenants } from 'services/api/tenant';
import consoleLog from 'services/console';
import StoreDetails from '../storeDetails';
import TenantDetails from '../tenantDetails';

function MdExpandMore(props) {
    return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" {...props}><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>;
}

type originalDataType = {
    tenantDetails: any,
    storeDetails: any,
    staffDetails: any,
    storeConfigurations: any,
    smsConfigurations: any,
    paymentConfigurations: any,

}

function OnboardingDashboard() {
    const [activeTenant, setActiveTenant] = useState<any>();
    const [searchQuery, setSearchQuery] = useState('')
    const [tenantsList, setTenantsList] = useState([])
    const [activeTab, setActiveTab] = useState('');
    const [originalData, setOriginalData] = useState<originalDataType>({ ...emptyOriginalData });
    const dispatch = useAppDispatch();
    const [selectedLogo, setSelectedLogo] = useState<any>();
    const logoUploaderRef = useRef<any>();
    const [isLoading, setIsLoading] = useState(false);

    const onSelectImage = (e: any) => {
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]); // read file as data url
        reader.onload = (event) => { // called once readAsDataURL is completed
            setSelectedLogo(event.target!.result);
        }
        // setSelectedLogo(URL.createObjectURL(e.target.files[0]));
    }

    const getAllBusinessType = () => {
        getAllBusinessTypes().then((bTypesRes: any) => {
            dispatch(updateBusinessTypes(bTypesRes));
        })
    }

    useEffect(() => {
        getAllTenants().then((res: any) => {
            consoleLog("getAllTenants", res)
            setTenantsList(res);
        })
        getAllBusinessType();
    }, [])

    const onClickTenant = (tenant: any) => {
        setActiveTenant(tenant);
        setOriginalData({ ...emptyOriginalData, tenantDetails: tenant })
        setActiveTab('tenant')
    }

    const onChangeTab = (tab: string) => {
        switch (tab) {
            case 'tenant':
                setActiveTab(tab);
                break;
            case 'store':
                if (!activeTenant.id) dispatch(showError('Please create tenant first'))
                else setActiveTab(tab);
                break;
            case 'logo':
                if (!activeTenant.id) dispatch(showError('Please create tenant first'))
                else setActiveTab(tab);
                break;
            default:
                break;
        }
    }


    const onClickNewClient = () => {
        setActiveTab('tenant')
        setActiveTenant(emptyTenantObj)
        setOriginalData({ ...emptyOriginalData })
    }

    const onSearchChange = (query: any) => {
        setSearchQuery(query ? query.toLowerCase() : '');
    }

    const onCancel = () => {
        setActiveTab('tenant')
        setSelectedLogo(null)
    }


    const uploadLogo = () => {
        if (selectedLogo) {
            setIsLoading(true);
            uploadLogoToDB(activeTenant.id, base64ToFile(selectedLogo), 'logo').then((imagePathRes: any) => {
                dispatch(showSuccess('Logo Uploaded successfully'))
                setSelectedLogo(null)
                const tenantsListCopy = JSON.parse(JSON.stringify(tenantsList));
                let tIndex = tenantsListCopy.findIndex((a: any) => a.id == activeTenant.id);
                if (tIndex != -1) {
                    tenantsListCopy[tIndex].logoPath = imagePathRes;
                }
                setTenantsList(tenantsListCopy);
                setOriginalData({ ...originalData, tenantDetails: { ...activeTenant, logoPath: imagePathRes } })
                setActiveTenant({ ...activeTenant, logoPath: imagePathRes })
                setIsLoading(false);
            })
        } else {
            dispatch(showError('Please select new logo image'))
        }
    }

    return (
        <div className='gupshup-dashboard-container onboarding-dashboard-container'>
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
                    {tenantsList.map((tenant: any, i: number) => {
                        return <React.Fragment key={i} >
                            {(tenant.name.toLowerCase().includes(searchQuery) || tenant.address.toLowerCase().includes(searchQuery)) && <div className='tenant-details' onClick={() => onClickTenant(tenant)} style={{ backgroundColor: tenant.tenantId == '000' ? '#04c8c80f' : BACKGROUND_COLORS[tenant.id] }}>
                                <div className='details-row'>
                                    <div className='logo-wrap name'><img src={tenant.logoPath} /></div>
                                </div>
                                <div className='details-row'>
                                    <div className='name'>{tenant.name}</div>
                                    <div className='date'>{new Date(tenant.createdOn).toDateString()}</div>
                                </div>
                                <div className='details-row'>
                                    <div className='address'>{tenant.address}, {tenant.area}</div>
                                </div>
                            </div>}
                        </React.Fragment>
                    })}
                </div>
                <div className='footer-btn-wrap'>
                    <div className='primary-btn' onClick={onClickNewClient}>Create tenant</div>
                </div>
            </div>
            <div className='right-content modal-content-wrap'>
                {activeTenant ? <div className='tenant-details-wrap'>
                    <div className="tenant-details-outer">
                        <>
                            {activeTab != 'tenant' ? <div className='tenant-details-content tenant-tab-wrap' style={{ height: activeTab != 'tenant' ? '50px' : '0' }} onClick={() => onChangeTab('tenant')}>
                                <div className='card tab-heading'> Tenant Details (Id: {activeTenant.id}, Name: {activeTenant.name}) <MdExpandMore /></div>
                            </div> :
                                <div className={`tenant-details-content ${activeTab == 'tenant' && 'active-tab'}`} style={{ height: activeTab != 'tenant' ? '0' : 'auto' }}>
                                    <TenantDetails
                                        activeTenant={activeTenant}
                                        setActiveTenant={(t) => setActiveTenant(t)}
                                        tenantsList={tenantsList}
                                        setTenantsList={(t) => setTenantsList(t)}
                                        originalData={originalData}
                                        setOriginalData={(data) => setOriginalData(data)}
                                    />
                                </div>}
                        </>

                        <>
                            {activeTab != 'store' ? <div className='tenant-details-content store-tab-wrap' style={{ height: activeTab != 'store' ? '50px' : '0' }} onClick={() => onChangeTab('store')}>
                                <div className='card tab-heading'> Stores Details <MdExpandMore /></div>
                            </div> :
                                <div className={`tenant-details-content`} style={{ height: activeTab != 'store' ? '0' : 'auto' }}>
                                    <StoreDetails
                                        originalData={originalData}
                                        setOriginalData={(data) => setOriginalData(data)}
                                        activeTenant={activeTenant} />
                                </div>}
                        </>

                        <>
                            {activeTab != 'logo' ? <div className='tenant-details-content logo-tab-wrap tab-wrap' style={{ height: activeTab != 'logo' ? '50px' : '0' }} onClick={() => onChangeTab('logo')}>
                                <div className='card tab-heading'>Logo Upload <MdExpandMore /></div>
                            </div> : <div className={`tenant-details-content ${activeTab == 'logo' && 'active-tab'}`} style={{ height: activeTab != 'logo' ? '0' : 'auto' }}>
                                <div className='tenant-details card'>
                                    <div className='sub-heading'>Logo Upload</div>
                                    <div className="element-group-wrap clearfix tenant-logo-wrap">
                                        <div className='preview card' onClick={() => logoUploaderRef.current.click()}>
                                            {activeTenant.logoPath ?
                                                <div className='current-logo d-f-c'>
                                                    <div className='sub-heading'>Current Logo</div>
                                                    <img src={activeTenant.logoPath} alt="Tenant logo" />
                                                </div> :
                                                <div>Logo not uploaded yet !</div>}
                                        </div>
                                        <div className='selected-logo-wrap card'>
                                            {selectedLogo ? <div className='selected-logo d-f-c'>
                                                <div className='sub-heading'>Selected Logo</div>
                                                <img src={selectedLogo} />
                                            </div> :
                                                <div>Image not selected yet</div>}
                                        </div>
                                    </div>
                                    <input style={{ visibility: 'hidden' }} accept='image/*' type="file" ref={logoUploaderRef} onChange={onSelectImage} />
                                </div>
                                <div className='btn-wrap footer-btn-wrap'>
                                    <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                                    <div className='btn primary-btn' onClick={uploadLogo} >Upload Logo</div>
                                </div>
                            </div>}
                        </>
                    </div>
                </div> : <div className='no-data'><span>Select tenant</span>&nbsp;to view details or<span>&nbsp;Create new tenant</span></div>}
            </div>
            {isLoading && <Loader />}
        </div>
    )
}

export default OnboardingDashboard