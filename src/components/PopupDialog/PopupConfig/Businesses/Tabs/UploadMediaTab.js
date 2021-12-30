import React from 'react'
import term from '../../../../../terms';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { IconButton } from '@mui/material';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';


export const UploadMediaTab = () => {
  return (
    <>
      <DialogTitle id="scroll-dialog-title">Upload Media</DialogTitle>
      <DialogContent >
        <DialogContentText style={{ height: '30vh', border: '2px dashed lightGray' }}>
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <label htmlFor="raised-button-file">
            <IconButton variant="raised" component="span" style={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%', borderRadius: 0 }} >
              <FileUploadOutlinedIcon fontSize='large' />
            </IconButton>
          </label>
        </DialogContentText>
      </DialogContent>
    </>
  )
}
