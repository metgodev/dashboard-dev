import React, { useState } from 'react'
import { Box, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import term from '../../terms'
import PageTitle from '../../components/PageTitle/PageTitle'
import CropImage from '../../hooks/CropImage'
import useStyles from './styles'
import { set_user_details } from '../../REDUX/actions/user.actions'
import { handleChooseImage, PLACEHOLDER_IMAGE, handleImageClick, uploadImage, LOADER_SIZE } from './profilePageHelper'
import { resizeFile } from '../../hooks/FileResizer'
import { urltoFile } from '../../utils/base64toFile'
import Toast from '../../utils/useToast'

function Profile() {

    const userDetails = useSelector(s => s.userReducer.userDetails)
    const { area, user } = useSelector(s => s.mainRememberReducer)

    const dispatch = useDispatch()
    const classes = useStyles()

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)

    const handleImageUpload = async (file) => {
        setLoading(true)
        try {
            const resized64Image = await resizeFile(file, 1200, 1200, "PNG")
            const resizedFile = await urltoFile(resized64Image, 'profileImage.png', 'image')
            const res = await uploadImage(resizedFile, area, user, setLoading, setFile)
            if (res) {
                dispatch(set_user_details(res))
            }
        } catch (e) {
            Toast()
        }
        setLoading(false)
        setFile(null)
    }

    return (
        <Box className={classes.container} >
            <Box className={classes.pageTitleContainer}>
                <PageTitle title={term('profile')} />
            </Box>
            <Box className={classes.contentContainer}>
                {loading && <CircularProgress size={LOADER_SIZE} />}
                {file !== null && !loading &&
                    <CropImage src={file} onClick={(fileToUpload) => handleImageUpload(fileToUpload)} style={classes.cropBox} />
                }
                <input
                    onChange={(e) => handleChooseImage(e, setFile)}
                    type="file"
                    name="imgupload"
                    id="imgupload"
                    style={{ display: "none" }}
                />
                {file === null && !loading &&
                    <img
                        className={classes.profileImage}
                        src={userDetails?.profilePicture ? userDetails.profilePicture.url : PLACEHOLDER_IMAGE}
                        onClick={() => handleImageClick()}
                    />
                }
                <Box className={classes.details}>
                    <p className={classes.text}>{`${userDetails.firstName ? userDetails.firstName : 'User'} ${userDetails.lastName ? userDetails.lastName : ''}`}</p>
                    <p className={classes.text}>{userDetails?.email}</p>
                </Box>
            </Box>
        </Box >
    )
}

export default Profile