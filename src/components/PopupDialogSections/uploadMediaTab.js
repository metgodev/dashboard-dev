import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material'
import { handleCategoryChange, UploadFile } from './uploadMediaTabHelper'
import { set_table_changed } from '../../REDUX/actions/main.actions';
//styles
import useStyles from "./styles";
import useGetService from '../../hooks/useGetService';
import MediaHandler from '../MediaHandler/MediaHandler';
import ToggleButtons from '../ToggleButtons/ToggleButtons';

export const UploadMediaTab = ({ tab, config, setExternalValues, externalValues }) => {

  //styles
  const classes = useStyles()
  const dispatch = useDispatch()
  //global state
  const editTabData = useSelector((s) => s.mainReducer.editTabData);
  const { area } = useSelector(s => s.mainRememberReducer)
  //local state
  const [media, setMedia] = useState([])
  const [uploadCategory, setUploadCategory] = useState(config.initialMediaType)
  const [loadingImage, setLoadingImage] = useState(false)

  const getId = useCallback(() => {
    return { _id: editTabData._id }
  }, [editTabData])

  const data = useGetService(tab, `${tab}_media_ID`, getId(), area, true)

  useEffect(() => {
    (async () => {
      setLoadingImage(true)
      if (tab === 'products' && externalValues) {
        setMedia(externalValues)
        setLoadingImage(false)
        return
      }
      if (data?.data?.length === 1 && data?.data[0]?.galleryFileIds?.length > 0) {
        setMedia(data.data[0].gallery)
      } else {
        setMedia([])
      }
      setLoadingImage(false)
    })()
  }, [editTabData, data, externalValues])

  const handleUploadFile = async (fileToUpload) => {
    const res = await UploadFile(fileToUpload, setLoadingImage, editTabData, media, uploadCategory, tab, area.id, setExternalValues)
    if (res) {
      dispatch(set_table_changed('upload-image'))
    }
  }

  return (
    <Box className={classes.uploadMediaTabWrapper}>
      {loadingImage &&
        <Box className={classes.loadingImage}>
          <CircularProgress size={50} />
        </Box>}
      <ToggleButtons
        buttons={config.mediaTypes}
        size={"medium"}
        color={"primary"}
        value={uploadCategory.type}
        onChange={(e, category) => handleCategoryChange(e, category, setUploadCategory, config.mediaTypes)}
        exclusive={true}
      />
      <MediaHandler
        uploadFile={(fileToUpload) => handleUploadFile(fileToUpload)}
        media={media}
        editTabData={editTabData}
        setLoadingImage={setLoadingImage}
        tab={tab}
        uploadCategory={uploadCategory}
        setExternalValues={setExternalValues}
        externalValues={externalValues}
      />
    </Box>
  )
}