import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import term from '../../../../terms';
import get_orientation from '../../../../utils/get_orientation';
import { GetValuesForForm } from '../../CategoryConfig';
import useStyles from '../../styles'
import Form from '../../../Form/Form'
import { ModalInit } from '../PopConfig'

function UsersTab({ handleClose, type }) {

    const classes = useStyles()

    const [values, setValues] = useState()
    const [orientation, setOrientation] = useState('ltr')

    const init = useSelector((s) => s.mainReducer.editTabData);
    const { area, user, lang } = useSelector((state) => state.mainRememberReducer);

    useEffect(() => {
        setValues(init)
        setOrientation(get_orientation(lang))
    }, [init])

    //const formData = GetValuesForForm(values)

    const submit = async (formValues) => {

    }

    return (
        <Box className={classes.container}>
            {/* <Form
                fields={ModalInit}
                data={formData}
                options={[]}
                submitFunction={submit}
                validiationFunction={() => { }}
                orientation={orientation}
            /> */}
        </Box>
    )
}

export default UsersTab