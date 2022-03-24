import React from 'react'
import term from '../../terms';
import TimeSelector from '../TimePicker/TimePicker';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Button, Collapse, FormControl, MenuItem } from '@material-ui/core';
import Divider from '@mui/material/Divider';
import GoogleAutocomplete from '../GoogleAutocomplete/GoogleAutocomplete';
import { Autocomplete, Grid, InputLabel, TextField, Switch } from '@mui/material';
import MapPick from '../MapPicker.js/MapPick';
import Calendar from '../Calendar/Calendar';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';
import { allRequiredFiledsAreNotEmpty, helperText } from './FormValidators';
import parse_nested from '../../utils/parse_nested';
import { ToastContainer } from 'react-toastify';


const FormBuilder = ({ handleChange, ModalInit, values, picker, TimePicker, type, ...props }) => {
    const { editTabData } = useSelector(s => s.mainReducer)
    const init = parse_nested(editTabData)

    return (
        <>
            <Box sx={{ pr: 2, pl: 2, mt: 1.2, mb: 8 }}>
                <Grid container columnSpacing={{ xs: 1, sm: 3 }} >
                    {ModalInit.map(({ title, id, field, rows, size, type, required, maxItems, relaredToggle }) =>
                        <Grid item md={props.maxSizeElements?.indexOf(type) > -1 ? 12 : 6} sm={12} xs={12} key={id} >
                            <FormControl fullWidth >
                                {type !== 'divider' && <InputLabel> {title}</InputLabel>}
                                {type === 'divider' && <Divider />}
                                {type === 'textfield' &&
                                    <TextField
                                        size={size}
                                        label={title}
                                        multiline
                                        rows={rows}
                                        defaultValue={init[field] || ''}
                                        onChange={(e) => handleChange(e, field)}
                                        required={required}
                                        disabled={values[relaredToggle] || false}
                                        error={values[field] === '' && required}
                                        helperText={
                                            values[field] === '' && required ? term('this_filed_is_required') + " - " + helperText(field) : helperText(field)
                                        }
                                    />
                                }
                                {type === 'picker' &&
                                    <TextField
                                        size={size}
                                        id="select-field"
                                        select
                                        label={title}
                                        required={required}
                                        value={values[field] || ''}
                                        disabled={values[relaredToggle] || false}
                                        error={values[field] === '' && required}
                                        helperText={
                                            values[field] === '' && required ? term('this_filed_is_required') + " - " + helperText(field) : helperText(field)
                                        }
                                        onChange={(e) => handleChange(e, field)}
                                    >
                                        {picker[field].map((s) => (
                                            <MenuItem key={s.value} value={s.value}>
                                                {s.name}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                }
                                {type === 'tagsPicker' &&
                                    <Autocomplete
                                        size={size}
                                        multiple
                                        id="tags-outlined"
                                        options={picker[field] || []}
                                        getOptionLabel={(o) => o.title}
                                        filterSelectedOptions
                                        disabled={values[relaredToggle] || false}
                                        onChange={(e, val) => handleChange(e, field, val)}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={title}
                                                required={required}
                                                placeholder={title}
                                                error={values[field]?.length > maxItems || !values[field]?.length && required || false}
                                                helperText={
                                                    [
                                                        !values[field]?.length && required && term('please_fill_this_field') + " - " + helperText(field),
                                                        values[field]?.length > maxItems && required ? term('this_field_is_limited') + maxItems : ''
                                                    ]
                                                }
                                            />
                                        )}
                                    />
                                }
                                {type === 'autocomplete' &&
                                    <Autocomplete
                                        size={size}
                                        id="autocomplete-field"
                                        options={picker[field]}
                                        getOptionLabel={(o) => o.title}
                                        filterSelectedOptions
                                        onChange={(e, val) => handleChange(e, field, val)}
                                        disabled={values[relaredToggle] || false}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label={title}
                                                required={required}
                                                placeholder={title}
                                                error={values[field]?.length > maxItems || !values[field]?.length && required || false}
                                                helperText={
                                                    [
                                                        !values[field]?.length && required && term('please_fill_this_field') + " - " + helperText(field),
                                                        values[field]?.length > maxItems && required ? term('this_field_is_limited') + maxItems : ''
                                                    ]
                                                }
                                            />
                                        )}
                                    />
                                }
                                {type === 'timesPicker' &&
                                    <>
                                        <Button variant="outlined" size={'large'} color="primary"
                                            disabled={values[relaredToggle] || false}
                                            onClick={props.openDrop} style={{ marginBottom: 10 }} >
                                            {props.open ? <ExpandLess /> : <ExpandMore />}
                                        </Button>
                                        <Collapse in={props.open} timeout="auto" unmountOnExit>
                                            <Grid container spacing={1}>
                                                {TimePicker?.map((s) => (
                                                    <Grid item lg={6} md={6} sm={6} key={s.day}>
                                                        <TimeSelector label={s.day} type={s.type} times={values.openingHours[s.timeref] || {}}
                                                            timeref={s.timeref}
                                                            setTimes={props.setTimes}
                                                            removeDay={props.removeDay}
                                                            setChecked={props.setChecked}
                                                            checked={props.checked} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Collapse>
                                    </>}
                                {type === 'timePicker' && <TimeSelector label={title} setTime={props.setDateTime} field={field} />}
                                {type === 'datePicker' && <Calendar type={2} setDateTwo={props.setDateTime} field={field} />}
                                {type === 'toggle' &&
                                    <Switch
                                        defaultValue={init[field] || false}
                                        checked={values[field] || false}
                                        onChange={(e) => handleChange(e, field, undefined, type)}
                                        inputprops={{ 'aria-label': title }}
                                    />
                                }
                                {type === 'MapPicker' && <MapPick setFatherValue={props.setFatherValue} />}
                                {type === 'googleAutocomplete' && <GoogleAutocomplete setFatherValue={props.setFatherValue} field={field} />}
                            </FormControl>
                        </Grid>
                    )}
                    <Box style={styles.ButtomLeftCornerButton}>
                        <Button
                            style={{ width: 200 }}
                            size="large"
                            variant="contained"
                            color="primary"
                            onClick={() => {
                                allRequiredFiledsAreNotEmpty(values, ModalInit, type)
                                props.modify(type, init.id)
                            }}>
                            {term(type)}
                        </Button>
                    </Box>
                    <ToastContainer />
                </Grid>
            </Box>
        </>
    )
}

export default FormBuilder


const styles = {
    ButtomLeftCornerButton: {
        zIndex: 1,
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
}

