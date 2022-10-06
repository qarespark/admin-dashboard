import Loader from 'components/modules/loader';
import { emptyManifestConfig } from 'constants/emptyModel';
import { base64ToFile } from 'helpers/utils';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { showError, showSuccess } from 'redux/actions';
import { uploadImage } from 'services/api/common';
import { createUpdateManifestConfig } from 'services/api/store';

const ManifestConfig = forwardRef((props: any, ref: any) => {
    const { activeConfigurations, setActiveConfigurations, activeTenant } = props;
    const dispatch = useAppDispatch()
    const [activeManifestConfig, setActiveManifestConfig] = useState(emptyManifestConfig);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<any>({ id: '', text: '', entity: '' });

    useEffect(() => {
        setActiveManifestConfig(activeConfigurations.storeConfig.manifestConfig || emptyManifestConfig)
    }, [activeConfigurations])

    useImperativeHandle(ref, () => ({
        saveManifestConfig() {
            return onSave()
        }
    }))

    const validateConfig = () => {
        let err = { id: '', text: '' };
        if (!activeManifestConfig.name) err = { text: `Please enter app name`, id: 'name' };
        if (!activeManifestConfig.short_name) err = { text: `Please enter app short name`, id: 'short_name' };
        if (!activeManifestConfig.description) err = { text: `Please enter app description`, id: 'description' };
        if (!activeManifestConfig.start_url) err = { text: `Please enter app url`, id: 'start_url' };
        return err;
    }

    const uploadImages = () => {
        return new Promise((res, rej) => {
            const promises: any = [];
            Promise.all(Object.keys(activeManifestConfig.icons).map(async (key, i) => {
                if (activeManifestConfig.icons[key].includes('base64')) {
                    return uploadImage(activeTenant.id, base64ToFile(activeManifestConfig.icons[key]), 'slider');
                } else return Promise.resolve(activeManifestConfig.icons[key]);
            })).then(function (icons) {
                res(icons)
            })
        })
    }

    const onSave = () => {
        let err: any = validateConfig();
        if (err.id) {
            dispatch(showError(err.text))
            setError(err);
        } else {
            setIsLoading(true)
            uploadImages().then((icons) => {
                console.log(icons)
                const activeManifestConfigCpy = JSON.parse(JSON.stringify(activeManifestConfig))
                Object.keys(activeManifestConfig?.icons).map((key, index) => {
                    activeManifestConfig.icons[key] = icons[index];
                })
                activeManifestConfigCpy.icons = icons;
                createUpdateManifestConfig(activeManifestConfig, activeConfigurations.id).then((configRes: any) => {
                    dispatch(showSuccess('Config updated successfully'))
                    setActiveManifestConfig(configRes.storeConfig.manifestConfig);
                    setActiveConfigurations({ ...configRes })
                    setIsLoading(false);
                })
            })
        }
    }

    const onChangeInput = (from: any, value: any) => {
        setError({})
        const activeManifestConfigCpy = { ...activeManifestConfig };
        activeManifestConfigCpy[from] = value;
        setActiveManifestConfig(activeManifestConfigCpy)
    }

    const onSelectImage = (e: any) => {
        var reader = new FileReader();
        if (e.target.files && e.target.files.length) {
            reader.readAsDataURL(e.target.files[0]); // read file as data url
            reader.onload = (event) => { // called once readAsDataURL is completed
                const activeManifestConfigCpy = { ...activeManifestConfig };
                activeManifestConfigCpy.icons[e.target.id] = event.target!.result;
                setActiveManifestConfig(activeManifestConfigCpy)
                // setSelectedLogo(event.target!.result);
            }
        }
    }

    return (
        <div className='generic-images-wrap card manifest-wrapper'>
            <div className='tenant-details'>
                <div className='sub-heading'>Store Manifest Config</div>
                <div className="element-group-wrap clearfix">
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>App Name<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'name' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeManifestConfig?.name || ''}
                                onChange={(e) => onChangeInput('name', e.target.value)}
                                placeholder="Enter app name*"
                            />
                            {error.id == 'name' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>App short name<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'short_name' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeManifestConfig?.short_name || ''}
                                onChange={(e) => onChangeInput('short_name', e.target.value)}
                                placeholder="Enter app short_name*"
                            />
                            {error.id == 'short_name' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>

                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>App description<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'description' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeManifestConfig?.description || ''}
                                onChange={(e) => onChangeInput('description', e.target.value)}
                                placeholder="Enter last name*"
                            />
                            {error.id == 'description' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>
                </div>
                <div className="element-group-wrap clearfix">
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>App URL<span className='mandatory'>*</span></div>
                            <input className={`${error.id == 'start_url' ? 'error ' : ''}`}
                                autoComplete="off"
                                type="text"
                                value={activeManifestConfig?.start_url || ''}
                                onChange={(e) => onChangeInput('start_url', e.target.value)}
                                placeholder="Enter app url*"
                            />
                            {error.id == 'start_url' && <div className="error error-text">{error.text}</div>}
                        </div>
                    </div>
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Theme Color<span className='mandatory'>*</span></div>
                            <div className="group-colour-wrapper">
                                <div className='group-colour-details'>
                                    <input type="color" autoComplete="false"
                                        value={activeManifestConfig?.theme_color || ''} onChange={(e) => onChangeInput('theme_color', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='element-group card'>
                        <div className="input-wrap">
                            <div className='label'>Background Color<span className='mandatory'>*</span></div>
                            <div className="group-colour-wrapper">
                                <div className='group-colour-details'>
                                    <input type="color" autoComplete="false"
                                        value={activeManifestConfig?.background_color || ''} onChange={(e) => onChangeInput('background_color', e.target.value)} />
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='sub-heading'>Launch Screen Icons</div>
                <div className="element-group-wrap clearfix icons-wrap">
                    {Object.keys(activeManifestConfig?.icons).map((key, index) => {
                        return <div className='element-group card' key={index} onClick={() => document.getElementById(key).click()}>
                            <div className="input-wrap">
                                <div className='label cap-text'>{key}<span className='mandatory'>*</span></div>
                                <div className='img-wrap d-f-c'>
                                    <img src={activeManifestConfig?.icons[key]} />
                                </div>
                                <input style={{ visibility: 'hidden' }} accept='image/*' type="file" id={key} onChange={onSelectImage} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
            {isLoading && <Loader />}
        </div>
    )
})

export default ManifestConfig