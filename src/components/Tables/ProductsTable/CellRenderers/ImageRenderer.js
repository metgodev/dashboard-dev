import { CircularProgress, Modal } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { set_table_changed } from '../../../../REDUX/actions/main.actions'
import MediaHandler from '../../../MediaHandler/MediaHandler'
import { UploadFile } from '../../../PopupDialogSections/uploadMediaTabHelper'
import MEDIA_TYPES from '../../../../data/media_types'
import BACK_ROUTES from '../../../../data/back_routes'

function ImageRenderer(props) {

    const [open, setOpen] = useState(false)
    const [loadingImage, setLoadingImage] = useState(false)

    const dispatch = useDispatch()

    const handleUpload = async (file) => {
        await UploadFile(file, setLoadingImage, { _id: props.data._id }, props.value, { type: MEDIA_TYPES.IMAGE }, BACK_ROUTES.PRODUCTS, props.data.areaId)
        dispatch(set_table_changed('upload_media'))
        setLoadingImage(false)
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
            >
                <div style={{ borderRadius: '10px', flexDirection: 'column', paddingTop: '40px', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', backgroundColor: 'white' }}>
                    {loadingImage ?
                        <CircularProgress />
                        :
                        <MediaHandler
                            media={props.value}
                            editTabData={{ _id: props.data._id, id: props.data._id }}
                            setLoadingImage={setLoadingImage}
                            tab={BACK_ROUTES.PRODUCTS}
                            uploadCategory={{ type: MEDIA_TYPES.IMAGES }}
                            uploadFile={(file) => handleUpload(file)}
                        />
                    }
                </div>
            </Modal>
            <div style={{ width: '100%', height: '100%' }}>

                <div style={{ width: '100%', height: '100%' }} onClick={() => setOpen(true)}>
                    {props.value !== undefined && props.value.length > 0 && <img
                        style={{ padding: '5px', width: '100%', height: '100%' }}
                        src={props?.value[0]?.file?.url}
                    />}
                </div>
            </div>
        </>
    )
}

export default ImageRenderer