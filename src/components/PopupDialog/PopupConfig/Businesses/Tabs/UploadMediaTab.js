import React, { useEffect, useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DragDrop from '../../../../../hooks/DragDropFiles';
import MyImageList from '../../../../MyImageList/MyImageList';
import {mediaUploadSections } from './UploadMediaConfig'

export const UploadMediaTab = ({ initialData }) => {
 
  const [imagesArr, setImagesArr] = useState([]);
  const [videoArr, setVideoArr] = useState([]);
  const [logo,setLogo] = useState([]);
  const [files,setFiles] = useState([]);
  const [showImage, setShowImage] = useState(false);

  let initialGallery = initialData?.gallery?.length ? JSON.parse(initialData?.gallery) : [];

  return (
    <>
      <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center",  width: '100%'}}>
          {mediaUploadSections.map( ({ title, type, fileTypes }, index) => {
            return(
              <>
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent key={index}>
                  <div style={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                    <DragDrop showImage={showImage} setShowImage={setShowImage} mediaType={type} setArr={type === "image" ? setImagesArr : type === "video" ? setVideoArr : type === "logo" ? setLogo : setFiles} fileTypes={fileTypes} initialData={initialData} />
                  </div>
                  {!showImage && <MyImageList type={type} initialData={initialData} gallery={initialGallery} imagesArr={type === "image" ? imagesArr : type === "video" ? videoArr : type === "logo" ? logo : files} />}
                </DialogContent>
                {index < 3 && <div style={{width:"80%", height: "1px", backgroundColor: "rgba(0,0,256)"}}></div>}
              </>
            )
          })}
      </div>
    </>
  )
}
