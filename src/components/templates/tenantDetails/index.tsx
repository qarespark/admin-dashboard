import { Checkbox, Select, MenuItem } from '@material-ui/core';
import Loader from 'components/modules/loader';
import { getDateStrings } from 'helpers/utils';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { useEffect, useState } from 'react'
import { showError, showSuccess } from 'redux/actions';
import { getBusinessTypes } from 'redux/selectors';
import { createUpdateTenant } from 'services/api/tenant';
import consoleLog from 'services/console';

function TenantDetails({ activeTenant, setActiveTenant, tenantsList, setTenantsList, originalData, setOriginalData }) {

    const [error, setError] = useState<any>('');
    const [activeBusinessType, setActiveBusinessType] = useState<any>('')
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();
    const businessTypes = useAppSelector(getBusinessTypes) || [];

    useEffect(() => {
        if (activeTenant?.businessTypeId && businessTypes) {
            let bType = businessTypes.filter((b: any) => b.id == activeTenant.businessTypeId);
            setActiveBusinessType(bType[0]);
        }
        consoleLog('activeTenant', activeTenant)
    }, [activeTenant, businessTypes])

    const onChangeInput = (from: any, value: any) => {
        setError({})
        if (from == 'phone1' && value && value.toString().length >= 11) return;
        if (from == 'phone' && value && value.toString().length >= 11) return;
        const activeTenantCopy = { ...activeTenant };
        activeTenantCopy[from] = value;
        setActiveTenant(activeTenantCopy)
    }

    const validateTenantConfig = () => {
        let err = { id: '', text: '' };
        if (!activeTenant.name) err = { id: 'tenant-name', text: 'Please enter tenant name' }
        else if (!activeTenant.validTill) err = { id: 'tenant-validTill', text: 'Please select tenant validity date' }
        else if (!activeBusinessType) err = { id: 'tenant-businessType', text: 'Please select tenant business type' }
        else if (!activeTenant.email) err = { id: 'tenant-email', text: 'Please select tenant email' }
        else if (!activeTenant.phone1) err = { id: 'tenant-phone1', text: 'Please enter tenant primary number' }
        return err;
    }

    const onCancel = () => {
        setActiveTenant(null);
    }

    const onSave = () => {
        let err = validateTenantConfig();
        if (err.id) {
            dispatch(showError(err.text))
            setError(err);
            //validation error present
        } else {
            //submit tenant details
            setIsLoading(true);
            const apiBody = { ...activeTenant }
            apiBody.businessTypeId = activeBusinessType.id;
            apiBody.validTill = new Date(apiBody.validTill);
            // if (apiBody.subDomain) {
            //     apiBody.subDomain = apiBody.subDomain.split('.respark.in')[0];
            //     apiBody.subDomain = `${apiBody.subDomain}.respark.in`;
            // }
            apiBody.active = activeTenant.active ? 1 : 0;
            createUpdateTenant(apiBody).then((tenantRes: any) => {
                const tenantsListCopy = JSON.parse(JSON.stringify(tenantsList));
                let tIndex = tenantsListCopy.findIndex((a: any) => a.id == activeTenant.id);
                if (tIndex != -1) {
                    tenantsListCopy[tIndex] = tenantRes;
                    dispatch(showSuccess('Tenant updated succefully!'));
                } else {
                    tenantsListCopy.push(tenantRes);
                    dispatch(showSuccess('Tenant created succefully!'));
                }
                setTenantsList(tenantsListCopy);
                setActiveTenant(tenantRes);
                setOriginalData({ ...originalData, tenantDetails: tenantRes })
                setIsLoading(false);
            })
        }
    }

    return (
        <div className='tenant-details-component'>
            <div className='tenant-details card'>
                <div className='sub-heading'>Tenant basic details (Tenant id: {activeTenant.id})</div>
                <div className="element-group-wrap clearfix">
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Name<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'tenant-name' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.name || ''}
                                onChange={(e) => onChangeInput('name', e.target.value)}
                                placeholder="Enter tenant name*"
                            />
                            {error.id == 'tenant-name' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Validity<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'tenant-validTill' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="date"
                                min={getDateStrings().ymd}
                                value={activeTenant.validTill || ''}
                                onChange={(e) => onChangeInput('validTill', e.target.value)}
                                placeholder="Select tenant validity*"
                            />
                            {error.id == 'tenant-validTill' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>

                    <div className='element-group card config-input-wrap'>
                        <div className="checkbox-input-wrapper">
                            <div className="checkbox-input-wrap ckeckbox-wrap">
                                <Checkbox
                                    checked={(activeTenant.active == 1 ? true : false) || false}
                                    onClick={() => onChangeInput('active', !activeTenant.active)}
                                    inputProps={{ 'aria-label': 'controlled' }}
                                />
                                <div className="label" onClick={() => onChangeInput('active', !activeTenant.active)}>Active</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="element-group-wrap clearfix">
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>About Tenant</div>
                            <input className={`${error.id == 'tenant-aboutUs' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.aboutUs || ''}
                                onChange={(e) => onChangeInput('aboutUs', e.target.value)}
                                placeholder="Tenant name"
                            />
                        </div>
                    </div>

                    <div className='element-group card domain-wrap'>
                        <div className="input-wrap">
                            <div className='label'>Domain</div>
                            <input className={`${error.id == 'tenant-subDomain' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.subDomain || ''}
                                onChange={(e) => onChangeInput('subDomain', e.target.value)}
                                placeholder="tenant"
                            />
                        </div>
                        {/* <div className='helper-text'>.respark.in</div> */}
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Business Type<span className='mandatory'>*</span></div>
                            <Select
                                className={`input ${error.id == 'tenant-businessType' ? 'error ' : ''}`}
                                labelId="paid-via-label"
                                placeholder='Select Business Type'
                                value={activeBusinessType || ''}
                                label="Pais Via"
                                onChange={(e) => setActiveBusinessType(e.target.value)}
                            >
                                {businessTypes.map((type: any, i: number) => {
                                    return <MenuItem className='sub-heading' value={type} key={i}>{type.name}</MenuItem>
                                })}
                            </Select>
                            {error.id == 'tenant-businessType' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>

                </div>
            </div>
            <div className='tenant-details card'>
                <div className='sub-heading'>Tenant contact details</div>
                <div className="element-group-wrap clearfix">
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Email<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'tenant-email' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.email || ''}
                                onChange={(e) => onChangeInput('email', e.target.value)}
                                placeholder="Tenant email*"
                            />
                            {error.id == 'tenant-email' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Primary phone number<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'tenant-phone1' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="number"
                                value={activeTenant.phone1 || ''}
                                minLength={10}
                                maxLength={10}
                                onChange={(e) => onChangeInput('phone1', e.target.value)}
                                placeholder="Enter phone number"
                            />
                            {error.id == 'tenant-phone1' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Secondary phone number</div>
                            <input className={`${error.id == 'tenant-phone' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="number"
                                value={activeTenant.phone || ''}
                                onChange={(e) => onChangeInput('phone', e.target.value)}
                                placeholder="Enter phone number"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='tenant-details card'>
                <div className='sub-heading'>Tenant address details</div>
                <div className="element-group-wrap clearfix">
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Address</div>
                            <input className={`${error.id == 'tenant-address' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.address || ''}
                                onChange={(e) => onChangeInput('address', e.target.value)}
                                placeholder="Tenant address*"
                            />
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Area</div>
                            <input className={`${error.id == 'tenant-area' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.area || ''}
                                onChange={(e) => onChangeInput('area', e.target.value)}
                                placeholder="Tenant area*"
                            />
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>City</div>
                            <input className={`${error.id == 'tenant-city' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.city || ''}
                                onChange={(e) => onChangeInput('city', e.target.value)}
                                placeholder="Tenant city*"
                            />
                        </div>
                    </div>
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>State</div>
                            <input className={`${error.id == 'tenant-state' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.state || ''}
                                onChange={(e) => onChangeInput('state', e.target.value)}
                                placeholder="Tenant state*"
                            />
                        </div>
                    </div>
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Pincode</div>
                            <input className={`${error.id == 'tenant-pincode' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.pincode || ''}
                                onChange={(e) => onChangeInput('pincode', e.target.value)}
                                placeholder="Tenant pincode*"
                            />
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Country</div>
                            <input className={`${error.id == 'tenant-country' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeTenant.country || ''}
                                onChange={(e) => onChangeInput('country', e.target.value)}
                                placeholder="Tenant country*"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className='btn-wrap footer-btn-wrap'>
                <div className='btn primary-btn border-btn' onClick={onCancel}>Cancel</div>
                <div className='btn primary-btn ' onClick={onSave}>{activeTenant.id ? <>Update</> : <>Create</>} tenant</div>
            </div>
            {isLoading && <Loader />}
        </div>
    )
}

export default TenantDetails