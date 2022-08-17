import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Box, CircularProgress } from '@mui/material'
import { handleCategoryChange, UploadFile, uploadMedia } from './uploadMediaTabHelper'
import { set_table_changed } from '../../REDUX/actions/main.actions';
//styles
import useStyles from "./styles";
import useGetService from '../../hooks/useGetService';
import MediaHandler from '../MediaHandler/MediaHandler';
import ToggleButtons from '../ToggleButtons/ToggleButtons';

export const UploadMediaTab = ({ tab, config, type }) => {

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

  const data = useGetService(tab, `${tab}_media_ID`, { _id: editTabData._id }, area, true)

  useEffect(() => {
    (async () => {
      setLoadingImage(true)
      if (data?.data?.length === 1 && data?.data[0]?.galleryFileIds?.length > 0) {
        if (type === 'gallery') {
          setMedia(data.data[0].gallery)
        } else if (type === 'products') {

        }
      } else {
        setMedia([])
      }
      setLoadingImage(false)
    })()
  }, [editTabData, data])

  const handleUploadFile = async (fileToUpload) => {
    const res = await UploadFile(fileToUpload, setLoadingImage, editTabData, media, uploadCategory, tab)
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
      />
    </Box>
  )
}