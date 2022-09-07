import axios from "axios";
import client from '../../API/metro'
import BACK_ROUTES from "../../data/back_routes";
import Toast from "../../utils/useToast";

export const PLACEHOLDER_IMAGE = 'https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg'
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

export const handleImageClick = () => {
    const uploadButton = document.getElementById('imgupload')
    uploadButton.click()
}

export const uploadImage = async (file, area, user) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("areaId", area.id);
    try {
        const bucketRes = await axios.post(`${process.env.REACT_APP_STRAPI}/files`, formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: window.localStorage.getItem("metgo-jwt")
                },
                params: {
                    areaId: area.id
                }
            }
        )
        const updatedUser = await client.service(BACK_ROUTES.USERS).patch(user.id, { profilePictureFileId: bucketRes.data[0]._id })
        return updatedUser
    }
    catch (e) {
        Toast()
        return null
    }
}