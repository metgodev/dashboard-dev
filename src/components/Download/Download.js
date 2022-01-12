import React from 'react'
import term from '../../terms';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
//styles
import useStyles from "./styles";
import { IconButton } from '@mui/material';

function Download() {
    const classes = useStyles()
    return (
        <div className={classes.header}>
            <IconButton
                size="large"
                color="inherit"
                aria-haspopup="true"
                aria-controls="lang-menu"
                onClick={() => { }}
                className={classes.headerMenuButton}
            >
                <FileDownloadOutlinedIcon fontSize="large" classes={{ root: classes.headerIcon }} />
                <p className={classes.headerIconText} >{term('download')}</p>
            </IconButton>
        </div>
    )
}

export default Download
