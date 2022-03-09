import React, { useState, useEffect } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DragDrop from '../../../../../hooks/DragDropFiles';
import MyImageList from '../../../../MyImageList/MyImageList';
import {mediaUploadSections } from './UploadMediaConfig'

export const UploadMediaTab = ({ media, setMedia, initialData, tab }) => {
 
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center",  width: '100%'}}>
          {mediaUploadSections.map( ({ title, type, fileTypes }, index) => {
            return(
              <>
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent key={index}>
                  <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                    <DragDrop media={media} showImage={showImage} setShowImage={setShowImage} mediaType={type} setArr={setMedia} fileTypes={fileTypes} initialData={initialData} tab={tab}/>
                  </div>
                  {!showImage && <MyImageList media={media} setMedia={setMedia} type={type} initialData={initialData} />}
                </DialogContent>
                {index < 3 && <div style={{width:"80%", height: "1px", backgroundColor: "rgba(0,0,256)"}}></div>}
              </>
            )
          })}
      </div>
    </>
  )
}
