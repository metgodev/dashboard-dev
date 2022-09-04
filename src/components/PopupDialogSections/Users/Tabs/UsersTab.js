import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import get_orientation from '../../../../utils/get_orientation';
import { GetValuesForForm } from '../../CategoryConfig';
import useStyles from '../../styles'
import Form from '../../../Form/Form'
import { ModalInit } from '../PopConfig'
import { validate } from './Validations'
import client from '../../../../API/metro'
import { set_table_changed } from '../../../../REDUX/actions/main.actions';
import Toast from '../../../../utils/useToast';
import ROLES from '../../../../data/roles';
import BACK_ROUTES from '../../../../data/back_routes';

function UsersTab({ handleClose, type, areaSpecificData }) {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [values, setValues] = useState({})
    const [orientation, setOrientation] = useState('ltr')

    const init = useSelector((s) => s.mainReducer.editTabData);
    const { lang } = useSelector((state) => state.mainRememberReducer);

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init])

    const formData = GetValuesForForm(values)

    const submit = async (formValues) => {
        try {
            const currentUserRoles = await client.service(BACK_ROUTES.USER_ROLES).find({ query: { userId: init._id } })
            currentUserRoles.data.forEach(role => {
                if (role.roleName !== ROLES.MEMBER) {
                    client.service(BACK_ROUTES.USER_ROLES).remove(role._id)
                }
            })
            const newRoles = areaSpecificData.roles.filter(role => role.id !== '61d2e32a04f66555eab743fc' && formValues.roles.includes(role.id))
            newRoles.forEach(role => {
                client.service(BACK_ROUTES.USER_ROLES).create({ userId: init._id, roleId: role.id })
            })
            dispatch(set_table_changed(type))
            handleClose(false)
        } catch (e) {
            Toast()
        }
    }

    return (
        <Box className={classes.container}>
            {Object.keys(values).length > 0 && <Form
                fields={ModalInit}
                data={formData}
                options={areaSpecificData}
                submitFunction={submit}
                validiationFunction={validate}
                orientation={orientation}
            />}
        </Box>
    )
}

export default UsersTab