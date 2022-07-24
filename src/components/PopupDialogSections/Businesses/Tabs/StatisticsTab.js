import React from 'react'
import term from '../../../../terms';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { statisticsText } from '../popConfig';
import { Button } from '@material-ui/core';

export const StatisticsTab = () => {
    return (
        <>
            <DialogTitle id="scroll-dialog-title">{term('download_statistics')}</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText>
                    {statisticsText}
                </DialogContentText>
            </DialogContent>
            <Button
                style={{ marginTop: 5 }}
                color="primary"
                variant="contained"
                onClick={() => { console.log('edit') }}>
                {term('download_data', 'download data')}
            </Button>
        </>
    )
}
