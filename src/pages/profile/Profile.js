import React, { useEffect, useState } from 'react'
import { Avatar, Box, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import term from '../../terms'
import PageTitle from '../../components/PageTitle/PageTitle'
import CropImage from '../../hooks/CropImage'
import useStyles from './styles'
import { set_user_details } from '../../REDUX/actions/user.actions'
import { handleChooseImage, handleImageClick, uploadImage, LOADER_SIZE } from './profilePageHelper'
import { resizeFile } from '../../hooks/FileResizer'
import { urltoFile } from '../../utils/base64toFile'
import Toast from '../../utils/useToast'
import { PLACEHOLDER_PROFILE_IMAGE } from '../../data/constants'
import GetPermissions from "../../hooks/GetPermissions";
import { Button, TextField } from '@mui/material'
import { _patch } from '../../API/service'
import BACK_ROUTES from '../../data/back_routes'

function Profile() {

    const { area, user } = useSelector(s => s.mainRememberReducer)
    const userDetails = useSelector(s => s.userReducer.userDetails)
    const permissions = GetPermissions()

    const dispatch = useDispatch()
    const classes = useStyles()

    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        if (Boolean(Object.keys(userDetails).length)) {
            setFirstName(`${userDetails.firstName ? userDetails.firstName : term('first_name')}`)
            setLastName(`${userDetails.lastName ? userDetails.lastName : term('last_name')}`)
            setEmail(userDetails?.email)
        }
    }, [userDetails])

    const handleImageUpload = async (file) => {
        setLoading(true)
        try {
            const resized64Image = await resizeFile(file, 1200, 1200, "PNG")
            const resizedFile = await urltoFile(resized64Image, 'profileImage.png', 'image')
            const res = await uploadImage(resizedFile, area.id, user.id)
            if (res) {
                dispatch(set_user_details(res))
            }
        } catch (e) {
            Toast()
        }
        setLoading(false)
        setFile(null)
    }

    const firstNameChanged = (e) => {
        setFirstName(e.target.value)
    }
    const lastNameChanged = (e) => {
        setLastName(e.target.value)
    }

    const emailChanged = (e) => {
        setEmail(e.target.value)
    }

    const handleSaveChanges = async () => {
        if (permissions.edit) {
            try {
                if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                    Toast('please_enter_a_valid_email_address')
                    return
                } else {
                    if (firstName.length === 0 || lastName.length === 0) {
                        Toast('please_fill_all_required_fields')
                        return
                    } else {
                        setLoading(true)
                        await _patch(BACK_ROUTES.USERS, userDetails._id, { email: email, firstName: firstName, lastName: lastName })
                        setLoading(false)
                    }
                }
            } catch (e) {
                Toast()
            }
        } else {
            Toast('you_dont_have_permission')
        }
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
                    <Avatar
                        className={classes.profileImage}
                        alt={'profile image'}
                        src={userDetails?.profilePicture ? userDetails.profilePicture.url : PLACEHOLDER_PROFILE_IMAGE}
                        style={{ width: 300, height: 300 }}
                        onClick={() => handleImageClick(permissions.edit)}
                    />
                }
                {!loading &&
                    <>
                        <Box className={classes.details}>
                            <TextField onChange={(e) => firstNameChanged(e)} id="outlined-basic" label={term('first_name')} variant="outlined" value={firstName} />
                            <TextField onChange={(e) => lastNameChanged(e)} id="outlined-basic" label={term('last_name')} variant="outlined" value={lastName} />
                            <TextField onChange={(e) => emailChanged(e)} id="outlined-basic" label={term('email')} variant="outlined" value={email} />
                        </Box>
                        <Button variant='contained' onClick={() => handleSaveChanges()}>{term('edit')}</Button>
                    </>}
            </Box>
        </Box >
    )
}

export default Profile