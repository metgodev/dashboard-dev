import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { set_table_changed, set_edit_tab_data } from '../../../REDUX/actions/main.actions'
import { Box, DialogTitle, DialogContent, ToggleButton, ToggleButtonGroup } from '@mui/material'
import DragDrop from '../../../hooks/DragDropFiles';
import MyImageList from '../../MyImageList/MyImageList';
import CropImage from "../../../hooks/CropImage";
import { Typography } from '../../Wrappers/Wrappers'
import { client } from '../../../API/metro';
import term from '../../../terms'
//styles
import useStyles from "../styles";

export const UploadMediaTab = ({ tab, setLoadingImage, config }) => {

  const classes = useStyles()
  const dispatch = useDispatch();
  const { editTabData } = useSelector(s => s.mainReducer)
  const media = editTabData?.gallery ? (typeof editTabData.gallery == 'string') ? JSON.parse(editTabData.gallery) : editTabData?.gallery : []

  const [uploadCategory, setUploadCategory] = useState(config.initialMediaType)
  const [uploadFileTypes, setUploadFileTypes] = useState(["JPG", "PNG", "JPEG"])
  const [imageToCrop, setImageToCrop] = useState(null)
  const [cropper, setCropper] = useState();


  const handleCategoryChange = (event, newCategory) => {
    setImageToCrop(null)
    setUploadCategory(newCategory)
    switch (newCategory) {
      case 'logo':
        setUploadFileTypes(["JPG", "PNG", "JPEG"])
        break
      case 'image':
        setUploadFileTypes(["JPG", "PNG", "JPEG"])
        break
      case 'video':
        setUploadFileTypes(["MP4", "AVI", "WMV"])
        break
      case 'files':
        setUploadFileTypes(["MP3", "WAV"])
        break
    }
  }

  const uploadMedia = async (fileToUpload, type) => {
    if (type === "file") {
      uploadFile(fileToUpload, type)
    } else {
      const reader = new FileReader();
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

  const uploadFile = async (fileToUpload, type) => {
    if (typeof cropper !== "undefined" || type === "file") {
      setLoadingImage(true)
      const formData = new FormData();
      formData.append("file", fileToUpload);
      const res = await client.service("files").create(formData)
      let currentFileIds = media.map((item) => { return ({ fileId: item.file._id, metadata: { type: item.metadata.type } }) })
      let mediaToUpload = { galleryFileIds: [...currentFileIds, { fileId: res[0]._id, metadata: { type: uploadCategory } }] }
      await client.service(tab).patch(editTabData.id, mediaToUpload)
        .then((res) => {
          let business = { ...res, id: res._id }
          delete business._id
          dispatch(set_edit_tab_data(business))
          dispatch(set_table_changed('upload-image'))
          setLoadingImage(false)
        })
    }
    setImageToCrop(null)
  }


  return (
    <>
      <Box className={classes.uploadMediaTabWrapper}>
        <Typography weight={"400"} size={"xl"}>{term("upload_media")}</Typography>
        <Box className={classes.SectionDivider} />
        <ToggleButtonGroup className={classes.toggleButtons} size={"medium"} color="primary" value={uploadCategory} onChange={handleCategoryChange} exclusive={true}>
          {config.mediaTypes.map(({ type }) => {
            return (
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
          <CropImage cropper={cropper} src={imageToCrop} setCropper={setCropper} onClick={uploadFile} style={classes.cropBox} />
        }
        {!imageToCrop &&
          <>
            <Box className={classes.SectionDivider} />
            <Typography weight={"400"} size={"xl"}>{term('gallery')}</Typography>
            <Box className={classes.SectionDivider} />
          </>
        }
        {!imageToCrop && config.mediaTypes.map(({ type }, index) => {
          return (
            <div key={index}>
              <DialogTitle id="scroll-dialog-title">{term(type)}</DialogTitle>
              <DialogContent key={index} >
                <MyImageList setLoadingImage={setLoadingImage} tab={tab} type={type} />
              </DialogContent>
              {index < 3 && <Box className={classes.divider} />}
            </div>
          )
        })}
      </Box>
    </>
  )
}