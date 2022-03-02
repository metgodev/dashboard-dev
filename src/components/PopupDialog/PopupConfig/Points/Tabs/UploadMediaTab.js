import React, { useState } from 'react'
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DragDrop from '../../../../../hooks/DragDropFiles';
import MyImageList from '../../../../MyImageList/MyImageList';
import term from '../../../../../terms';
import { useDispatch } from 'react-redux';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { client } from '../../../../../API/metro';
import { Button } from '@material-ui/core';

export const UploadMediaTab = ({ initialData, type }) => {
  //local
  const [values, setValues] = useState({
    galleryFileIds: [],
  });
  const [imagesArr, setImagesArr] = useState([]);

  let gallery = initialData?.gallery?.length ? JSON.parse(initialData?.gallery) : [];
  //global 
  const dispatch = useDispatch();

  const addPhotos = async () => {
    if (type === 'edit') {
      await client.service('business').patch(initialData.id, values)
        .then(() => dispatch(set_table_changed("upload_media" + Math.random())))
    }
  }

  return (
    <>
      <DialogTitle id="scroll-dialog-title">{term('upload_media')}</DialogTitle>
      <DialogContent >
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="raised-button-file"
          multiple
          type="file"
        />
        <DragDrop setValues={setValues} setImagesArr={setImagesArr} />
        <MyImageList gallery={gallery} imagesArr={imagesArr} />
        <div style={{ display: 'flex', justifyContent: 'left', width: '100%' }}>
          <Button
            style={{ width: 200 }}
            size="large"
            variant="contained"
            color="primary"
            onClick={() => addPhotos()}>
            {term('add')}
          </Button>
        </div>
      </DialogContent>
    </>
  )
}
