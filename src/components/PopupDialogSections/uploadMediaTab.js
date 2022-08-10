import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { set_table_changed } from '../../REDUX/actions/main.actions'
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material'
import DragDrop from '../../hooks/DragDropFiles';
import MyImageList from '../MyImageList/MyImageList';
import CropImage from "../../hooks/CropImage";
import client from '../../API/metro';
import axios from 'axios'
import toast from 'react-hot-toast';
import term from '../../terms';
//styles
import useStyles from "./styles";
import useGetService from '../../hooks/useGetService';

export const UploadMediaTab = ({ tab, setLoadingImage, config }) => {

  //styles
  const classes = useStyles()
  //global state
  const dispatch = useDispatch();
  const editTabData = useSelector((s) => s.mainReducer.editTabData);
  const tableChanged = useSelector((s) => s.mainReducer.tableChanged);
  const { area } = useSelector(s => s.mainRememberReducer)
  //local state
  const [media, setMedia] = useState([])
  const [uploadCategory, setUploadCategory] = useState(config.initialMediaType)
  const [uploadFileTypes, setUploadFileTypes] = useState(["JPG", "PNG", "JPEG"])
  const [imageToCrop, setImageToCrop] = useState(null)
  const [cropper, setCropper] = useState();

  const data = useGetService(tab, `${tab}_media_ID`, { _id: editTabData._id }, area, true)

  useEffect(() => {
    (async () => {
      setLoadingImage(true)
      if (data?.data?.length === 1 && data?.data[0]?.galleryFileIds?.length > 0) {
        setMedia(data.data[0].gallery)
      } else {
        setMedia([])
      }
      setLoadingImage(false)
    })()
  }, [editTabData, data])

  const handleCategoryChange = (event, newCategory) => {
    if (newCategory !== null) {
      setUploadCategory(newCategory)
    }
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
      default:
        break;
    }
    setImageToCrop(null)
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
      try {
        const bucketRes = await axios.post(`${process.env.REACT_APP_STRAPI}/files`, formData,
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
        let mediaToUpload = { galleryFileIds: [...currentFileIds, { fileId: bucketRes["data"][0]._id, metadata: { type: uploadCategory } }] }
        const res = await client.service(tab).patch(editTabData._id, mediaToUpload)
        if (res) {
          dispatch(set_table_changed('upload-image'))
        }
      } catch (e) {
        errorToast()
      }
    }
    setImageToCrop(null)
  }

  const errorToast = () => toast(term("something_went_wrong"));

  return (
    <Box className={classes.uploadMediaTabWrapper}>
      <ToggleButtonGroup className={classes.toggleButtons} size={"medium"} color="primary" value={uploadCategory} onChange={handleCategoryChange} exclusive={true}>
        {config.mediaTypes.map(({ title, type }) => {
          return (
            <ToggleButton value={type} key={type}>
              {title}
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
      <MyImageList
        media={media}
        businessId={editTabData._id}
        setLoadingImage={setLoadingImage}
        tab={tab}
        type={uploadCategory}
      />
    </Box>
  )
}