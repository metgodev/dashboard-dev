import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DragDrop from '../../../../../hooks/DragDropFiles';
import EncodedImageList from '../../../../EncodedImageList/EncodedImageList';
import term from '../../../../../terms';
import { Divider } from '@mui/material';


export const UploadMediaTab = () => {
  const [images, setImages] = useState([])
  const [imagesUri, setImagesUri] = useState([])
  return (
    <>
      <DialogTitle id="scroll-dialog-title">{term('upload_media')}</DialogTitle>
      <DialogContent >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
        />
        <DragDrop setImages={setImages} setImagesUri={setImagesUri} />
        <EncodedImageList imagesUri={imagesUri} />
        <Divider />
      </DialogContent>
    </>
  )
}
