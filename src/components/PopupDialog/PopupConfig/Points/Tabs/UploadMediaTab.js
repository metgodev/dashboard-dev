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
import client from '../../../../../API/metro'
import { useDispatch } from 'react-redux';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions'
//styles
import useStyles from "../../../styles";

export const UploadMediaTab = ({ media, setMedia, initialData, tab, setLoadingImage, open }) => {

  const classes = useStyles()
  const dispatch = useDispatch();

  useEffect(() => {
    setImageToCrop(null)
  }, [open])

  const [uploadCategory, setUploadCategory] = useState('image')
  const [uploadFileTypes, setUploadFileTypes] = useState(["JPG", "PNG", "JPEG"])
  const [imageToCrop, setImageToCrop] = useState(null)
  const [cropper, setCropper] = useState();

  const handleCategoryChange = (event, newCategory) => {
    setUploadCategory(newCategory)
    setImageToCrop(null)
    switch (newCategory) {
      case 'image':
        setUploadFileTypes(["JPG", "PNG", "JPEG"])
        break
      case 'video':
        setUploadFileTypes(["MP4", "AVI", "WMV"])
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
      await client.service(tab).patch(initialData.id, mediaToUpload)
        .then((res) => {
          dispatch(set_table_changed("upload_media"))
          setMedia([...res.gallery])
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
          {mediaUploadSections.map(({ type }) => {
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
        {!imageToCrop && mediaUploadSections.map(({ type }, index) => {
          return (
            <>
              <DialogTitle id="scroll-dialog-title">{term(type)}</DialogTitle>
              <DialogContent key={index}>
                <MyImageList tab={tab} media={media} setMedia={setMedia} type={type} initialData={initialData} />
              </DialogContent>
              {index < 3 && <Box className={classes.divider} />}
            </>
          )
        })}
      </Box>
    </>
  )
}