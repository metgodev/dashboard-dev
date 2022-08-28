import React, { useEffect, useState } from 'react'
import { Autocomplete, Button, Modal, Chip, TextField, Box } from '@mui/material'
import { Checkbox as MuiCheckbox } from "@material-ui/core";
import term from '../../../../terms'
import useGetService from '../../../../hooks/useGetService'
import { getTagColor } from '../../../Form/FormFunctions'
import { _patch } from '../../../../API/service';
import toast from 'react-hot-toast';
import BACK_ROUTES from '../../../../data/back_routes';
import ENTITY_STATUS from '../../../../data/entity_status';
import CACHED_DATA_ROUTES from '../../../../data/cached_data_routes'
import MODAL_STATES from '../../../../data/modal_states';

function TagsRenderer(props) {

    const [open, setOpen] = useState(false)
    const [values, setValues] = useState([])
    const [tags, setTags] = useState([])

    const handleChange = async () => {
        if (values.length < 1) {
            errorToast('please_choose_at_least_one_tag')
            return
        }
        if (values.length > 5) {
            errorToast(`${term(`please_choose_up_to`)} 5 ${term('tags')}`)
            return
        }
        try {
            const res = await _patch(BACK_ROUTES.PRODUCTS, props.data._id, { tagsIds: values.map(tag => tag.value), status: ENTITY_STATUS.PENDING_APPROVAL })
            if (res) {
                const rowNode = props.api.getRowNode(props.node.data._id);
                let vals = []
                for (let i = 0; i < values.length; i++) {
                    vals.push(tags.find(tag => tag._id === values[i].value))
                }
                rowNode.setData({ ...rowNode.data, tagsIds: values.map(tag => tag.value), tags: vals });
                setOpen(false)
            }
        } catch (e) {
            console.log('tagsRendered', e)
            errorToast('something_went_wrong')
        }
    }

    const errorToast = (val) => toast(term(val));

    const tagCategories = useGetService(BACK_ROUTES.TAG_CATEGORIES, CACHED_DATA_ROUTES.TAG_CATEGORIES, { areaId: props.data.areaId }, props.data.areaId, false)

    useEffect(() => {
        setValues(
            props?.data?.tags?.map(tag => {
                return (
                    { label: tag.tag.title + " - " + term(tag.category.title.toLowerCase()), value: tag._id }
                )
            })
        )
        setTags(
            tagCategories.data.map(tag => {
                return (
                    { ...tag, label: tag.tag.title + " - " + term(tag.category.title.toLowerCase()), value: tag._id }
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
                        <Autocomplete
                            multiple={true}
                            options={tags}
                            getOptionLabel={(option) => option.label}
                            value={values}
                            disableCloseOnSelect
                            isOptionEqualToValue={(option, value) => {
                                if (option.value === value.value) {
                                    return true
                                } else {
                                    return false
                                }
                            }}
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
                        />
                        <Button variant='contained' onClick={handleChange}>{term(MODAL_STATES.EDIT)}</Button>
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