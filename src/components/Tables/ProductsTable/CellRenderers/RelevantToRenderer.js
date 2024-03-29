import { Modal, Box, Button, Autocomplete, TextField, Chip, Checkbox, } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import term from '../../../../terms'
import { Picker } from '../../../PopupDialogSections/Businesses/Tabs/HandleBusinessData'
import { GetTagColor } from '../../../Form/FormFunctions'
import { _patch } from '../../../../API/service';
import BACK_ROUTES from '../../../../data/back_routes'
import ENTITY_STATUS from '../../../../data/entity_status'

function RelevantToRenderer(props) {

    const [open, setOpen] = useState(false)
    const [values, setValues] = useState([])

    useEffect(() => {
        if (props?.data?.relevantTo !== undefined) {
            setValues(Picker.relevantTo.filter(x => props.data.relevantTo.find(item => item === x.id)))
        }
        return () => {
            setValues([])
        }
    }, [])

    const handleChange = async () => {
        try {
            const res = await _patch(BACK_ROUTES.PRODUCTS, props.data._id, { relevantTo: values.map(tag => tag.id), status: ENTITY_STATUS.PENDING_APPROVAL })
            if (res) {
                const rowNode = props.api.getRowNode(props.node.data._id);
                rowNode.setData({ ...rowNode.data, relevantTo: values.map(value => value.id) });
                setOpen(false)
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
            >
                <Box sx={{ gap: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ borderRadius: '10px', flexDirection: 'column', paddingTop: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50vw', height: '50%', backgroundColor: 'white' }}>
                        <Autocomplete
                            multiple={true}
                            options={Picker.relevantTo}
                            getOptionLabel={(option) => {
                                return option.title
                            }}
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
                                                backgroundColor: `${GetTagColor(option.title)}`,
                                            }}
                                            {...getTagProps({ index })}
                                            label={option.title}
                                        />
                                    )
                                });
                            }}
                            renderOption={(props, option, { selected }) => {
                                return (
                                    <li {...props}>
                                        <Checkbox
                                            style={{ marginRight: 8 }}
                                            checked={selected}
                                        />
                                        {option.title}
                                    </li>
                                )
                            }}
                        />
                        <Button variant='contained' onClick={handleChange}>{term('edit')}</Button>
                    </div>
                </Box>
            </Modal>
            <div onClick={() => setOpen(true)} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                {props?.data?.relevantTo?.map(item => `'${term(item.toLowerCase())}' `)}
            </div>
        </>
    )
}

export default RelevantToRenderer