import React, { useState } from 'react'
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

  let initialGallery = initialData?.gallery?.length ? JSON.parse(initialData?.gallery) : [];
  console.log(JSON.parse(initialData.galleryFileIds))
  

  return (
    <>
      <div style={{ display: 'flex', flexDirection: "column", justifyContent: 'center', alignItems: "center",  width: '100%'}}>
          {mediaUploadSections.map( ({ title, type, fileTypes }, index) => {
            return(
              <>
                <DialogTitle id="scroll-dialog-title">{title}</DialogTitle>
                <DialogContent key={index}>
                  <DragDrop type={type} setArr={type === "photo" ? setImagesArr : type === "video" ? setVideoArr : type === "logo" ? setLogo : setFiles} fileTypes={fileTypes} initialData={initialData} />
                  <MyImageList initialData={initialData} type={type} gallery={initialGallery} imagesArr={type === "photo" ? imagesArr : type === "video" ? videoArr : type === "logo" ? logo : files} />
                </DialogContent>
                {index < 3 && <div style={{width:"80%", height: "1px", backgroundColor: "rgba(0,0,256)"}}></div>}
              </>
            )
          })}
      </div>
    </>
  )
}
