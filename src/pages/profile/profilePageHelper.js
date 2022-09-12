import { uploadImageToFirebase, _patch } from "../../API/service";
import BACK_ROUTES from "../../data/back_routes";
import Toast from "../../utils/useToast";

export const LOADER_SIZE = 50

export const handleChooseImage = async (event, setFile) => {
    if (event?.target?.files[0] !== undefined) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = function () {
            setFile(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    }

}

export const handleImageClick = (permission) => {
    if (permission) {
        const uploadButton = document.getElementById('imgupload')
        uploadButton.click()
    }

}

export const uploadImage = async (file, areaId, userId) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("areaId", areaId);
    try {
        const bucketRes = await uploadImageToFirebase(formData, areaId)
        const updatedUser = await _patch(BACK_ROUTES.USERS, userId, { profilePictureFileId: bucketRes.data[0]._id })
        return updatedUser
    }
    catch (e) {
        Toast()
        return null
    }
}