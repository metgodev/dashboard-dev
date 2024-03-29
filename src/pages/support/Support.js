import { Box } from '@mui/material'
import React from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'
import term from '../../terms'
import useStyles from './styles'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import INFO from '../../data/info'

function Support() {

    const classes = useStyles()

    return (
        <Box>
            <PageTitle title={term('support')} />
            <Box className={classes.contentContainer}>
                <h1 className={classes.h1}>{term('talk_to_us')}</h1>
                <h2 className={classes.h2}>{term('we_are_here_for_every_question')}</h2>
                <Box className={classes.email}>
                    <a href={`mailto:${INFO.METRO_EMAIL}`} className={classes.text}>{INFO.METRO_EMAIL}</a>
                    <Box className={classes.mailIconContainer}>
                        <EmailIcon sx={{ color: 'white' }} />
                    </Box>
                </Box>
                <Box className={classes.phone}>
                    <a rel="noreferrer" target="_blank" href={`https://api.whatsapp.com/send?phone=${INFO.METRO_PHONE_INTERNATIONAL}`} className={classes.text}>{INFO.METRO_PHONE}</a>
                    <Box className={classes.phoneIconContainer}>
                        <PhoneIphoneIcon sx={{ color: 'white' }} />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Support
