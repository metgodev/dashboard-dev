import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Modal, Chip, TextField, Box } from '@mui/material'
import { Checkbox as MuiCheckbox } from "@material-ui/core";
import term from '../../../../terms'
import useGetService from '../../../../hooks/useGetService'
import { getTagColor } from '../../../Form/FormFunctions'
import { _patch } from '../../../../API/service';
import { useDispatch } from 'react-redux'
import { set_table_changed } from '../../../../REDUX/actions/main.actions'

function TagsRenderer(props) {

    const [open, setOpen] = useState(false)
    const [values, setValues] = useState([])
    const [tags, setTags] = useState([])

    const dispatch = useDispatch()

    const handleChange = async () => {
        try {
            const res = await _patch('products', props.data._id, { tagsIds: values.map(tag => tag.value) })
            if (res) {
                dispatch(set_table_changed('upload_media'))
                props.api.refreshCells()
            }
        } catch (e) {
            console.log(e)
        }
    }

    const tagCategories = useGetService("tag-categories", "tag-categories", { areaId: props.data.areaId }, props.data.areaId, false)

    useEffect(() => {
        setValues(
            props.data.tags.map(tag => {
                return (
                    { label: tag.tag.title + " - " + term(tag.category.title.toLowerCase()), value: tag._id }
                )
            })
        )
        setTags(
            tagCategories.data.map(tag => {
                return (
                    { label: tag.tag.title + " - " + term(tag.category.title.toLowerCase()), value: tag._id }
                )
            })
        )
        return () => {
            setValues([])
            setTags([])
        }
    }, [props, tagCategories])

    return (
        <>
            <Modal
                open={open}
                onClose={() => {
                    setValues(props.data.tags.map(tag => {
                        return (
                            { label: tag.tag.title + " - " + term(tag.category.title.toLowerCase()), value: tag._id }
                        )
                    }))
                    setOpen(false)
                }}
            >
                <Box sx={{ gap: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ borderRadius: '10px', flexDirection: 'column', paddingTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50vw', height: '50%', backgroundColor: 'white' }}>
                        {tags.length > 0 &&
                            <Autocomplete
                                multiple={true}
                                options={tags}
                                getOptionLabel={(option) => option.label}
                                value={values}
                                disableCloseOnSelect
                                onChange={(e, v) => {
                                    setValues(v)
                                }}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        sx={{ width: '40vw', marginBottom: '20px' }}
                                        variant="filled"
                                        label={props.column.colDef.headerName}
                                    />
                                )}
                                renderTags={(tagValue, getTagProps, y) => {
                                    return tagValue.map((option, index) => {
                                        return (
                                            <Chip
                                                style={{
                                                    border: index === 0 ? `2px solid #01A1FC` : `1px solid grey`,
                                                    padding: '10px',
                                                    backgroundColor: `${getTagColor(option.label)}`,
                                                }}
                                                {...getTagProps({ index })}
                                                label={option.label}
                                            />
                                        )
                                    });
                                }}
                                renderOption={(props, option, { selected }) => (
                                    <li {...props}>
                                        <MuiCheckbox
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.label}
                                    </li>
                                )}
                            />}
                        <Button variant='contained' onClick={handleChange}>{term('edit')}</Button>
                    </div>
                </Box>

            </Modal>
            <div onClick={() => setOpen(true)}>
                {props?.data?.tags?.map(tag => [`${tag?.tag?.title} - ${term(tag?.category?.title)}`])?.join(' , ')}
            </div>
        </>
    )
}

export default TagsRenderer