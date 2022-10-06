import * as React from 'react';
import { FC, useEffect, useState } from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import { availableGenericImages } from 'constants/genericImages';

function AddGenericImgModal({ handleClose, imgData, type, businessType }) {

    const [selectedImage, setSelectedImage] = useState<any>('')

    useEffect(() => {
        setSelectedImage(imgData.path)
    }, [imgData])

    const onCancel = () => {
        handleClose();
    }

    const onSelectImage = (img) => {

    }

    const onSave = () => {
        const modalRes = { ...imgData };
        modalRes.path = selectedImage;
        modalRes.active = true;
        handleClose(modalRes)
    }
    return (
        <Backdrop
            className="add-generic-images-modal common-modal-wrap"
            open={true}
        // onClick={() => handleClose(false)}
        >
            <div className=" modal-content-wrap" style={{ height: `${true ? '560px' : '0'}`, width: '400px' }}>
                <div className="close-modal" onClick={() => handleClose()}>
                    <CloseIcon />
                </div>
                <div className="heading cap-text">Update image - {type} - {imgData.group}</div>
                <div className='modal-content'>
                    <div className='images-list-wrap'>
                        {availableGenericImages[businessType.name][type].map((imageUrl, i) => {
                            return <div key={Math.random()} className={`img-wrap ${selectedImage === imageUrl ? 'active' : ''}`} onClick={() => setSelectedImage(imageUrl)}>
                                <img src={imageUrl} />
                            </div>
                        })}
                    </div>

                    <div className='footer-btn-wrap clearfix'>
                        <div className="primary-btn" onClick={onSave}>Add</div>
                        <div className="primary-btn border-btn" onClick={onCancel}>Cancel</div>
                    </div>
                </div>
            </div>
        </Backdrop>
    )
}

export default AddGenericImgModal