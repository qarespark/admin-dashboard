import { Checkbox, MenuItem, Select } from '@material-ui/core';
import Loader from 'components/modules/loader';
import { emptyStoreObj, emptyLicenseObj, emptyStaffObj, emptyRoleObj, emptySMSconfigObj, emptyPaymentConfigObj, emptySToreCatalogObj, emptyConfigObj } from 'constants/emptyModel';
import { deepMergeInnerDedupeArrays, getDateStrings, mergeArrayWithoutDuplicates } from 'helpers/utils';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useRef, useState } from 'react'
import { showError, showSuccess } from 'redux/actions';
import { getBusinessTypes } from 'redux/selectors';
import { createUpdatePaymentVendorConfig, createUpdateSMSConfig, getPaymentConfigByTenantAndStore, getSMSConfigByTenantId } from 'services/api/common';
import { createUpdateRole, createUpdateStaff, createUpdateStaffRoleMapping, getStaffbyTenantIdStoreId } from 'services/api/staff';
import { createUpdateStore, createUpdateStoreCatalog, createUpdateStoreLicense, getStoreLicenbyTenantIdStoreId, getStoresByTenantId, getStoresConfigbyTenantIdStoreId } from 'services/api/store';
import consoleLog from 'services/console';
import GenericImages from '../genericImages';
import ManifestConfig from '../manifestConfig';
// import { storesList } from 'services/dummyData';
import StoreConfigurations from '../storeConfigurations';


function MdExpandMore(props) {
    return <svg stroke="currentColor" fill="currentColor" strokeWidth={0} viewBox="0 0 24 24" height="1em" width="1em" {...props}><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" /></svg>;
}

function StoreDetails({ activeTenant, originalData, setOriginalData }) {
    const dispatch = useAppDispatch();
    const [error, setError] = useState<any>('');
    const [activeStore, setActiveStore] = useState<any>('')
    const [selectedStore, setSelectedStore] = useState('');
    // const [activeLicense, setActiveLicense] = useState<any>(emptyLicenseObj);
    const [activeAdminStaff, setActiveAdminStaff] = useState<any>();
    const [activeSMSConfig, setactiveSMSConfig] = useState<any>()
    const [activePaymentVendorConfig, setActivePaymentVendorConfig] = useState<any>()
    const [activeConfigurations, setActiveConfigurations] = useState<any>();
    const [activeTab, setActiveTab] = useState('store');
    const [storesList, setStoresList] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const storeConfigRef: any = useRef();
    const genericImagesRef: any = useRef();
    const manifestConfigRef: any = useRef();
    const businessTypes = useAppSelector(getBusinessTypes) || [];

    useEffect(() => {
        getStoresByTenantId(activeTenant.id).then((storesListRes: any) => {
            setStoresList(storesListRes);
            storesListRes.length! + 0 && onChangeStore(storesListRes[0])
            consoleLog('storesListRes =', storesListRes)
        })
    }, [])

    const onChangeStore = (store: any) => {
        let storycpy = JSON.parse(JSON.stringify(store))
        setError({})
        setSelectedStore(store)
        setActiveStore({ ...storycpy })
        setActiveAdminStaff(null)
        setactiveSMSConfig(null)
        setActivePaymentVendorConfig(null)
        setActiveConfigurations(null)
        onChangeTab('store', { ...storycpy })
    }

    const onClickCreateStore = () => {
        setActiveStore(emptyStoreObj)
        setSelectedStore('')
    }

    const onChangeInput = (from: any, value: any, configType: string = 'store') => {
        setError({})
        if (activeTab == 'store') {
            const activeStoreCopy = { ...activeStore };
            if (from == 'phone1' && value && value.toString().length >= 11) return;
            if (from == 'phone' && value && value.toString().length >= 11) return;
            // if (from == 'name') if (activeTenant.subDomain) activeStoreCopy.sUrl = `${activeTenant.subDomain}/${activeTenant.name}-${activeTenant.id}/value`
            activeStoreCopy[from] = value;
            setActiveStore(activeStoreCopy)
        } else if (activeTab == 'staff') {
            const activeAdminStaffCopy = { ...activeAdminStaff };
            if (from == 'phone' && value && value.toString().length >= 11) return;
            activeAdminStaffCopy[from] = value;
            setActiveAdminStaff(activeAdminStaffCopy)
        } else if (activeTab == 'SMS') {
            const activeSMSConfigCopy = { ...activeSMSConfig };
            activeSMSConfigCopy[from] = value;
            setactiveSMSConfig(activeSMSConfigCopy)
        } else if (activeTab == 'payment') {
            const activePaymentVendorConfigCopy = { ...activePaymentVendorConfig };
            activePaymentVendorConfigCopy[from] = value;
            setActivePaymentVendorConfig(activePaymentVendorConfigCopy)
        }
    }

    const validateStoreConfig = () => {
        let err = { id: '', text: '' };
        if (!activeStore.name) err = { id: 'store-name', text: 'Please enter store name' }
        else if (!activeStore.validTill) err = { id: 'store-validTill', text: 'Please select store validity date' }
        else if (!activeStore.email) err = { id: 'store-email', text: 'Please enter email' }
        else if (!activeStore.phone1) err = { id: 'store-phone1', text: 'Please enter primary phone number' }
        else if (!activeStore.address) err = { id: 'store-address', text: 'Please enter address' }
        else if (!activeStore.area) err = { id: 'store-area', text: 'Please enter area' }
        else if (!activeStore.city) err = { id: 'store-city', text: 'Please enter city' }
        else if (!activeStore.state) err = { id: 'store-state', text: 'Please enter state' }
        else if (!activeStore.country) err = { id: 'store-country', text: 'Please enter country' }
        else if (!activeStore.pincode) err = { id: 'store-pincode', text: 'Please enter pincode' }
        else if (!activeStore.latitude) err = { id: 'store-latitude', text: 'Please enter latitude' }
        else if (!activeStore.longitude) err = { id: 'store-longitude', text: 'Please enter longitude' }
        else if (!activeStore.googleMapUrl) err = { id: 'store-googleMapUrl', text: 'Please enter googleMapUrl' }
        return err;
    }

    const validateStaffDetails = () => {
        let err = { id: '', text: '' };
        if (!activeAdminStaff.firstName) err = { id: 'staff-firstName', text: 'Please enter staff first name' }
        else if (!activeAdminStaff.lastName) err = { id: 'staff-lastName', text: 'Please enter staff last name' }
        else if (!activeAdminStaff.username) err = { id: 'staff-username', text: 'Please enter staff username' }
        else if (!activeAdminStaff.pwd) err = { id: 'staff-password', text: 'Please enter staff password' }
        else if (!activeAdminStaff.email) err = { id: 'staff-email', text: 'Please enter staff email' }
        else if (!activeAdminStaff.phone) err = { id: 'staff-username', text: 'Please enter staff username' }
        return err;
    }

    const validateSMSDetails = () => {
        let err = { id: '', text: '' };
        if (!activeSMSConfig.url) err = { id: 'SMS-url', text: 'Please enter sms url' }
        else if (!activeSMSConfig.user) err = { id: 'SMS-user', text: 'Please enter sms user' }
        else if (!activeSMSConfig.pwd) err = { id: 'SMS-pwd', text: 'Please enter sms pwd' }
        else if (!activeSMSConfig.apiKey) err = { id: 'SMS-apiKey', text: 'Please enter sms apiKey' }
        else if (!activeSMSConfig.senderId) err = { id: 'SMS-senderId', text: 'Please enter sms senderId' }
        else if (!activeSMSConfig.params) err = { id: 'SMS-params', text: 'Please enter sms params' }
        return err;
    }

    const validatePaymentVendorDetails = () => {
        let err = { id: '', text: '' };
        if (!activePaymentVendorConfig.name) err = { id: 'staff-url', text: 'Please enter payment vendor name' }
        else if (!activePaymentVendorConfig.key) err = { id: 'staff-user', text: 'Please enter payment vendor key' }
        else if (!activePaymentVendorConfig.secrete) err = { id: 'staff-pwd', text: 'Please enter payment vendor secrete' }
        else if (!activePaymentVendorConfig.redirectUrl) err = { id: 'staff-apiKey', text: 'Please enter payment vendor redirectUrl' }
        else if (!activePaymentVendorConfig.redirect2Website) err = { id: 'staff-senderId', text: 'Please enter payment vendor redirect2Website' }
        else if (!activePaymentVendorConfig.statusUrl) err = { id: 'staff-params', text: 'Please enter payment vendor statusUrl' }
        return err;
    }

    const saveStoreDetails = () => {
        let err = validateStoreConfig();
        if (err.id) {
            consoleLog('form err', err)
            dispatch(showError(err.text))
            setError(err);
        } else {
            consoleLog('Validated store form', activeStore)
            activeStore.tenantId = activeTenant.id;
            setIsLoading(true);
            //create store in mysql
            const apiBody = { ...activeStore }
            apiBody.validTill = new Date(apiBody.validTill);
            apiBody.active = activeStore.active ? 1 : 0;
            createUpdateStore(apiBody).then((storeRes: any) => {
                const storeListCopy = JSON.parse(JSON.stringify(storesList));
                let sIndex = storeListCopy.findIndex((a: any) => a.id == activeStore.id);
                if (sIndex != -1) {
                    storeListCopy[sIndex] = storeRes;
                    dispatch(showSuccess('Store updated succefully!'));
                } else {
                    storeListCopy.push(storeRes);
                    saveStoreToMongo(storeRes);
                    setSelectedStore(storeRes)
                    dispatch(showSuccess('Store created succefully!'));
                }
                saveLicenseDetails(storeRes);
                setOriginalData({ ...originalData, storeDetails: storeRes })
                setStoresList(storeListCopy)
                setActiveStore(storeRes);
            })
        }
    }

    const saveStoreToMongo = (updatedStore: any) => {
        const mongoSToreObj: any = emptySToreCatalogObj;
        mongoSToreObj.storeId = updatedStore.id;
        mongoSToreObj.store = activeStore.name;
        mongoSToreObj.tenant = activeTenant.name;
        mongoSToreObj.tenantId = activeTenant.id;
        //create store in mongo db
        createUpdateStoreCatalog(mongoSToreObj).then((storeRes) => {
            setIsLoading(false);
            consoleLog('Mongo db store created', storeRes)
        })
    }

    const saveLicenseDetails = (updatedStore: any) => {
        getStoreLicenbyTenantIdStoreId(updatedStore.tenantId, updatedStore.id).then((res: any) => {
            let licObj = emptyLicenseObj;
            licObj.tenantId = updatedStore.tenantId;
            licObj.storeId = updatedStore.id;
            if (res && res.length != 0) {
                licObj = res[0];
            }
            licObj.validTill = updatedStore.validTill;
            createUpdateStoreLicense(licObj).then((licRes) => {
            })
        })
    }

    const saveStaffDetails = () => {
        let err = validateStaffDetails();
        if (err.id) {
            consoleLog('form err', err)
            dispatch(showError(err.text))
            setError(err);
            //validation error present
        } else {

            consoleLog('active staff', activeAdminStaff)
            setIsLoading(true)
            if (activeAdminStaff.id) {
                createUpdateStaff(activeAdminStaff).then((stafRes) => {
                    setActiveAdminStaff(stafRes);
                    setIsLoading(false);
                    setOriginalData({ ...originalData, staffDetails: stafRes })
                    dispatch(showSuccess('Staff updated Successfuly'))
                })
            } else {
                //1. create superadmin role
                //2. create staff with input data
                //3. create staff role mapping
                const superadminRoleObj = emptyRoleObj;
                superadminRoleObj.tenantId = activeTenant.id;
                createUpdateRole(superadminRoleObj).then((roleRes: any) => {
                    const staffObj = { ...activeAdminStaff }
                    staffObj.tenantId = activeTenant.id;
                    staffObj.active = staffObj.active ? 1 : 0;
                    createUpdateStaff(staffObj).then((stafRes: any) => {
                        const mappingObj = [{
                            "storeId": activeStore.id,
                            "tenantId": activeTenant.id,
                            "roleId": roleRes.id,
                            "staffId": stafRes.id,
                            "active": 1
                        }]
                        createUpdateStaffRoleMapping(mappingObj).then((roleMappingRes) => {
                            setActiveAdminStaff(stafRes);
                            setIsLoading(false);
                            setOriginalData({ ...originalData, staffDetails: stafRes })
                            dispatch(showSuccess('Staff created Successfuly'))
                        })
                    })
                })
            }
        }
    }

    const saveSMSDetails = () => {
        let err = validateSMSDetails();
        if (err.id) {
            consoleLog('form err', err)
            dispatch(showError(err.text))
            setError(err);
            //validation error present
        } else {
            //submit store details
            consoleLog('Validated sms form', activeSMSConfig)
            activeSMSConfig.tenantId = activeTenant.id;
            setIsLoading(true);
            createUpdateSMSConfig(activeSMSConfig).then((smsConfRes: any) => {
                if (activeSMSConfig.id) {
                    dispatch(showSuccess('SMS config updated succefully!'));
                } else {
                    dispatch(showSuccess('SMS config created succefully!'));
                }
                setOriginalData({ ...originalData, smsConfigurations: smsConfRes })
                setactiveSMSConfig(smsConfRes)
                setIsLoading(false);
            })
        }
    }

    const savePaymentDetails = () => {
        let err = validatePaymentVendorDetails();
        if (err.id) {
            consoleLog('form err', err)
            dispatch(showError(err.text))
            setError(err);
            //validation error present
        } else {
            //submit store details
            consoleLog('Validated payment form', activePaymentVendorConfig)
            activePaymentVendorConfig.tenantId = activeTenant.id;
            activePaymentVendorConfig.storeId = activeStore.id;
            setIsLoading(true);
            createUpdatePaymentVendorConfig(activePaymentVendorConfig).then((pVCRes: any) => {
                if (activePaymentVendorConfig.id) {
                    dispatch(showSuccess('Payment vendor config updated succefully!'));
                } else {
                    dispatch(showSuccess('Payment vendor config created succefully!'));
                }
                setOriginalData({ ...originalData, paymentConfigurations: pVCRes })
                setActivePaymentVendorConfig(pVCRes)
                setIsLoading(false);
            })
        }
    }

    const onSave = () => {
        switch (activeTab) {
            case 'store':
                saveStoreDetails();
                break;
            case 'staff':
                saveStaffDetails();
                break;
            case 'SMS':
                saveSMSDetails();
                break;
            case 'config':
                storeConfigRef.current.saveStoreConfigs();
                break;
            case 'genericImages':
                genericImagesRef.current.saveGenericImages();
                break;
            case 'manifestConfig':
                manifestConfigRef.current.saveManifestConfig();
                break;
            case 'payment':
                savePaymentDetails();
                break;
            default:
                break;
        }
    }

    const onCancel = () => {
        if (activeTab == 'store') {
            setActiveStore('')
            setSelectedStore('')
        } else if (activeTab == 'staff') {
            setActiveTab('store')
        } else if (activeTab == 'config') {
            setActiveTab('staff')
        } else if (activeTab == 'genericImages') {
            setActiveTab('config')
        } else if (activeTab == 'manifestConfig') {
            setActiveTab('genericImages')
        } else if (activeTab == 'SMS') {
            setActiveTab('manifestConfig')
        } else if (activeTab == 'payment') {
            setActiveTab('SMS')
        }
    }

    const onChangeTab = (tab: string, storeData: any = null) => {
        let storeDetails = storeData || activeStore;
        if (tab == 'store') setActiveTab('store');
        else {
            if (!storeDetails.id) dispatch(showError('Please create store first'))
            else {
                if (tab == 'staff') {
                    setIsLoading(true)
                    getStaffbyTenantIdStoreId(activeTenant.id, storeDetails.id).then((staffRes: any) => {
                        if (staffRes) setActiveAdminStaff(staffRes[0])
                        else setActiveAdminStaff(emptyStaffObj);
                        setIsLoading(false)
                        setActiveTab(tab);
                    })
                } else if (tab == 'genericImages' || tab == 'config' || tab == "manifestConfig") {
                    if (!activeConfigurations) {
                        setIsLoading(true)
                        getStoresConfigbyTenantIdStoreId(activeTenant.id, activeStore.id).then((configRes: any) => {
                            let config: any = configRes || emptyConfigObj;
                            //  set groups list
                            let activeBusinessType = businessTypes.filter((b: any) => b.id == activeTenant.businessTypeId);
                            let groups: any = activeBusinessType[0].groups;
                            groups = groups.split(',');
                            if (!configRes) {
                                config.storeConfig.sparkConfig.color = {}
                                let defaultColours = ['#dcb533', '#4088f4']
                                groups.map((g: any, i) => {
                                    config.storeConfig.sparkConfig.color[g] = defaultColours[i];
                                })
                            }
                            //social links
                            if (!config.socialLinks) config.socialLinks = []
                            // config.socialLinks = mergeArrayWithoutDuplicates(emptyConfigObj.socialLinks, config.socialLinks);
                            config = deepMergeInnerDedupeArrays(config, emptyConfigObj);
                            console.log(config)
                            setActiveConfigurations(config);
                            setActiveTab(tab);
                            setIsLoading(false)
                        })
                    } else {
                        setActiveTab(tab);
                    }
                } else if (tab == 'SMS') {
                    setIsLoading(true)
                    if (!storeData) {
                        getSMSConfigByTenantId(activeTenant.id).then((smsConfigRes: any) => {
                            if (smsConfigRes) setactiveSMSConfig(smsConfigRes);
                            else setactiveSMSConfig(emptySMSconfigObj)
                            setIsLoading(false)
                            setActiveTab(tab);
                        })
                    }
                } else if (tab == 'payment') {
                    setIsLoading(true)
                    getPaymentConfigByTenantAndStore(activeTenant.id, storeDetails.id).then((paymentConfigRes: any) => {
                        if (paymentConfigRes) setActivePaymentVendorConfig(paymentConfigRes)
                        else setActivePaymentVendorConfig(emptyPaymentConfigObj)
                        setIsLoading(false)
                        setActiveTab(tab);
                    })
                } else {
                    setActiveTab(tab);//in case of store config & logo
                }
            }
        }
    }

    return (
        <div className='store-details-wrap'>
            <div className='store-selection-wrap card'>
                {storesList.length != 0 && <>
                    <div className='label'>Select Store:</div>
                    <div className="input-wrap">
                        <Select
                            className={`input ${error.id == 'store' ? 'error ' : ''}`}
                            labelId="paid-via-label"
                            placeholder='Select Store'
                            value={selectedStore || ''}
                            label="Active store"
                            onChange={(e) => onChangeStore(e.target.value)}
                        >
                            {storesList.map((store: any, i: number) => {
                                return <MenuItem className='sub-heading' value={store} key={i}>{store.name} (Id: {store.id})</MenuItem>
                            })}
                        </Select>
                    </div>
                </>}
                <div className='create-store-btn-wrap btn-wrap'>
                    <div className='btn primary-btn ' onClick={onClickCreateStore}>Create new store</div>
                </div>
            </div>
            {/* store */}
            <>
                {activeTab != 'store' ? <div className='store-details-content store-tab-wrap tab-wrap' style={{ height: activeTab != 'store' ? '50px' : '0' }} onClick={() => onChangeTab('store')}>
                    <div className='card tab-heading'> Store Details <MdExpandMore /></div>
                </div> : <>
                    {activeStore ? <div className="store-details-content active-tab">
                        <div className='tenant-details card'>
                            <div className='sub-heading'>Store basic details</div>
                            <div className="element-group-wrap clearfix">
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Name<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-name' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.name || ''}
                                            onChange={(e) => onChangeInput('name', e.target.value)}
                                            placeholder="Enter store name*"
                                        />
                                        {error.id == 'store-name' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Store active till date<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-validTill' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            min={getDateStrings().ymd}
                                            type="date"
                                            value={activeStore.validTill || ''}
                                            onChange={(e) => onChangeInput('validTill', e.target.value)}
                                            placeholder="Select store validity*"
                                        />
                                        {error.id == 'store-validTill' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={(activeStore.active == 1 ? true : false) || false}
                                                onClick={() => onChangeInput('active', !activeStore.active)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label" onClick={() => onChangeInput('active', !activeStore.active)}>Active</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="element-group-wrap clearfix">
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>About Store</div>
                                        <input className={`${error.id == 'store-aboutUs' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.aboutUs || ''}
                                            onChange={(e) => onChangeInput('aboutUs', e.target.value)}
                                            placeholder="About store"
                                        />
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Store URL</div>
                                        <input className={`${error.id == 'store-subDomain' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.sUrl || ''}
                                            onChange={(e) => onChangeInput('sUrl', e.target.value)}
                                            placeholder="tenant.respark.in/tenant-1/store"
                                        />
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>GST number</div>
                                        <input className={`${error.id == 'store-gstn' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.gstn || ''}
                                            onChange={(e) => onChangeInput('gstn', e.target.value)}
                                            placeholder="Store GSTN"
                                        />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className='tenant-details card'>
                            <div className='sub-heading'>Store contact details</div>
                            <div className="element-group-wrap clearfix">
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Email<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-email' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.email || ''}
                                            onChange={(e) => onChangeInput('email', e.target.value)}
                                            placeholder="Store email*"
                                        />
                                        {error.id == 'store-email' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Primary phone number<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-phone1' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="number"
                                            value={activeStore.phone1 || ''}
                                            onChange={(e) => onChangeInput('phone1', e.target.value)}
                                            placeholder="Enter phone number"
                                        />
                                        {error.id == 'store-phone1' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Secondary phone number</div>
                                        <input className={`${error.id == 'store-phone' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="number"
                                            value={activeStore.phone || ''}
                                            onChange={(e) => onChangeInput('phone', e.target.value)}
                                            placeholder="Enter phone number"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='tenant-details card'>
                            <div className='sub-heading'>Store address details</div>
                            <div className="element-group-wrap clearfix">
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Address<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-address' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.address || ''}
                                            onChange={(e) => onChangeInput('address', e.target.value)}
                                            placeholder="Store address*"
                                        />
                                        {error.id == 'store-address' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Area<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-area' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.area || ''}
                                            onChange={(e) => onChangeInput('area', e.target.value)}
                                            placeholder="Store area*"
                                        />
                                        {error.id == 'store-area' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>City<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-city' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.city || ''}
                                            onChange={(e) => onChangeInput('city', e.target.value)}
                                            placeholder="Store city*"
                                        />
                                        {error.id == 'store-city' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>State<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-state' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.state || ''}
                                            onChange={(e) => onChangeInput('state', e.target.value)}
                                            placeholder="Store state*"
                                        />
                                        {error.id == 'store-state' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Country<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-country' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.country || ''}
                                            onChange={(e) => onChangeInput('country', e.target.value)}
                                            placeholder="Store country*"
                                        />
                                        {error.id == 'store-country' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Pincode<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-pincode' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.pincode || ''}
                                            onChange={(e) => onChangeInput('pincode', e.target.value)}
                                            placeholder="Store pincode*"
                                        />
                                        {error.id == 'store-pincode' && <div className="error error-text">{error.text}</div>}

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='tenant-details card'>
                            <div className='sub-heading'>Store location details</div>
                            <div className="element-group-wrap clearfix">
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Latitude<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-latitude' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="number"
                                            value={activeStore.latitude || ''}
                                            onChange={(e) => onChangeInput('latitude', e.target.value)}
                                            placeholder="Store latitude*"
                                        />
                                        {error.id == 'store-latitude' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Longitude<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-longitude' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="number"
                                            value={activeStore.longitude || ''}
                                            onChange={(e) => onChangeInput('longitude', e.target.value)}
                                            placeholder="Store longitude*"
                                        />
                                        {error.id == 'store-longitude' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>

                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Google Map URL<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-googleMapUrl' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="text"
                                            value={activeStore.googleMapUrl || ''}
                                            onChange={(e) => onChangeInput('googleMapUrl', e.target.value)}
                                            placeholder="Store googleMapUrl*"
                                        />
                                        {error.id == 'store-googleMapUrl' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='btn-wrap footer-btn-wrap'>
                            <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                            <div className='btn primary-btn' onClick={onSave} >{activeStore.id ? <>Update store details</> : <>Create store</>}</div>
                        </div>
                    </div> : <div className='no-data'><span>Select store</span>&nbsp;to view details or<span>&nbsp;Create new store</span></div>}
                </>}
            </>

            {activeStore &&
                <>
                    {/* license */}
                    <>
                        {/* 
                    {activeTab != 'license' ? <div className='store-details-content license-tab-wrap tab-wrap' style={{ height: activeTab != 'license' ? '50px' : '0' }} onClick={() => onChangeTab('license')}>
                        <div className='card tab-heading'>Store License Details <MdExpandMore /></div>
                    </div> : <div className={`store-detail"content license-content active-tab" >
                        <div className='tenant-details card'>
                            <div className='sub-heading'>Store license details</div>
                            <div className="element-group-wrap clearfix">
                                <div className='element-group card'>
                                    <div className="input-wrap">
                                        <div className='label'>Store active till date<span className='mandatory'>*</span></div>
                                        <input className={`${error.id == 'store-validTill' ? 'error ' : ''}`}
                                            autoComplete="off"
                                            type="date"
                                            value={activeLicense.validTill || ''}
                                            onChange={(e) => onChangeInput('validTill', e.target.value)}
                                            placeholder="Select store validity*"
                                        />
                                        {error.id == 'store-validTill' && <div className="error error-text">{error.text}</div>}
                                    </div>
                                </div>
                                <div className='element-group config-input-wrap '>
                                    <div className='sub-heading checkbox-input-heading'>Apply this validity date to all stores</div>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={(activeLicense.active == 1 ? true : false) || false}
                                                onClick={() => onChangeInput('allStores', !activeStore.allStore)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label" onClick={() => onChangeInput('allStores', !activeStore.allStore)}>Apply</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='btn-wrap footer-btn-wrap'>
                            <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                            <div className='btn primary-btn' onClick={onSave} >Save license details</div>
                        </div>
                    </div>}
                */}
                    </>
                    {/* staff */}
                    <>
                        {activeTab != 'staff' ? <div className='store-details-content staff-tab-wrap tab-wrap' style={{ height: activeTab != 'staff' ? '50px' : '0' }} onClick={() => onChangeTab('staff')}>
                            <div className='card tab-heading'>Admin Staff Details <MdExpandMore /></div>
                        </div> : <div className="store-details-content active-tab">
                            <div className='tenant-details card'>
                                <div className='sub-heading'>Staff basic details</div>
                                <div className="element-group-wrap clearfix">
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>First Name<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'staff-firstName' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeAdminStaff?.firstName || ''}
                                                onChange={(e) => onChangeInput('firstName', e.target.value)}
                                                placeholder="Enter staff first name*"
                                            />
                                            {error.id == 'staff-firstName' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>

                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Last Name<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'staff-lastName' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeAdminStaff.lastName || ''}
                                                onChange={(e) => onChangeInput('lastName', e.target.value)}
                                                placeholder="Enter staff last name*"
                                            />
                                            {error.id == 'staff-lastName' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>

                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Username<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'staff-username' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeAdminStaff.username || ''}
                                                onChange={(e) => onChangeInput('username', e.target.value)}
                                                placeholder="Enter staff username*"
                                            />
                                            {error.id == 'staff-username' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="element-group-wrap clearfix">
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Password<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'staff-pwd' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeAdminStaff.pwd || ''}
                                                onChange={(e) => onChangeInput('pwd', e.target.value)}
                                                placeholder="Enter password "
                                            />
                                            {error.id == 'staff-pwd' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Email<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'staff-email' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeAdminStaff.email || ''}
                                                onChange={(e) => onChangeInput('email', e.target.value)}
                                                placeholder="staff email*"
                                            />
                                            {error.id == 'staff-email' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Phone number<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'staff-phone' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="number"
                                                value={activeAdminStaff.phone || ''}
                                                onChange={(e) => onChangeInput('phone', e.target.value)}
                                                placeholder="Enter phone number"
                                            />
                                            {error.id == 'staff-phone' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <div className='btn-wrap footer-btn-wrap'>
                                <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                                <div className='btn primary-btn' onClick={onSave} >{activeAdminStaff.id ? <>Update</> : <>Create</>} staff details</div>
                            </div>
                        </div>}
                    </>
                    {/* config */}
                    <>
                        {activeTab != 'config' ? <div className='store-details-content config-tab-wrap tab-wrap' style={{ height: activeTab != 'config' ? '50px' : '0' }} onClick={() => onChangeTab('config')}>
                            <div className='card tab-heading'>Store Configuration Details <MdExpandMore /></div>
                        </div> : <div className="store-details-content active-tab">
                            <StoreConfigurations
                                activeTenant={activeTenant}
                                activeStore={activeStore}
                                originalData={originalData}
                                setOriginalData={setOriginalData}
                                activeConfigurations={activeConfigurations}
                                setActiveConfigurations={(config) => setActiveConfigurations(config)}
                                ref={storeConfigRef} />
                            <div className='btn-wrap footer-btn-wrap'>
                                <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                                <div className='btn primary-btn' onClick={onSave} >Save configurations details</div>
                            </div>
                        </div>}
                    </>
                    {/* genericImages */}
                    <>
                        {activeTab != 'genericImages' ? <div className='store-details-content genericImages-tab-wrap tab-wrap' style={{ height: activeTab != 'genericImages' ? '50px' : '0' }} onClick={() => onChangeTab('genericImages')}>
                            <div className='card tab-heading'>Store generic images <MdExpandMore /></div>
                        </div> : <div className="store-details-content active-tab">
                            <GenericImages
                                activeTenant={activeTenant}
                                activeConfigurations={activeConfigurations}
                                setActiveConfigurations={(config) => setActiveConfigurations(config)}
                                ref={genericImagesRef} />
                            <div className='btn-wrap footer-btn-wrap'>
                                <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                                <div className='btn primary-btn' onClick={onSave} >{activeConfigurations?.id ? <>Update</> : <>Create</>} images</div>
                            </div>
                        </div>}
                    </>
                    {/* manifestConfig */}
                    <>
                        {activeTab != 'manifestConfig' ? <div className='store-details-content genericImages-tab-wrap tab-wrap' style={{ height: activeTab != 'manifestConfig' ? '50px' : '0' }} onClick={() => onChangeTab('manifestConfig')}>
                            <div className='card tab-heading'>Store manifest config <MdExpandMore /></div>
                        </div> : <div className="store-details-content active-tab">
                            <ManifestConfig
                                activeTenant={activeTenant}
                                activeConfigurations={activeConfigurations}
                                setActiveConfigurations={(config) => setActiveConfigurations(config)}
                                ref={manifestConfigRef} />
                            <div className='btn-wrap footer-btn-wrap'>
                                <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                                <div className='btn primary-btn' onClick={onSave} >{activeConfigurations?.id ? <>Update</> : <>Create</>} images</div>
                            </div>
                        </div>}
                    </>
                    {/* sms */}
                    <>
                        {activeTab != 'SMS' ? <div className='store-details-content SMS-tab-wrap tab-wrap' style={{ height: activeTab != 'SMS' ? '50px' : '0' }} onClick={() => onChangeTab('SMS')}>
                            <div className='card tab-heading'>Store SMS Configuration <MdExpandMore /></div>
                        </div> : <div className="store-details-content active-tab">
                            <div className='tenant-details card'>
                                <div className='sub-heading'>Store SMS Configuration</div>
                                <div className="element-group-wrap clearfix">
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>URL<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'SMS-url' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeSMSConfig?.url || ''}
                                                onChange={(e) => onChangeInput('url', e.target.value)}
                                                placeholder="Enter SMS first URL*"
                                            />
                                            {error.id == 'SMS-url' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>

                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>User<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'SMS-user' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeSMSConfig?.user || ''}
                                                onChange={(e) => onChangeInput('user', e.target.value)}
                                                placeholder="Enter SMS user*"
                                            />
                                            {error.id == 'SMS-user' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>

                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Password<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'SMS-pwd' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeSMSConfig?.pwd || ''}
                                                onChange={(e) => onChangeInput('pwd', e.target.value)}
                                                placeholder="Enter SMS pwd*"
                                            />
                                            {error.id == 'SMS-pwd' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="element-group-wrap clearfix">
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>API Key<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'SMS-apiKey' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeSMSConfig?.apiKey || ''}
                                                onChange={(e) => onChangeInput('apiKey', e.target.value)}
                                                placeholder="Enter apiKey "
                                            />
                                            {error.id == 'SMS-apiKey' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Sender Id<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'SMS-senderId' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeSMSConfig?.senderId || ''}
                                                onChange={(e) => onChangeInput('senderId', e.target.value)}
                                                placeholder="Enter SMS sender Id*"
                                            />
                                            {error.id == 'SMS-senderId' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Params<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'SMS-params' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activeSMSConfig?.params || ''}
                                                onChange={(e) => onChangeInput('params', e.target.value)}
                                                placeholder="Enter params"
                                            />
                                            {error.id == 'SMS-params' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='btn-wrap footer-btn-wrap'>
                                <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                                <div className='btn primary-btn' onClick={onSave} >{activeSMSConfig?.id ? <>Update</> : <>Create</>} SMS configuration details</div>
                            </div>
                        </div>}
                    </>
                    {/* payment */}
                    <>
                        {activeTab != 'payment' ? <div className='store-details-content payment-tab-wrap tab-wrap' style={{ height: activeTab != 'payment' ? '50px' : '0' }} onClick={() => onChangeTab('payment')}>
                            <div className='card tab-heading'>Store Payment(RAZORPAY) Configuration <MdExpandMore /></div>
                        </div> : <div className="store-details-content active-tab">
                            <div className='tenant-details card'>
                                <div className='sub-heading'>Store Payment(RAZORPAY) Configuration</div>
                                <div className="element-group-wrap clearfix">
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Name<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'payment-name' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activePaymentVendorConfig.name || ''}
                                                onChange={(e) => onChangeInput('name', e.target.value)}
                                                placeholder="Enter name*"
                                            />
                                            {error.id == 'payment-name' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>

                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Key<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'payment-key' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activePaymentVendorConfig.key || ''}
                                                onChange={(e) => onChangeInput('key', e.target.value)}
                                                placeholder="Enter key*"
                                            />
                                            {error.id == 'payment-key' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>

                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Secrete<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'payment-secrete' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activePaymentVendorConfig.secrete || ''}
                                                onChange={(e) => onChangeInput('secrete', e.target.value)}
                                                placeholder="Enter secrete*"
                                            />
                                            {error.id == 'payment-secrete' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                </div>
                                <div className="element-group-wrap clearfix">
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Redirection URL<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'payment-redirectUrl' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activePaymentVendorConfig.redirectUrl || ''}
                                                onChange={(e) => onChangeInput('redirectUrl', e.target.value)}
                                                placeholder="Enter redirectUrl "
                                            />
                                            {error.id == 'payment-redirectUrl' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Redirect to website URL<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'payment-redirect2Website' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activePaymentVendorConfig.redirect2Website || ''}
                                                onChange={(e) => onChangeInput('redirect2Website', e.target.value)}
                                                placeholder="staff redirect2Website*"
                                            />
                                            {error.id == 'payment-redirect2Website' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                    <div className='element-group card'>
                                        <div className="input-wrap">
                                            <div className='label'>Status URL<span className='mandatory'>*</span></div>
                                            <input className={`${error.id == 'payment-statusUrl' ? 'error ' : ''}`}
                                                autoComplete="off"
                                                type="text"
                                                value={activePaymentVendorConfig.statusUrl || ''}
                                                onChange={(e) => onChangeInput('statusUrl', e.target.value)}
                                                placeholder="Enter statusUrl"
                                            />
                                            {error.id == 'payment-statusUrl' && <div className="error error-text">{error.text}</div>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='btn-wrap footer-btn-wrap' style={{ bottom: '20px' }}>
                                <div className='btn primary-btn border-btn' onClick={onCancel} >Cancel</div>
                                <div className='btn primary-btn' onClick={onSave} >{activePaymentVendorConfig.id ? <>Update</> : <>Create</>} vendor details</div>
                            </div>
                        </div>}
                    </>
                </>}
            {isLoading && <Loader />}
        </div>
    )
}

export default StoreDetails