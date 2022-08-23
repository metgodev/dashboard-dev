import React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import client from '../../API/metro'
import { Box } from '@mui/material'
import useStyles from './styles'
import { useDispatch } from 'react-redux';
import { set_table_changed } from '../../REDUX/actions/main.actions'
import toast from 'react-hot-toast';
import term from '../../terms';

export default function MyImageList({ type, media, tab, setLoadingImage, id, setExternalValues, externalValues }) {

    const classes = useStyles()
    const dispatch = useDispatch()

    const deleteItem = async (item) => {
        if (setExternalValues !== undefined) {
            const newValues = externalValues.filter(i => i.fileId !== item.item.fileId)
            setExternalValues({ dontSkipStep: true, galleryFileIds: newValues })
        } else {
            setLoadingImage(true)
            try {
                let newMedia = media.filter(mediaItem => item.item.file._id !== mediaItem.file._id)
                let ids = newMedia.map((item) => { return { fileId: item.file._id, metadata: { type: item.metadata.type } } })
                const dataToSend = { galleryFileIds: [...ids], gallery: [...newMedia] }
                const res = await client.service(tab).patch(id, dataToSend)
                if (res) {
                    dispatch(set_table_changed("upload_media"))
                }
                setLoadingImage(false)
            } catch (e) {
                errorToast()
                setLoadingImage(false)
            }
        }
    }

    const errorToast = () => toast(term("something_went_wrong"));

    return (
        <>
            <ImageList style={{ padding: '20px' }} className={classes.imageList} cols={4} gap={20} variant={'quilted'}>
                {media?.map((item, index) => {
                    if (item.metadata.type === type && type !== 'video' && type !== 'files') {
                        return (
                            <ImageListItem style={{ height: '200px', width: '200px' }} cols={1} key={index} id={item.file._id} className={classes.item}>
                                <a href={item.file.url} target="_blank" style={{ position: 'relative' }}>
                                    <img
                                        src={item.file.url}
                                        loading="lazy"
                                        className={classes.image}
                                    />
                                </a>
                                <Box className={classes.deleteWrapper}>
                                    <DeleteOutlineOutlinedIcon onClick={() => deleteItem({ item })} />
                                </Box>
                            </ImageListItem>
                        )
                    } else if (item.metadata.type === type && item.metadata.type === 'video') {
                        return (
                            <ImageListItem style={{ height: '150px', width: '220px' }} key={index} id={item.file._id} className={classes.item}>
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
                            <ImageListItem style={{ height: '150px', width: '220px', display: 'flex' }} key={index} id={item.file._id} className={classes.item}>
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