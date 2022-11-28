import { Checkbox, MenuItem, Select, Switch } from '@material-ui/core';
import Loader from 'components/modules/loader';
import { emptyConfigObj } from 'constants/emptyModel';
import { mergeArrayWithoutDuplicates } from 'helpers/utils';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { showError, showSuccess } from 'redux/actions';
import { getBusinessTypes } from 'redux/selectors';
import { createUpdateStoreConfig, getStoresConfigbyTenantIdStoreId } from 'services/api/store';

// We need to wrap component in `forwardRef` in order to gain access to the ref object that is assigned using the `ref` prop. This ref is passed as the second parameter to the function component.
const StoreConfigurations = forwardRef((props: any, ref: any) => {
    // function StoreConfigurations({ activeTenant, activeStore }) {
    const { activeTenant, activeStore, originalData, setOriginalData, activeConfigurations, setActiveConfigurations } = props
    const dispatch = useAppDispatch()
    const [appointmentConfig, setAppointmentConfig] = useState<any>({});
    const [feedbackConfig, setFeedbackConfig] = useState<any>({});
    const [userConfig, setUserConfig] = useState<any>({});
    const [basicConfig, setBasicConfig] = useState<any>({});
    const [filterConfig, setFilterConfig] = useState<any>({});
    const [error, setError] = useState<any>({ id: '', text: '', entity: '' });
    const [isLoading, setIsLoading] = useState(false);
    const [activeInput, setActiveInput] = useState('');
    const [groupsList, setGroupsList] = useState<any>([]);
    const businessTypes = useAppSelector(getBusinessTypes) || [];

    const [daysList, setDaysList] = useState([
        { title: 'All', active: false },
        { title: 'Mon', active: false },
        { title: 'Tue', active: false },
        { title: 'Wed', active: false },
        { title: 'Thu', active: false },
        { title: 'Fri', active: false },
        { title: 'Sat', active: false },
        { title: 'Sun', active: false },
    ])

    useEffect(() => {
        if (activeTenant.businessTypeId && activeTenant.id && activeStore.id) {
            //  set groups list
            let activeBusinessType = businessTypes.filter((b: any) => b.id == activeTenant.businessTypeId);
            let groups: any = activeBusinessType[0].groups;
            groups = groups.split(',');
            if (groups.length > 1) groups.push('both');
            setGroupsList(groups);
        }
    }, [activeTenant, activeStore])

    useEffect(() => {
        setAppointmentConfig({ ...activeConfigurations.storeConfig.appointmentConfig })
        setFeedbackConfig({ ...activeConfigurations.storeConfig.feedbackConfig })
        setBasicConfig({ ...activeConfigurations.storeConfig.basicConfig })
        setUserConfig({ ...activeConfigurations.storeConfig.sparkConfig.userConfig })
        setFilterConfig({ ...activeConfigurations.storeConfig.sparkConfig.filterConfig })

    }, [activeConfigurations])

    // The component instance will be extended with whatever you return from the callback passed as the second argument
    useImperativeHandle(ref, () => ({
        saveStoreConfigs() {
            return onSave()
        }
    }))

    const onChangeValue = (key: string, value: any = '', parentKey: string = '') => {
        if (key) {
            const activeConfigurationsCopy = { ...activeConfigurations }
            const appointmentConfigCopy = { ...activeConfigurations.storeConfig.appointmentConfig }
            const feedbackConfigCopy = { ...activeConfigurations.storeConfig.feedbackConfig }
            const basicConfigCopy = { ...activeConfigurations.storeConfig.basicConfig }
            const userConfigCopy = { ...activeConfigurations.storeConfig.sparkConfig.userConfig }

            if (parentKey == 'basicConfig') {
                basicConfigCopy[key] = !basicConfigCopy[key];
            } else if (parentKey == 'userConfig') {
                userConfigCopy[key] = !userConfigCopy[key];
            } else if (parentKey == 'socialLinks') {
                if (key == 'active') {
                    activeConfigurationsCopy.socialLinks[value].active = !activeConfigurationsCopy.socialLinks[value].active;
                } else {
                    activeConfigurationsCopy.socialLinks[key].url = value;
                }
            } else {
                switch (key) {
                    case 'readOnlyMenu':
                        activeConfigurationsCopy.readOnlyMenu = activeConfigurationsCopy.readOnlyMenu ? false : true;
                        break;
                    case 'startTime':
                        activeConfigurationsCopy.startTime = value;
                        break;
                    case 'closureTime':
                        activeConfigurationsCopy.closureTime = value;
                        break;
                    case 'genderConfig':
                        activeConfigurationsCopy.genderConfig = value;
                        break;
                    case 'weeklyOff':
                        const daysListCopy = [...daysList];
                        activeConfigurationsCopy.weeklyOff = '';
                        if (value == 'All') {
                            if (daysListCopy[0].active) {
                                daysListCopy.map((day) => { day.active = false })
                            } else daysListCopy.map((day) => { day.active = true })
                        } else {
                            daysListCopy.map((day) => {
                                if (day.title == value) day.active = day.active ? false : true;
                            })
                            let isAnyInactive = daysListCopy.filter((d) => d.title != 'All' && !d.active);
                            if (isAnyInactive.length != 0) daysListCopy[0].active = false;
                        }
                        daysListCopy.map((day, index) => {
                            if (day.active && index != 0) {
                                if (!activeConfigurationsCopy.weeklyOff) activeConfigurationsCopy.weeklyOff = day.title;
                                else activeConfigurationsCopy.weeklyOff = `${activeConfigurationsCopy.weeklyOff},${day.title}`;
                            }
                        })
                        setDaysList(daysListCopy);
                        break;
                    case 'currencySymbol':
                        activeConfigurationsCopy.currencySymbol = value;
                    case 'fontStyle':
                        activeConfigurationsCopy.storeConfig.sparkConfig.fontStyle = value;
                        break;
                    case 'groupColour':
                        activeConfigurationsCopy.storeConfig.sparkConfig.color[parentKey] = value;
                        break;
                    case 'orderingOn':
                        activeConfigurationsCopy.orderingOn = activeConfigurationsCopy.orderingOn ? false : true;
                        break;
                    case 'deliveryOn':
                        activeConfigurationsCopy.deliveryOn = activeConfigurationsCopy.deliveryOn ? false : true;
                        break;
                    case 'pickupOn':
                        activeConfigurationsCopy.pickupOn = activeConfigurationsCopy.pickupOn ? false : true;
                        break;
                    case 'minOrderValue':
                        activeConfigurationsCopy.minOrderValue = value;
                        break;
                    case 'recieveOnlinePayment':
                        activeConfigurationsCopy.recieveOnlinePayment = activeConfigurationsCopy.recieveOnlinePayment ? false : true;
                        break;
                    case 'cod':
                        activeConfigurationsCopy.cod = activeConfigurationsCopy.cod ? false : true;
                        break;
                    case 'minOrderValue':
                        activeConfigurationsCopy.minOrderValue = value;
                        break;
                    case 'deliveryDisclaimer':
                        activeConfigurationsCopy.deliveryDisclaimer = value;
                        break;
                    case 'pickupDisclaimer':
                        activeConfigurationsCopy.pickupDisclaimer = value;
                        break;
                    case 'appointmentOn':
                        appointmentConfigCopy.active = appointmentConfigCopy.active ? false : true;
                        break;
                    case 'smsForAppointments':
                        appointmentConfigCopy.smsForAppointments = appointmentConfigCopy.smsForAppointments ? false : true;
                        break;
                    case 'showExpertAsSalon':
                        appointmentConfigCopy.showExpertAsSalon = appointmentConfigCopy.showExpertAsSalon ? false : true;
                        break;
                    case 'reminderBeforeDays':
                        appointmentConfigCopy.reminderBeforeDays = value;
                        break;
                    case 'reminderBeforeHrs':
                        appointmentConfigCopy.reminderBeforeHrs = value;
                        break;
                    case 'feedbackOn':
                        activeConfigurationsCopy.active = activeConfigurationsCopy.active ? false : true;
                        break;
                    case 'smsOn':
                        feedbackConfigCopy.smsOn = feedbackConfigCopy.smsOn ? false : true;
                        break;
                    case 'emailOn':
                        feedbackConfigCopy.emailOn = feedbackConfigCopy.emailOn ? false : true;
                        break;
                    case 'feedbackUrl':
                        feedbackConfigCopy.feedbackUrl = value;
                        break;
                    case 'discount':
                        activeConfigurationsCopy.storeConfig.discountConfig.active = activeConfigurationsCopy.storeConfig.discountConfig.active ? false : true;
                        break;
                    case 'maxFixDiscount':
                        activeConfigurationsCopy.storeConfig.discountConfig.maxFixDiscount = value;
                        break;
                    case 'maxPerDiscount':
                        if (Number(value <= 100)) activeConfigurationsCopy.storeConfig.discountConfig.maxPerDiscount = value;
                        break;
                    case 'showProductCategoryGridView':
                        activeConfigurationsCopy.showProductCategoryGridView = activeConfigurationsCopy.showProductCategoryGridView ? false : true;
                        break;
                    case 'showServicesPdp':
                        activeConfigurationsCopy.showServicesPdp = activeConfigurationsCopy.showServicesPdp ? false : true;
                        break;
                    case 'showProductPdp':
                        activeConfigurationsCopy.showProductPdp = activeConfigurationsCopy.showProductPdp ? false : true;
                        break;
                    case 'showStoreLocator':
                        activeConfigurationsCopy.showStoreLocator = activeConfigurationsCopy.showStoreLocator ? false : true;
                        break;
                    case 'quoteRequest':
                        activeConfigurationsCopy.storeConfig.sparkConfig.quoteRequest = activeConfigurationsCopy.storeConfig.sparkConfig.quoteRequest ? false : true;
                        break;
                    case 'serviceListHeading':
                        activeConfigurationsCopy.serviceListHeading = value;
                        break;
                    case 'productListHeading':
                        activeConfigurationsCopy.productListHeading = value;
                        break;
                    case 'popupHeading':
                        activeConfigurationsCopy.storeConfig.userConfig.popupHeading = value;
                        break;
                    default:
                        break;
                }
            }
            activeConfigurationsCopy.storeConfig.basicConfig = { ...basicConfigCopy };
            activeConfigurationsCopy.storeConfig.sparkConfig.userConfig = { ...userConfigCopy };
            activeConfigurationsCopy.storeConfig.feedbackConfig = { ...feedbackConfigCopy };
            activeConfigurationsCopy.storeConfig.appointmentConfig = { ...appointmentConfigCopy };
            setActiveConfigurations({ ...activeConfigurationsCopy })
        }
        setActiveInput('');
    }

    const onChangeFilterConfig = (key: string, type: string, subType: string) => {
        //key:active,pricerange...
        //type:product/service
        //subType:sorting
        const activeConfigurationsCopy = { ...activeConfigurations }
        const filterConfigCopy = { ...filterConfig }
        if (subType) filterConfigCopy[type][subType][key] = filterConfigCopy[type][subType][key] ? false : true;
        else filterConfigCopy[type][key] = filterConfigCopy[type][key] ? false : true;
        activeConfigurationsCopy.storeConfig.sparkConfig.filterConfig = { ...filterConfigCopy };
        setActiveConfigurations({ ...activeConfigurationsCopy })
    }

    const validateConfigs = () => {

        let err = { id: '', text: '' };
        //availability
        if (!activeConfigurations.startTime) err = { text: 'Please select store opening time', id: 'startTime' };
        else if (!activeConfigurations.closureTime) err = { text: 'Please select store closing time', id: 'closureTime' };
        //basic config
        else if (!basicConfig.services && !basicConfig.products) err = { text: 'Please enable services or product', id: 'basicConfig' };
        else if (basicConfig.appointment && !basicConfig.services) err = { text: 'Please enable services for appointment', id: 'basicConfig' };
        else if (basicConfig.feedback && !basicConfig.appointment) err = { text: 'Please enable appointment for feedback', id: 'basicConfig' };
        else if (basicConfig.reports && (!basicConfig.appointment && !basicConfig.pos)) err = { text: 'Please enable appointment or POS', id: 'basicConfig' };
        return err;
    }

    const onSave = () => {
        let err: any = validateConfigs();
        if (err.id) {
            dispatch(showError(err.text))
            setError(err);
        } else {
            setIsLoading(true)
            activeConfigurations.store = activeStore.name;
            activeConfigurations.tenant = activeTenant.name;
            activeConfigurations.storeId = activeStore.id;
            activeConfigurations.tenantId = activeTenant.id;
            createUpdateStoreConfig(activeConfigurations).then((configRes: any) => {
                if (activeConfigurations.id) {
                    dispatch(showSuccess('Configurations updated successfully'))
                } else {
                    const activeConfigurationsCopy = { ...activeConfigurations };
                    activeConfigurationsCopy.id = configRes.id;
                    dispatch(showSuccess('Configurations created successfully'))
                    setActiveConfigurations(activeConfigurationsCopy)
                }
                setIsLoading(false);
                setOriginalData({ ...originalData, storeConfigurations: configRes })

            })
        }
    }

    return (
        <div className='store-config-wrap'>
            <div className="store-details-content">
                <div className="on-off-switch-wrap card">
                    <span className="heading">Currently store is </span>
                    <div className='label' onClick={(e) => onChangeValue('readOnlyMenu')}  >
                        {activeConfigurations.readOnlyMenu ? <span>Closed</span> : <span> Open</span>}
                    </div>
                    <Switch checked={activeConfigurations.readOnlyMenu ? false : true} onClick={(e) => onChangeValue('readOnlyMenu')} />
                </div>
                <div className={`${activeConfigurations.readOnlyMenu && 'disabled'}`}>
                    {/* Store availability */}
                    <div className="tenant-details card clearfix availability-wrap">
                        <div className='sub-heading'>Store availability</div>
                        <div className='element-group-wrap clearfix'>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className='label'>Opening Timing<span className='mandatory'>*</span></div>
                                    <input className={error.id == 'startTime' ? 'error' : ''}
                                        value={activeConfigurations.startTime || ''} placeholder="HH:MM"
                                        onChange={(e) => onChangeValue('startTime', e.target.value)}
                                        type="time"
                                    />
                                    {error.id == 'startTime' && <div className="error error-text">{error.text}</div>}
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className='label'>Closing Timing<span className='mandatory'>*</span></div>
                                    <input className={error.id == 'closureTime' ? 'error' : ''}
                                        value={activeConfigurations.closureTime || ''} placeholder="HH:MM"
                                        onChange={(e) => onChangeValue('closureTime', e.target.value)}
                                        type="time"
                                    />
                                    {error.id == 'closureTime' && <div className="error error-text">{error.text}</div>}
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className='label'>Applicable For</div>
                                    <div className="radio-input-wrapper">
                                        {groupsList.map((group: any, i: number) => {
                                            return <div key={i} className="radio-input-wrap">
                                                <input type="radio" id={group} name="applicableFor" checked={activeConfigurations.genderConfig == group} value={activeConfigurations.genderConfig || ''} onChange={() => onChangeValue('genderConfig', group)} />
                                                <label htmlFor={group} className="cap-text">{group}</label>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='element-group-wrap clearfix'>
                            <div className='days-input input-wrap card'>
                                <div className='label'>Set weekly off</div>
                                <div className="checkbox-input-wrapper">
                                    {daysList.map((day: any, index: number) => {
                                        return <div key={index} className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={day.active}
                                                onClick={() => onChangeValue('weeklyOff', day.title)}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeValue('weeklyOff', day.title)}>{day.title}</div>
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Store spark UI configs */}
                    <div className='tenant-details card ui-configs'>
                        <div className='sub-heading'>Store UI configurations</div>
                        <div className='element-group-wrap clearfix'>
                            <div className="element-group card">
                                <div className="input-wrap">
                                    <div className="label">Use Currency :</div>
                                    <Select
                                        className={`input ${error.id == 'currency' ? 'error ' : ''}`}
                                        labelId="paid-via-label"
                                        placeholder='₹'
                                        value={activeConfigurations.currencySymbol || '₹'}
                                        label="Active currency"
                                        onChange={(e) => onChangeValue('currencySymbol', e.target.value)}
                                    >
                                        <MenuItem className='label' value={'₹'}>{'₹'}</MenuItem>
                                        <MenuItem className='label' value={'$'}>{'$'}</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className="element-group card">
                                <div className="input-wrap">
                                    <div className="label">Font Style :</div>
                                    <Select
                                        className={`input ${error.id == 'currency' ? 'error ' : ''}`}
                                        labelId="paid-via-label"
                                        placeholder='poppins-regular'
                                        value={activeConfigurations.storeConfig.sparkConfig.fontStyle || 'poppins-regular'}
                                        label="Font style"
                                        onChange={(e) => onChangeValue('fontStyle', e.target.value)}
                                    >
                                        <MenuItem className='label' style={{ fontFamily: 'poppins-regular' }} value={'poppins-regular'}>{'poppins-regular'}</MenuItem>
                                        <MenuItem className='label' style={{ fontFamily: 'atlantika' }} value={'atlantika'}>{'atlantika'}</MenuItem>
                                        <MenuItem className='label' style={{ fontFamily: 'bringHeart' }} value={'bringHeart'}>{'bringHeart'}</MenuItem>
                                        <MenuItem className='label' style={{ fontFamily: 'mvboli' }} value={'mvboli'}>{'mvboli'}</MenuItem>
                                        <MenuItem className='label' style={{ fontFamily: 'poppins-light' }} value={'poppins-light'}>{'poppins-light'}</MenuItem>
                                        <MenuItem className='label' style={{ fontFamily: 'poppins-medium' }} value={'poppins-medium'}>{'poppins-medium'}</MenuItem>
                                    </Select>
                                </div>
                            </div>
                            <div className='element-group card group-colour'>
                                <div className="input-wrap">
                                    <div className='label'>Group wise color</div>
                                    <div className="group-colour-wrapper">
                                        {Object.keys(activeConfigurations.storeConfig.sparkConfig.color).map((key, index) => {
                                            return <div className='group-colour-details' key={index}>
                                                <input type="color" autoComplete="false"
                                                    value={activeConfigurations.storeConfig.sparkConfig.color[key] || ''} onChange={(e) => onChangeValue('groupColour', e.target.value, key)} />
                                                <div className="label cap-text">{key}</div>
                                            </div>
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Social links */}
                    <div className='tenant-details card social-links'>
                        <div className='sub-heading'>Social links</div>
                        <div className='element-group-wrap clearfix'>
                            {activeConfigurations.socialLinks.map((link, i) => {
                                return <div className='element-group card' key={i}>
                                    <div className="input-wrap">
                                        <div className='label-wrap'>
                                            <div className="checkbox-input-wrap ckeckbox-wrap">
                                                <Checkbox
                                                    checked={link.active || false}
                                                    onClick={() => onChangeValue('active', i, 'socialLinks')}
                                                    inputProps={{ 'aria-label': 'controlled' }}
                                                />
                                                <div className="label cap-text" onClick={() => onChangeValue('active', i, 'socialLinks')}>{link.name}</div>
                                            </div>
                                        </div>
                                        <div className={`group-colour-wrapper ${!link.active && 'disabled'}`}>
                                            <input type="text" autoComplete="false" placeholder={`www.store-${link.name}-link.com`}
                                                value={link.url} onChange={(e) => onChangeValue(i, e.target.value, 'socialLinks')} />
                                        </div>
                                    </div>
                                </div>
                            })}

                        </div>
                    </div>
                    {/* Store basic features */}
                    <div className="tenant-details card clearfix">
                        <div className='sub-heading'>Store basic features</div>
                        <div className='element-group-wrap clearfix'>
                            {Object.keys(basicConfig).map((key, index) => {
                                return <div className='element-group config-input-wrap' key={index}>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={basicConfig[key] || false}
                                                onClick={() => onChangeValue(key, '', 'basicConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label cap-text" onClick={() => onChangeValue(key, '', 'basicConfig')}>{key}</div>
                                        </div>
                                    </div>
                                </div>
                            })}
                        </div>
                    </div>
                    {/* Product Ordering */}
                    {basicConfig.products && <div className='tenant-details card'>
                        <div className='on-off-switch-wrap'>
                            <div className="heading">Product Ordering</div>
                            <Switch checked={activeConfigurations.orderingOn || false} onClick={(e) => onChangeValue('orderingOn')} />
                            <div className='label' onClick={(e) => onChangeValue('orderingOn')}  >
                                {activeConfigurations.orderingOn ? <span>On</span> : <span> Off</span>}
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix card  ${!activeConfigurations.orderingOn && 'disabled'}`}>
                            <div className='element-group card config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={activeConfigurations.deliveryOn}
                                            onClick={() => onChangeValue('deliveryOn')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeValue('deliveryOn')}>Home Delivery Orders are Enabled</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group card config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={activeConfigurations.pickupOn}
                                            onClick={() => onChangeValue('pickupOn')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeValue('pickupOn')}>Pickup ordering is Enabled</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group card config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={activeConfigurations.recieveOnlinePayment}
                                            onClick={() => onChangeValue('recieveOnlinePayment')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeValue('recieveOnlinePayment')}>Online Payment to Orders are Enabled</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group card config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={activeConfigurations.cod}
                                            onClick={() => onChangeValue('cod')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeValue('cod')}>Cash on pickup is Enabled</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix card  ${!activeConfigurations.orderingOn && 'disabled'}`}>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Minimum order value</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'minOrderValue' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.minOrderValue || ''} onChange={(e) => onChangeValue('minOrderValue', e.target.value)} placeholder="Enter minimum order value" />
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Delivery Disclaimer</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'deliveryDisclaimer' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.deliveryDisclaimer || ''} onChange={(e) => onChangeValue('deliveryDisclaimer', e.target.value)} placeholder="Enter Delivery Disclaimer" />
                                    {error.id == 'deliveryDisclaimer' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Pickup Disclaimer</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'pickupDisclaimer' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.pickupDisclaimer || ''} onChange={(e) => onChangeValue('pickupDisclaimer', e.target.value)} placeholder="Enter Pickup Disclaimer" />
                                    {error.id == 'pickupDisclaimer' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {/* Appointment Booking */}
                    {(basicConfig.appointment && basicConfig.services) && <div className='tenant-details card'>
                        <div className='on-off-switch-wrap'>
                            <div className="heading">Appointment Booking</div>
                            <Switch checked={appointmentConfig.active || false} onClick={(e) => onChangeValue('appointmentOn')} />
                            <div className='label' onClick={(e) => onChangeValue('appointmentOn')}  >
                                {appointmentConfig.active ? <span>On</span> : <span> Off</span>}
                            </div>
                        </div>

                        <div className={`element-group-wrap clearfix card ${!appointmentConfig.active && 'disabled'}`}>
                            <div className='element-group card config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={appointmentConfig.smsForAppointments || false}
                                            onClick={() => onChangeValue('smsForAppointments')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeValue('smsForAppointments')}>Send SMS to customers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Reminder before days</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'reminderBeforeDays' ? 'error' : ''} input-width`}
                                        value={appointmentConfig.reminderBeforeDays || ''} onChange={(e) => onChangeValue('reminderBeforeDays', e.target.value)} placeholder="Enter Pickup Disclaimer" />
                                    {error.id == 'reminderBeforeDays' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Time to send sms before appointment timing</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'reminderBeforeHrs' ? 'error' : ''} input-width`}
                                        value={appointmentConfig.reminderBeforeHrs || ''} onChange={(e) => onChangeValue('reminderBeforeHrs', e.target.value)} placeholder="Enter time" />
                                    {error.id == 'reminderBeforeHrs' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                        </div>

                        <div className={`element-group-wrap clearfix card ${!appointmentConfig.active && 'disabled'}`}>
                            <div className='element-group card config-input-wrap' style={{ width: '50%' }}>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={appointmentConfig.showExpertAsSalon || false}
                                            onClick={() => onChangeValue('showExpertAsSalon')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeValue('showExpertAsSalon')}>Show expert as salon</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {/* Feedback */}
                    {(basicConfig.feedback && basicConfig.service && basicConfig.appointment) && <div className='tenant-details card'>
                        <div className='on-off-switch-wrap'>
                            <div className="heading">Feedback</div>
                            <Switch checked={activeConfigurations.active || false} onClick={(e) => onChangeValue('feedbackOn')} />
                            <div className='label' onClick={(e) => onChangeValue('feedbackOn')}  >
                                {activeConfigurations.active ? <span>On</span> : <span> Off</span>}
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix card ${!activeConfigurations.active && 'disabled'}`}>
                            <div className='element-group card config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={feedbackConfig.smsOn || false}
                                            onClick={() => onChangeValue('smsOn')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeValue('smsOn')}>Send SMS to customers</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label text-input-heading">Feedback Link Url</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'feedbackUrl' ? 'error' : ''} input-width`}
                                        value={feedbackConfig.feedbackUrl || ''} onChange={(e) => onChangeValue('feedbackUrl', e.target.value)} placeholder="Enter feedback link url" />
                                    {error.id == 'feedbackUrl' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {/* Discount */}
                    {(basicConfig.services || basicConfig.products && (basicConfig.appointment || basicConfig.pos)) && <div className='tenant-details card'>
                        <div className='on-off-switch-wrap'>
                            <div className="heading">Discount</div>
                            <Switch checked={activeConfigurations.storeConfig.discountConfig.active || false} onClick={(e) => onChangeValue('discount')} />
                            <div className='label' onClick={(e) => onChangeValue('discount')}  >
                                {activeConfigurations.storeConfig.discountConfig.active ? <span>On</span> : <span> Off</span>}
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix  ${!activeConfigurations.storeConfig.discountConfig.active && 'disabled'}`}>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Maximum discount value in Rs.</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'maxFixDiscount' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.storeConfig.discountConfig.maxFixDiscount || ''} onChange={(e) => onChangeValue('maxFixDiscount', e.target.value)} placeholder="Enter discount value(Rs)" />
                                    {error.id == 'maxFixDiscount' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                            <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Maximum discount value in %</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'maxPerDiscount' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.storeConfig.discountConfig.maxPerDiscount || ''} onChange={(e) => onChangeValue('maxPerDiscount', e.target.value)} placeholder="Enter discount value(%)" />
                                    {error.id == 'maxPerDiscount' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                        </div>
                    </div>}
                    {/* Basic Ui flags - grid view, Show PDP, Store Locator */}
                    <div className='tenant-details card' >
                        {basicConfig.products && <div className='tenant-details'>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Show products in grid view</div>
                                <Switch checked={activeConfigurations.showProductCategoryGridView ? true : false} onClick={(e) => onChangeValue('showProductCategoryGridView')} />
                                <div className='label' onClick={(e) => onChangeValue('showProductCategoryGridView')}  >
                                    {activeConfigurations.showProductCategoryGridView ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                        </div>}
                        {basicConfig.services && <div className='tenant-details'>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Show PDP(Product description page) for service</div>
                                <Switch checked={activeConfigurations.showServicesPdp ? true : false} onClick={(e) => onChangeValue('showServicesPdp')} />
                                <div className='label' onClick={(e) => onChangeValue('showServicesPdp')}  >
                                    {activeConfigurations.showServicesPdp ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                        </div>}
                        {basicConfig.products && <div className='tenant-details'>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Show PDP(Product description page) for products</div>
                                <Switch checked={activeConfigurations.showProductPdp ? true : false} onClick={(e) => onChangeValue('showProductPdp')} />
                                <div className='label' onClick={(e) => onChangeValue('showProductPdp')}  >
                                    {activeConfigurations.showProductPdp ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                        </div>}
                        <div className='tenant-details'>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Show all branches(Store Locator) in spark</div>
                                <Switch checked={activeConfigurations.showStoreLocator ? true : false} onClick={(e) => onChangeValue('showStoreLocator')} />
                                <div className='label' onClick={(e) => onChangeValue('showStoreLocator')}  >
                                    {activeConfigurations.showStoreLocator ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                        </div>
                        {basicConfig.products && <div className='tenant-details'>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Show get quote on pdp</div>
                                <Switch checked={activeConfigurations.storeConfig?.sparkConfig?.quoteRequest ? true : false} onClick={(e) => onChangeValue('quoteRequest')} />
                                <div className='label' onClick={(e) => onChangeValue('quoteRequest')}  >
                                    {activeConfigurations.storeConfig?.sparkConfig?.quoteRequest ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                        </div>}
                    </div>
                    {/* List Heading, Product List Heading */}
                    {(basicConfig.services || basicConfig.products) && <div className='tenant-details card'>
                        <div className='element-group-wrap clearfix'>
                            {basicConfig.services && <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Service List Heading</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'serviceListHeading' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.serviceListHeading || ''} onChange={(e) => onChangeValue('serviceListHeading', e.target.value)} placeholder="Enter Delivery Disclaimer" />
                                    {error.id == 'serviceListHeading' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>}
                            {basicConfig.products && <div className='element-group card'>
                                <div className="input-wrap">
                                    <div className="label">Product List Heading</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'productListHeading' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.productListHeading || ''} onChange={(e) => onChangeValue('productListHeading', e.target.value)} placeholder="Enter Pickup Disclaimer" />
                                    {error.id == 'productListHeading' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>}
                        </div>
                    </div>}
                    {/* User registration popup */}
                    <div className="tenant-details card clearfix">
                        <div className='sub-heading'>User registration popup configurations</div>
                        <div className='tenant-details'>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Show user registration popup on initial page load</div>
                                <Switch checked={userConfig.userRegPopupReq ? true : false} onClick={(e) => onChangeValue('userRegPopupReq', '', 'userConfig')} />
                                <div className='label' onClick={(e) => onChangeValue('userRegPopupReq', '', 'userConfig')}  >
                                    {userConfig.userRegPopupReq ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix  ${!userConfig.userRegPopupReq && 'disabled'}`}>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.userRegMandatory || false}
                                            onClick={() => onChangeValue('userRegMandatory', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('userRegMandatory', '', 'userConfig')}>User registration mandatory</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.showEmail || false}
                                            onClick={() => onChangeValue('showEmail', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('showEmail', '', 'userConfig')}>Show email</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.showAddress || false}
                                            onClick={() => onChangeValue('showAddress', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('showAddress', '', 'userConfig')}>Show address</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.showGender || false}
                                            onClick={() => onChangeValue('showGender', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('showGender', '', 'userConfig')}>Show gender</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.showDob || false}
                                            onClick={() => onChangeValue('showDob', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('showDob', '', 'userConfig')}>Show DOB</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.showAnniversaryDate || false}
                                            onClick={() => onChangeValue('showAnniversaryDate', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('showAnniversaryDate', '', 'userConfig')}>Show anniversary date</div>
                                    </div>
                                </div>
                            </div>

                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.emailMandatory || false}
                                            onClick={() => onChangeValue('emailMandatory', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('emailMandatory', '', 'userConfig')}>Email mandatory</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.genderSelectionMandatory || false}
                                            onClick={() => onChangeValue('genderSelectionMandatory', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('genderSelectionMandatory', '', 'userConfig')}>Gender selection mandatory</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.addressMandatory || false}
                                            onClick={() => onChangeValue('addressMandatory', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('addressMandatory', '', 'userConfig')}>Address mandatory</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.areaMandatory || false}
                                            onClick={() => onChangeValue('areaMandatory', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('areaMandatory', '', 'userConfig')}>Address area mandatory</div>
                                    </div>
                                </div>
                            </div>
                            <div className='element-group config-input-wrap'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={userConfig.cityMandatory || false}
                                            onClick={() => onChangeValue('cityMandatory', '', 'userConfig')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label cap-text" onClick={() => onChangeValue('cityMandatory', '', 'userConfig')}>Address city mandatory</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix  ${!userConfig.userRegPopupReq && 'disabled'}`}>
                            <div className='element-group card fullwidth'>
                                <div className="input-wrap">
                                    <div className="label">Registration popup heading</div>
                                    <input type="text" autoComplete="false"
                                        className={`${error.id == 'popupHeading' ? 'error' : ''} input-width`}
                                        value={activeConfigurations.popupHeading || ''} onChange={(e) => onChangeValue('popupHeading', e.target.value)} placeholder="Enter popup heading" />
                                    {error.id == 'popupHeading' && <div className='error tax-name-error'>{error.text}</div>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Spark product filtering configurations */}
                    {basicConfig.products && <div className="tenant-details card clearfix">
                        <div className='sub-heading'>Spark products filtering configurations</div>
                        <div className='on-off-switch-wrap'>
                            <div className="heading">Products Filtering</div>
                            <Switch checked={filterConfig?.product?.active || false} onClick={(e) => onChangeFilterConfig('active', 'product', '')} />
                            <div className='label' onClick={(e) => onChangeFilterConfig('active', 'product', '')}  >
                                {filterConfig?.product?.active ? <span>On</span> : <span> Off</span>}
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix  ${!filterConfig?.product?.active && 'disabled'}`}>
                            <div className='element-group config-input-wrap fullwidth'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={filterConfig?.product?.priceRange || false}
                                            onClick={() => onChangeFilterConfig('priceRange', 'product', '')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeFilterConfig('priceRange', 'product', '')}>Show price range filter for products</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`tenant-details  clearfix  ${!filterConfig?.product?.active && 'disabled'}`}>
                            <div className='sub-heading'>Products sorting configurations</div>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Sorting</div>
                                <Switch checked={filterConfig?.product?.sortingConfig?.active || false} onClick={(e) => onChangeFilterConfig('active', 'product', 'sortingConfig')} />
                                <div className='label' onClick={(e) => onChangeFilterConfig('active', 'product', 'sortingConfig')}  >
                                    {filterConfig?.product?.sortingConfig?.active ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                            <div className={`element-group-wrap clearfix  ${!filterConfig?.product?.sortingConfig?.active && 'disabled'}`}>
                                <div className='element-group config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig?.product?.sortingConfig?.highPrice || false}
                                                onClick={() => onChangeFilterConfig('highPrice', 'product', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('highPrice', 'product', 'sortingConfig')}>Sort by high price</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig?.product?.sortingConfig?.lowPrice || false}
                                                onClick={() => onChangeFilterConfig('lowPrice', 'product', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('lowPrice', 'product', 'sortingConfig')}>Sort by low price</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig?.product?.sortingConfig?.discount || false}
                                                onClick={() => onChangeFilterConfig('discount', 'product', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('discount', 'product', 'sortingConfig')}>Sort by discount</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig?.product?.sortingConfig?.latest || false}
                                                onClick={() => onChangeFilterConfig('latest', 'product', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('latest', 'product', 'sortingConfig')}>Sort by ltest</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig?.product?.sortingConfig?.oldest || false}
                                                onClick={() => onChangeFilterConfig('oldest', 'product', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('oldest', 'product', 'sortingConfig')}>Sort by oldest</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                    {/* Spark service filtering configurations */}
                    {basicConfig.services && <div className="tenant-details card clearfix">
                        <div className='sub-heading'>Spark services filtering configurations</div>
                        <div className='on-off-switch-wrap'>
                            <div className="heading">Services Filtering</div>
                            <Switch checked={filterConfig.service?.active || false} onClick={(e) => onChangeFilterConfig('active', 'service', '')} />
                            <div className='label' onClick={(e) => onChangeFilterConfig('active', 'service', '')}  >
                                {filterConfig.service?.active ? <span>On</span> : <span> Off</span>}
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix  ${!filterConfig.service?.active && 'disabled'}`}>
                            <div className='element-group config-input-wrap fullwidth'>
                                <div className="checkbox-input-wrapper">
                                    <div className="checkbox-input-wrap ckeckbox-wrap">
                                        <Checkbox
                                            checked={filterConfig.service?.priceRange || false}
                                            onClick={() => onChangeFilterConfig('priceRange', 'service', '')}
                                            inputProps={{ 'aria-label': 'controlled' }}
                                        />
                                        <div className="label active-label" onClick={() => onChangeFilterConfig('priceRange', 'service', '')}>Show price range filter for services</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={`tenant-details clearfix  ${!filterConfig.service?.active && 'disabled'}`}>
                            <div className='sub-heading'>Services sorting configurations</div>
                            <div className='on-off-switch-wrap'>
                                <div className="heading">Sorting</div>
                                <Switch checked={filterConfig.service?.sortingConfig?.active || false} onClick={(e) => onChangeFilterConfig('active', 'service', 'sortingConfig')} />
                                <div className='label' onClick={(e) => onChangeFilterConfig('active', 'service', 'sortingConfig')}  >
                                    {filterConfig.service?.sortingConfig?.active ? <span>On</span> : <span> Off</span>}
                                </div>
                            </div>
                            <div className={`element-group-wrap clearfix  ${!filterConfig.service?.sortingConfig?.active && 'disabled'}`}>
                                <div className='element-group config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig.service?.sortingConfig?.highPrice || false}
                                                onClick={() => onChangeFilterConfig('highPrice', 'service', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('highPrice', 'service', 'sortingConfig')}>Sort by high price</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig.service?.sortingConfig?.lowPrice || false}
                                                onClick={() => onChangeFilterConfig('lowPrice', 'service', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('lowPrice', 'service', 'sortingConfig')}>Sort by low price</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig.service?.sortingConfig?.discount || false}
                                                onClick={() => onChangeFilterConfig('discount', 'service', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('discount', 'service', 'sortingConfig')}>Sort by discount</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig.service?.sortingConfig?.latest || false}
                                                onClick={() => onChangeFilterConfig('latest', 'service', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('latest', 'service', 'sortingConfig')}>Sort by latest</div>
                                        </div>
                                    </div>
                                </div>
                                <div className='element-group card config-input-wrap'>
                                    <div className="checkbox-input-wrapper">
                                        <div className="checkbox-input-wrap ckeckbox-wrap">
                                            <Checkbox
                                                checked={filterConfig.service?.sortingConfig?.oldest || false}
                                                onClick={() => onChangeFilterConfig('oldest', 'service', 'sortingConfig')}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                            />
                                            <div className="label active-label" onClick={() => onChangeFilterConfig('oldest', 'service', 'sortingConfig')}>Sort by oldest</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
                </div>
                {isLoading && <Loader />}
            </div>
        </div>
    )
})

export default StoreConfigurations