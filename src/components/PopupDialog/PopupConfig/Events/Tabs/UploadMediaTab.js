import React, { useState, useEffect } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DragDrop from '../../../../../hooks/DragDropFiles';
import MyImageList from '../../../../MyImageList/MyImageList';
import { mediaUploadSections } from '../popConfig'
import { Box } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { Typography } from '../../../../Wrappers/Wrappers'
import term from '../../../../../terms'
import CropImage from "../../../../../hooks/CropImage";
import { client } from '../../../../../API/metro'
import { useDispatch } from 'react-redux';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions'
//styles
import useStyles from "../../../styles";

export const UploadMediaTab = ({ media, setMedia, initialData, tab, setLoadingImage, open }) => {
 
  const classes = useStyles()
  const dispatch = useDispatch();

  useEffect( () => {
    setImageToCrop(null)
  }, [open])
  
  const [uploadCategory, setUploadCategory] = useState('image')
  const [uploadFileTypes, setUploadFileTypes] = useState(["JPG", "PNG", "JPEG"])
  const [imageToCrop, setImageToCrop] = useState(null)
  const [cropper, setCropper] = useState();

  const handleCategoryChange = (event, newCategory) => {
    setImageToCrop(null)
    setUploadCategory(newCategory)
    switch(newCategory) {
      case 'image':
        setUploadFileTypes(["JPG", "PNG", "JPEG"])
        break
      case 'video':
        setUploadFileTypes(["MP4", "AVI", "WMV"])
        break
    }
  }

  const uploadMedia = (fileToUpload, type) => {
    if(type === "file"){
        uploadFile(fileToUpload, type) //Just upload the file AS IS
    }else{
      const reader = new FileReader(); //Crop the image and then send it to upload
      reader.onload = () => {
        setImageToCrop(reader.result)
      }
      fetch(fileToUpload).then((res) => {
        res.blob().then((res) => {
          reader.readAsDataURL(res);
        })
      })
  }
}

const uploadFile = (fileToUpload, type) => {
  if (typeof cropper !== "undefined" || type === "file") {
        setLoadingImage(true)
        const formData = new FormData();
        formData.append("file", fileToUpload);
        client.service("files").create(formData).then( (res) => {
        let currentFileIds = media.map( (item) => { return( {fileId: item.file._id, metadata: {type: item.metadata.type}} )})
        let mediaToUpload = { galleryFileIds: [ ...currentFileIds, { fileId:res[0]._id, metadata:{ type:uploadCategory } } ] }
        client.service(tab).patch(initialData.id, mediaToUpload )
          .then( (res) => {
            dispatch( set_table_changed("upload_media" + Math.random()))
            setMedia([...res.gallery])
            setLoadingImage(false)
          })
      })
  }
  setImageToCrop(null)
}

  return (
    <>
      <Box className={classes.uploadMediaTabWrapper}>
        <Typography weight={"bold"} size={"xxl"}>{term("upload_media")}</Typography>
        <ToggleButtonGroup className={classes.toggleButtons} size="small" color="primary" value={uploadCategory} onChange={handleCategoryChange} exclusive ={true}>
          {mediaUploadSections.map( ({type}) => {
                return(
                <ToggleButton value={type} key={type}>
                   {term(type)}
                </ToggleButton>
                )
          })}
        </ToggleButtonGroup>
          {imageToCrop === null &&
          <Box className={classes.dragDropWrapper}>
              <DragDrop onRecieveFile={uploadMedia} fileTypes={uploadFileTypes} />
          </Box>}
          {imageToCrop !== null &&
            <CropImage cropper={cropper} src={imageToCrop} setCropper={setCropper} onClick={uploadFile}  style={classes.cropBox}/>
          }
          {!imageToCrop && <Typography weight={"bold"} size={"xxl"}>{term('gallery')}</Typography>}
          {!imageToCrop && mediaUploadSections.map( ({ type }, index) => {
            return(
              <>
                <DialogTitle id="scroll-dialog-title">{term(type)}</DialogTitle>
                <DialogContent key={index}>
                  <MyImageList tab={tab} media={media} setMedia={setMedia} type={type} initialData={initialData} />
                </DialogContent>
                {index < 3 && <Box className={classes.divider}></Box>}
              </>
            )
          })}
      </Box>
    </>
  )
}