import { Box, FormControlLabel, FormGroup, TextField } from '@material-ui/core'
import { Checkbox, Button } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import term from '../../../../terms'
import get_orientation from '../../../../utils/get_orientation'
import useStyles from './styles'
import Stepper from '../../../Stepper/Stepper'
import { useDispatch, useSelector } from 'react-redux'
import ENTITY_STATUS from '../../../../data/entity_status'
import { _patch } from '../../../../API/service'
import BACK_ROUTES from '../../../../data/back_routes'
import Toast from '../../../../utils/useToast'
import { set_table_changed } from '../../../../REDUX/actions/main.actions'

function PremiumTab({ handleClose }) {

    const classes = useStyles()
    const dispatch = useDispatch()

    const [termsChecked, setTermsChecked] = useState(false)
    const [bankTransferChecked, setBankTransferChecked] = useState(false)
    const [bitTransferChecked, setBitTransferChecked] = useState(false)
    const [step, setStep] = useState(0)
    const [orientation, setOrientation] = useState('ltr')

    const { lang } = useSelector((s) => s.mainRememberReducer);
    const init = useSelector((s) => s.mainReducer.editTabData);

    useEffect(() => {
        setStep(0)
        setOrientation(get_orientation(lang))
    }, [handleClose])

    const handleChange = (event) => {
        switch (event.target.id) {
            case 'terms_checkbox':
                setTermsChecked(event.target.checked);
                break;
            case 'bank_checkbox':
                setBitTransferChecked(false);
                setBankTransferChecked(event.target.checked);
                break;
            case 'bit_checkbox':
                setBankTransferChecked(false);
                setBitTransferChecked(event.target.checked);
                break;
        }
    };

    const handleButtonClick = useCallback(async () => {
        if (step === 0) {
            setStep(1)
        } else {
            try {
                await _patch(BACK_ROUTES.BUSINESS, init._id, {
                    isPremium: ENTITY_STATUS.PENDING_APPROVAL, paymentMethods:
                        bankTransferChecked ? ["BANK_TRANSFER"] : ["BIT"]
                })
                dispatch(set_table_changed("change"))
                handleClose(true)
            } catch (e) {
                Toast()
            }
        }
    }, [step, bankTransferChecked, bitTransferChecked, termsChecked])

    const formFields = [
        {
            title: term('terms'),
            optional: false,
            field:
                <Box>
                    <p className={classes.addProductsHeader}>{term('add_products')}</p>
                    <p>{term('add_products_premium_agreement_text')}</p>
                    <Box className={classes.contactPersonValuesContainer}>
                        <TextField disabled='true' variant='outlined' label={term('name')} value={init.contactPersonName} />
                        <TextField disabled='true' variant='outlined' label={term('email')} value={init.emailAddress} />
                    </Box>
                    <p>{`* ${term('mail_for_receipts')}`}</p>
                    <Box className={classes.termsContainer}>
                        <a target='_blank' href="https://docs.google.com/document/d/1vNk44xX6BgkyY2Ke9BPCBEyAqp-xnXJP/edit">{term('terms')}</a>
                    </Box >
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={termsChecked}
                                    onChange={handleChange}
                                    id={'terms_checkbox'}
                                />
                            }
                            label={term('agree_to_terms')}
                        />
                    </FormGroup>
                    <Box className={classes.buttonContainer}>
                        <Button
                            disabled={!termsChecked}
                            variant='contained'
                            onClick={handleButtonClick}
                        >
                            {term('next')}
                        </Button>
                    </Box>
                </Box >
        },
        {
            title: term('payment_method'),
            optional: false,
            field:
                <>
                    <p className={classes.addProductsHeader}>{term('payment_method')}</p>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={bankTransferChecked}
                                    onChange={handleChange}
                                    id={'bank_checkbox'}
                                />
                            }
                            label={term('bank_transfer')}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={bitTransferChecked}
                                    onChange={handleChange}
                                    id={'bit_checkbox'}
                                />
                            }
                            label={term('bit_transfer')}
                        />
                    </FormGroup>
                    <Box className={classes.buttonContainer}>
                        <Button
                            disabled={!bitTransferChecked && !bankTransferChecked}
                            variant='contained'
                            onClick={handleButtonClick}
                        >
                            {term('confirmation')}
                        </Button>
                    </Box>
                </>
        }
    ]

    return (
        <Box className={classes.premiumTabContainer}>
            {Boolean(Object.keys(init).length) && init?.isPremium === ENTITY_STATUS.PENDING_APPROVAL ?
                <Box className={classes.waitingForPremiumContainer}>
                    <Box className={classes.premiumInnerContainer}>
                        <span>{term('details_received')}</span>
                        <span>{term('soon_you_will_be_able_to_add_products')}</span>
                    </Box>
                </Box>
                : init?.isPremium === ENTITY_STATUS.PUBLIC
                    ?
                    <Box className={classes.waitingForPremiumContainer}>
                        <Box className={classes.premiumInnerContainer}>
                            <span>{term('approved')}</span>
                        </Box>
                    </Box>
                    :
                    < Stepper
                        fields={formFields}
                        submitFunction={() => { }}
                        externalActiveStep={step}
                        setExternalActiveStep={setStep}
                        orientation={orientation}
                    />
            }
        </Box>
    )
}

export default PremiumTab