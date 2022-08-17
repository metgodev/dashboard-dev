import React, { useEffect, useState } from 'react'
import { Button, Box } from '@mui/material'
import AgTableProducts from '../../../Tables/ProductsTable/AgTableProducts'
import Stepper from '../../../Stepper/Stepper'
import term from '../../../../terms'
import { useSelector } from 'react-redux'
import get_orientation from '../../../../utils/get_orientation'
import { productFields } from '../popConfig'
import useStyles from './styles'
import { GetProductFormFields } from './HandleBusinessData'

function AddProductsTab({ areaSpecificData }) {

    const classes = useStyles()

    const { lang } = useSelector((s) => s.mainRememberReducer);

    const [listOrNewProduct, setListOrNewProduct] = useState(true) //true = List, false = New product
    const [orientation, setOrientation] = useState(null)
    const [values, setValues] = useState({ tagsIds: [] })
    const [step, setStep] = useState(0)

    const handleValues = (formValues) => {
        setValues(prev => ({ ...prev, ...formValues }))
        setStep(prev => prev + 1)
    }

    const formFields = GetProductFormFields(productFields, values, areaSpecificData, orientation, handleValues, setStep)

    useEffect(() => {
        setOrientation(get_orientation(lang))
    }, [lang])

    const submitFunction = () => {

    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%', padding: '10px', direction: orientation }}>
            <Button
                onClick={() => setListOrNewProduct(prev => !prev)}
                sx={{ marginBottom: '7px', width: '100px' }}
                variant='contained'
            >
                {listOrNewProduct ? term('add') : term('cancel')}
            </Button>
            {listOrNewProduct ? <AgTableProducts /> :
                <Box className={classes.container} >
                    <Stepper
                        fields={formFields}
                        submitFunction={submitFunction}
                        orientation={orientation}
                        externalActiveStep={step}
                        setExternalActiveStep={setStep}
                    />
                </Box>
            }
        </Box >
    )
}

export default React.memo(AddProductsTab)