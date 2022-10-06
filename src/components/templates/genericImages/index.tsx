import { Switch } from '@material-ui/core';
import AddGenericImgModal from 'components/modules/addGenericImgModal';
import Loader from 'components/modules/loader';
import { emptyGenericImages } from 'constants/emptyModel';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import { showError, showSuccess } from 'redux/actions';
import { getBusinessTypes } from 'redux/selectors';
import { createUpdateStoreConfig } from 'services/api/store';

const GenericImages = forwardRef((props: any, ref: any) => {

    const { activeConfigurations, setActiveConfigurations, activeTenant } = props;
    const dispatch = useAppDispatch()
    const [activeImagesConfiguration, setActiveImagesConfiguration] = useState<any>(emptyGenericImages);
    const [groupsList, setGroupsList] = useState<any>([]);
    const businessTypes = useAppSelector(getBusinessTypes) || [];
    const [openAddImageModal, setOpenAddImageModal] = useState({ active: false, data: null, type: '' })
    const [activeBusinessType, setActiveBusinessType] = useState(null)
    const [error, setError] = useState<any>({ id: '', text: '', entity: '' });
    const [isLoading, setIsLoading] = useState(false);

    const [groupWiseImagesConfig, setGroupWiseImagesConfig] = useState({
        // footerBg: false,
        // loginScreenBg: false,
        appBg: false,
        // hamburgerBg: false
    })

    useImperativeHandle(ref, () => ({
        saveGenericImages() {
            return onSave()
        }
    }))

    useEffect(() => {
        if (props.activeTenant && props.activeConfigurations) {
            //  set groups list
            let businessType = businessTypes.filter((b: any) => b.id == activeTenant.businessTypeId);
            setActiveBusinessType(businessType[0])
            let groups: any = businessType[0].groups;
            groups = groups.split(',');
            if (groups.length > 1) groups.push('both');

            if (groups.length != 0) {
                //create empty image obj
                const imgObj: any = {};
                Object.keys(emptyGenericImages).map((key, index) => {
                    groups.map((group) => {
                        if (!imgObj[key]) imgObj[key] = [{ group: group, path: '', active: false }]
                        else imgObj[key].push({ group: group, path: '', active: false });
                    })
                })
                delete props.activeConfigurations.genericImages.id;
                const savedImages = { ...props.activeConfigurations.genericImages }
                const groupWiseImagesConfigCpy: any = {};
                Object.keys(imgObj).map((key, index) => {
                    const updates = Object.fromEntries(savedImages[key].map((o: any) => [o.group, o]));
                    const result = imgObj[key].map((o: any) => {
                        let grpObj = updates[o.group] || o;
                        if (!('active' in grpObj)) {
                            delete grpObj.id;
                            if (grpObj.path) grpObj.active = true;
                            else grpObj.active = false;
                        }
                        return grpObj;
                    });
                    imgObj[key] = result;
                    let isBothSelected = imgObj[key].filter((i) => i.group == 'both' && i.active);//here after backend implimentation replace i.path to i.active
                    groupWiseImagesConfigCpy[key] = isBothSelected.length != 0 ? true : false;
                })
                setGroupWiseImagesConfig({ ...groupWiseImagesConfigCpy });
                setActiveImagesConfiguration({ ...imgObj })
            }
        }
    }, [props.activeTenant, props.activeConfigurations])

    const onChangeGroupWise = (from, value) => {
        setError({ id: '', text: '' })
        const activeImagesConfigurationCpy = { ...activeImagesConfiguration };
        activeImagesConfigurationCpy[from].map((d) => {
            if (value) d.active = false;
            else d.active = true;
            if (d.group == 'both') d.active = value;
        })
        setGroupWiseImagesConfig({ ...groupWiseImagesConfig, [from]: value })
        setActiveImagesConfiguration({ ...activeImagesConfigurationCpy })
    }

    const onSelectNewImg = (imgData) => {
        if (imgData) {
            const activeImagesConfigurationCpy = { ...activeImagesConfiguration }
            const index = activeImagesConfigurationCpy[openAddImageModal.type].findIndex((i) => i.group == openAddImageModal.data.group);
            activeImagesConfigurationCpy[openAddImageModal.type][index] = imgData;
            setActiveImagesConfiguration(activeImagesConfigurationCpy);
            setError({ id: '', text: '' })
        }
        setOpenAddImageModal({ active: false, data: null, type: '' })
    }

    const validateImages = () => {
        let err = { id: '', text: '' };
        Object.keys(emptyGenericImages).map((key, index) => {
            if (!err.id) {
                if (groupWiseImagesConfig[key]) {
                    let isImgNotSelected = activeImagesConfiguration[key].filter((i) => (i.group == 'both' && !i.path) ? true : false);
                    if (isImgNotSelected.length != 0) err = { text: `Please select ${emptyGenericImages[key].title} for both groups`, id: `${key}-${isImgNotSelected[0].group}-img` };
                } else {
                    let isImgNotSelected = activeImagesConfiguration[key].filter((i) => (i.group != 'both' && !i.path) ? true : false);
                    if (isImgNotSelected.length != 0) err = { text: `Please select ${emptyGenericImages[key].title} for ${isImgNotSelected[0].group} group`, id: `${key}-${isImgNotSelected[0].group}-img` };
                }
            }
        })
        return err;
    }

    const onSave = () => {
        let err: any = validateImages();
        if (err.id) {
            dispatch(showError(err.text))
            setError(err);
        } else {
            setIsLoading(true)
            const activeConfigurationsCopy = JSON.parse(JSON.stringify(activeConfigurations))
            const activeImagesConfigurationcpy = JSON.parse(JSON.stringify(activeImagesConfiguration))
            Object.keys(activeImagesConfigurationcpy).map((key, index) => {
                activeImagesConfigurationcpy[key] = activeImagesConfigurationcpy[key].filter((i: any) => i.path);
            })
            activeConfigurationsCopy.genericImages = activeImagesConfigurationcpy;
            console.log("activeImagesConfigurationcpy", activeImagesConfigurationcpy)
            createUpdateStoreConfig(activeConfigurationsCopy).then((configRes: any) => {
                dispatch(showSuccess('Images updated successfully'))
                setActiveConfigurations(activeConfigurationsCopy)
                setIsLoading(false);
            })
        }
    }

    return (
        <div className='generic-images-wrap card'>
            <div className='sub-heading'>Store generic images</div>
            <div className='images-wrapper'>
                {/* Store spark UI configs */}
                {Object.keys(emptyGenericImages).map((key, index) => {
                    return <div className='tenant-details card clearfix' key={Math.random()}>
                        <div className='on-off-switch-wrap'>
                            <div className='sub-heading'>{index + 1}. {emptyGenericImages[key].title}</div>
                            <div className='switch-wrap'>
                                <div className='sub-heading' onClick={(e) => onChangeGroupWise(key, !groupWiseImagesConfig[key])}>Apply group wise image</div>
                                <Switch checked={!groupWiseImagesConfig[key]} onClick={(e) => onChangeGroupWise(key, !groupWiseImagesConfig[key])} />
                            </div>
                        </div>
                        <div className={`element-group-wrap clearfix`}>
                            {activeImagesConfiguration[key].length && activeImagesConfiguration[key]?.map((imgData, i) => {
                                return <React.Fragment key={Math.random()}>
                                    <div className={`img-wrap ${!imgData.active && 'disabled'} ${error.id == `${key}-${imgData.group}-img` ? 'error' : ''}`} id={imgData.group} onClick={() => setOpenAddImageModal({ active: true, data: imgData, type: key })}>
                                        {imgData.path ? <div className='img-data'>
                                            <img src={imgData.path} />
                                        </div> : <div className='img-data no-img'>
                                            No Image
                                        </div>}
                                        <div className='name cap-text'>{imgData.group}</div>
                                    </div>
                                </React.Fragment>
                            })}
                        </div>
                    </div>
                })}
            </div>
            {openAddImageModal.active && <AddGenericImgModal
                imgData={openAddImageModal.data}
                type={openAddImageModal.type}
                businessType={activeBusinessType}
                handleClose={(data) => onSelectNewImg(data)}
            />}
            {isLoading && <Loader />}
        </div>
    )
})

export default GenericImages