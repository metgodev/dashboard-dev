import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { set_table_changed, set_edit_tab_data } from '../../../REDUX/actions/main.actions'
import { Box, DialogTitle, DialogContent, ToggleButton, ToggleButtonGroup } from '@mui/material'
import DragDrop from '../../../hooks/DragDropFiles';
import MyImageList from '../../MyImageList/MyImageList';
import CropImage from "../../../hooks/CropImage";
import { Typography } from '../../Wrappers/Wrappers'
import client from '../../../API/metro';
import term from '../../../terms'
import axios from 'axios'
//styles
import useStyles from "../styles";

export const UploadMediaTab = ({ tab, setLoadingImage, config }) => {

  const classes = useStyles()
  const dispatch = useDispatch();
  const { editTabData } = useSelector(s => s.mainReducer)
  const [media, setMedia] = useState([])

  const [uploadCategory, setUploadCategory] = useState(config.initialMediaType)
  const [uploadFileTypes, setUploadFileTypes] = useState(["JPG", "PNG", "JPEG"])
  const [imageToCrop, setImageToCrop] = useState(null)
  const [cropper, setCropper] = useState();

  const getGallery = async () => {
    const gallery = await client.service(tab).get(editTabData._id)
    return gallery
  }

  useEffect(() => {
    getGallery().then(res => {
      res?.gallery ? setMedia(res.gallery) : setMedia([])
    })
  }, [])


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
      formData.append("areaId", editTabData._id);
      const res = await axios.post(`${process.env.REACT_APP_STRAPI}/files`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: window.localStorage.getItem("metgo-jwt")
          },
          params: {
            areaId: editTabData._id
          }
        }
      )
      let currentFileIds = media.map((item) => { return ({ fileId: item.file._id, metadata: { type: item.metadata.type } }) })
      let mediaToUpload = { galleryFileIds: [...currentFileIds, { fileId: res["data"][0]._id, metadata: { type: uploadCategory } }] }
      await client.service(tab).patch(editTabData._id, mediaToUpload)
        .then((res) => {
          dispatch(set_table_changed('upload-image'))
          getGallery().then(res => {
            res?.gallery ? setMedia(res.gallery) : setMedia([])
          })
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
                <MyImageList getGallery={getGallery} media={media} setMedia={setMedia} editTabData={editTabData} setLoadingImage={setLoadingImage} tab={tab} type={type} />
              </DialogContent>
              {index < 3 && <Box className={classes.divider} />}
            </div>
          )
        })}
      </Box>
    </>
  )
}