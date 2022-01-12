import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DragDrop from '../../../../../hooks/DragDropFiles';
import EncodedImageList from '../../../../EncodedImageList/EncodedImageList';
import term from '../../../../../terms';


export const UploadMediaTab = () => {
  const [base64Image, setBase64Image] = useState([])
  return (
    <>
      <DialogTitle id="scroll-dialog-title">{term('upload_media')}</DialogTitle>
      <DialogContent >
        <DialogContentText >
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="raised-button-file"
            multiple
            type="file"
          />
          <DragDrop setBase64Image={setBase64Image} />
          <EncodedImageList base64Image={base64Image} />
        </DialogContentText>
      </DialogContent>
    </>
  )
}
