import client from '../../API/metro';
import axios from 'axios'
import Toast from '../../utils/useToast';
import { uploadImageToFirebase } from '../../API/service';

export const handleCategoryChange = (event, newCategory, setUploadCategory, config) => {
    if (newCategory !== null) {
        setUploadCategory(config.find(item => item.type === newCategory))
    }
}

export const UploadFile = async (fileToUpload, setLoadingImage, editTabData, media, uploadCategory, tab, areaId, setExternalValues) => {
    setLoadingImage(true)
    const formData = new FormData();
    formData.append("file", fileToUpload);
    formData.append("areaId", areaId);
    try {
        const bucketRes = await uploadImageToFirebase(formData, areaId)
        if (tab === 'products' && setExternalValues !== undefined) {
            setExternalValues({ dontSkipStep: true, galleryFileIds: [...media, { file: bucketRes.data[0], fileId: bucketRes["data"][0]._id, metadata: { type: uploadCategory.type } }] })
            setLoadingImage(false)
            return true
        }
        else {
            let currentFileIds = media !== undefined ? media.map((item) => { return ({ fileId: item.file._id, metadata: { type: item.metadata.type } }) }) : []
            let mediaToUpload = { galleryFileIds: [...currentFileIds, { fileId: bucketRes.data[0]._id, metadata: { type: uploadCategory.type || 'image' } }] }
            const res = await client.service(tab).patch(editTabData._id, mediaToUpload)
            setLoadingImage(false)
            return res
        }
    } catch (e) {
        setLoadingImage(false)
        console.log('uploadMediaHelper', e)
        Toast()
    }
}