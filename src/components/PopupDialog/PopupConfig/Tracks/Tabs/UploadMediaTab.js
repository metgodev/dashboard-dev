import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DragDrop from '../../../../../hooks/DragDropFiles';
import MyImageList from '../../../../MyImageList/MyImageList';
import term from '../../../../../terms';
import { Divider } from '@mui/material';


export const UploadMediaTab = ({ imagesArr }) => {
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
        <DragDrop />
        <MyImageList imagesArr={imagesArr} />
        <Divider />
      </DialogContent>
    </>
  )
}