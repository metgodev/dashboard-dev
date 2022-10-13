import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Box } from '@mui/material'
import useStyles from './styles'
import { useDispatch, useSelector } from 'react-redux';
import { set_table_changed } from '../../REDUX/actions/main.actions'
import { _patch } from '../../API/service';
import Toast from '../../utils/useToast';
import GetPermissions from '../../hooks/GetPermissions';

export default function MyImageList({ type, media, tab, setLoadingImage, id, setExternalValues, externalValues }) {

    const classes = useStyles()
    const dispatch = useDispatch()
    const permissions = GetPermissions()

    const deleteItem = async (item) => {
        if (permissions.edit) {
            if (setExternalValues !== undefined) {
                const newValues = externalValues.filter(i => i.fileId !== item.item.fileId)
                setExternalValues({ dontSkipStep: true, galleryFileIds: newValues })
            } else {
                setLoadingImage(true)
                try {
                    let newMedia = media.filter(mediaItem => item.item.file._id !== mediaItem.file._id)
                    let ids = newMedia.map((item) => { return { fileId: item.file._id, metadata: { type: item.metadata.type } } })
                    const dataToSend = { galleryFileIds: [...ids], gallery: [...newMedia] }
                    const res = await _patch(tab, id, dataToSend)
                    if (res) {
                        dispatch(set_table_changed("upload_media"))
                    }
                    setLoadingImage(false)
                } catch (e) {
                    console.log('myImageList', e)
                    Toast()
                    setLoadingImage(false)
                }
            }
        }
        else {
            Toast('you_dont_have_permission')
        }
    }

    return (
        <>
            <ImageList style={{ padding: '20px' }} className={classes.imageList} cols={6} gap={20} variant={'quilted'}>
                {media?.map((item, index) => {
                    if (item.metadata.type === type && type !== 'video' && type !== 'files') {
                        return (
                            <ImageListItem cols={1} key={index} id={item.file._id} className={classes.item}>
                                <a href={item.file.url} target="_blank" style={{ position: 'relative' }}>
                                    <img
                                        src={item.file.url}
                                        loading="lazy"
                                        className={classes.image}
                                        disabled={!permissions.edit}
                                    />
                                </a>
                                <Box className={classes.deleteWrapper}>
                                    <DeleteOutlineOutlinedIcon onClick={() => {
                                        if (permissions.edit) {
                                            deleteItem({ item })
                                        }
                                    }}
                                    />
                                </Box>
                            </ImageListItem>
                        )
                    } else if (item.metadata.type === type && item.metadata.type === 'video') {
                        return (
                            <ImageListItem key={index} id={item.file._id} className={classes.item}>
                                <a href={item.file.url} target="_blank">
                                    <video
                                        src={item.file.url}
                                        controls
                                        className={classes.image}
                                    />
                                </a>
                                <Box className={classes.deleteWrapper}>
                                    <DeleteOutlineOutlinedIcon onClick={() => deleteItem({ item })} />
                                </Box>
                            </ImageListItem>
                        )
                    } else if (item.metadata.type === type && item.metadata.type === 'files') {
                        return (
                            <ImageListItem style={{ padding: '5px' }} key={index} id={item.file._id} className={classes.item}>
                                <a href={item.file.url} target="_blank">
                                    <audio
                                        src={item.file.url}
                                        controls
                                        className={classes.audio}
                                    />
                                </a>
                                <Box className={classes.deleteWrapper}>
                                    <   DeleteOutlineOutlinedIcon onClick={() => deleteItem({ item })} />
                                </Box>
                            </ImageListItem>
                        )

                    }
                })}
            </ImageList>
        </>
    );
}