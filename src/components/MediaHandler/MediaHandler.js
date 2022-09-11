import { Box } from '@mui/material'
import React, { useState } from 'react'
import CropImage from '../../hooks/CropImage'
import DragDrop from '../../hooks/DragDropFiles'
import MyImageList from '../MyImageList/MyImageList'
import useStyles from './styles'

function MediaHandler({ uploadFile, media, editTabData, setLoadingImage, tab, uploadCategory, setExternalValues, externalValues }) {

    const classes = useStyles()

    const [file, setFile] = useState(null)

    const handleImageUpload = (fileToUpload) => {
        uploadFile(fileToUpload, setLoadingImage, editTabData, media, uploadCategory, tab)
        setFile(null)
    }

    const handleUpload = (file) => {
        if (file.name === undefined) {
            setFile(file)
        } else {
            uploadFile(file, setLoadingImage, editTabData, media, uploadCategory, tab)
        }
    }

    return (
        <>
            {file === null &&
                <Box className={classes.dragDropWrapper}>
                    <DragDrop onRecieveFile={(file) => handleUpload(file)} uploadCategory={uploadCategory} />
                </Box>}
            {file !== null &&
                <CropImage src={file} onClick={(fileToUpload) => handleImageUpload(fileToUpload)} style={classes.cropBox} />
            }
            <MyImageList
                media={media}
                id={editTabData._id}
                setLoadingImage={setLoadingImage}
                tab={tab}
                type={uploadCategory.type}
                setExternalValues={setExternalValues}
                externalValues={externalValues}
            />
        </>
    )
}

export default MediaHandler