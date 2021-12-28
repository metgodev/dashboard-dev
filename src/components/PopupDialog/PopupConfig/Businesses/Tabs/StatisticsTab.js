import React from 'react'
import term from '../../../../../terms';
import { Button } from '../../../../Wrappers/Wrappers';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { statisticsText } from '../popConfig';

export const StatisticsTab = () => {
    return (
        <>
            <DialogTitle id="scroll-dialog-title">Download Statistics</DialogTitle>
            <DialogContent dividers={true}>
                <DialogContentText>
                    {statisticsText}
                </DialogContentText>
            </DialogContent>
            <Button
                style={{ marginTop: 5 }}
                color="primary"
                onClick={() => { console.log('edit') }}>
                {term('download_data', 'download data')}
            </Button>
        </>
    )
}
