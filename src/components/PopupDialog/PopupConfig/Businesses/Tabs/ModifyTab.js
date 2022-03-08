import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import term from '../../../../../terms';
import { client } from '../../../../../API/metro';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import TimeSelector from '../../../../TimePicker/TimePicker';
import { ModalInit, tags, picker, TimePicker } from '../popConfig';
import { Button, Collapse, MenuItem } from '@material-ui/core';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import GoogleAutocomplete from '../../../../GoogleAutocomplete/GoogleAutocomplete';
import { Autocomplete as MuiAutomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
//styles
import useStyles from '../../../styles';
import MapPick from '../../../../MapPicker.js/MapPick';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const ModifyTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    let classes = useStyles();
    let status = type === 'edit' ? initialData.status : 'PENDING_APPROVAL'
    //local
    const openDrop = () => setOpen(!open);
    const [checked, setChecked] = useState([]);
    const [init, setInit] = useState({});
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        userId: user.id,
        status: status,
        openingHours: {
            sunday: {},
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {},
        },
    });

    useEffect(() => {
        if (Object.keys(initialData).length === 0) return;
        let OC = initialData.contact && JSON.parse(initialData.contact) || {}
        let OH = initialData.openingHours && JSON.parse(initialData.openingHours) || {}
        setInit({ ...initialData, phoneNumber: OC[0].whatsapp, contactPersonPhoneNumber: OC[1].phone, email: OC[2].email })
        setValues(prevState => ({ ...prevState, openingHours: OH }))
        return (() => setInit({}))
    }, [type, initialData])

    //set the values
    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    //set the time
    const setTimes = (times, field, type) => {
        let pos = type === 1 ? 'start' : 'end'
        setValues(prevState => ({ ...prevState, openingHours: { ...prevState.openingHours, [field]: { ...prevState.openingHours[field], [pos]: times } } }))
    };
    const removeDay = (timeRef, e) => {
        if (!e.target.checked) return;
        setValues(prevState => ({ ...prevState, openingHours: { ...prevState.openingHours, [timeRef]: { start: "00:00", end: "00:00" } } }))
    }

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('business').create(values)
                .then(() => dispatch(set_table_changed(type + Math.random())))
                .then(() => handleClose(false))
        else
            client.service('business').patch(id, values)
                .then(() => dispatch(set_table_changed(type + Math.random())))
                .then(() => handleClose(false))
    }

    let maxSizeElements = ['MapPicker', 'timePicker']
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size, type }) =>
                <Grid item lg={maxSizeElements.indexOf(type) > -1 ? 12 : 6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {type === 'MapPicker' && <MapPick setFatherValue={setValues} />}
                        {type === 'googleAutocomplete' && <GoogleAutocomplete setFatherValue={setValues} field={field} />}
                        {type === 'textfield' &&
                            <TextField
                                size={size}
                                id={title}
                                label={title}
                                placeholder={title}
                                multiline
                                rows={rows}
                                // maxRows={maxRows}
                                defaultValue={init[field] || ''}
                                onChange={(e) => handleChange(e, field)}
                                error={values[field] === ''}
                            />}
                        {type === 'picker' &&
                            <TextField
                                size={size}
                                id="select-field"
                                select
                                label={title}
                                value={values[field] || ''}
                                onChange={(e) => handleChange(e, field)}
                            >
                                {picker[field].map((s) => (
                                    <MenuItem key={s.value} value={s.value}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                            </TextField>}
                        {type === 'tagsPicker' &&
                            <MuiAutomplete
                                size={size}
                                multiple
                                id="tags-outlined"
                                options={tags}
                                getOptionLabel={(o) => o.title}
                                filterSelectedOptions
                                onChange={(e, val) => handleChange(e, field, val)}
                                disabled={values[field]?.length > 4 || false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={title}
                                        placeholder="תגיות"
                                    />
                                )}
                            />}
                        {type === 'timePicker' &&
                            <>
                                <Button variant="outlined" size={'large'} color="primary"
                                    onClick={openDrop} style={{ marginBottom: 10 }} >
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </Button>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Grid container spacing={1}>
                                        {TimePicker.map((s) => (
                                            <Grid item lg={6} md={6} sm={6} key={s.day}>
                                                <TimeSelector label={s.day} type={s.type} times={values.openingHours[s.timeref] || null}
                                                    timeref={s.timeref} setTimes={setTimes} removeDay={removeDay} setChecked={setChecked} checked={checked} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Collapse>
                            </>}
                        {type === 'toggle' &&
                            <Switch
                                defaultValue={init[field] || false}
                                checked={values[field] || false}
                                onChange={(e) => handleChange(e, field, undefined, type)}
                                inputprops={{ 'aria-label': title }}
                            />
                        }
                    </FormControl>
                </Grid>
            )}
            <div style={styles.ButtomLeftCornerButton}>
                <Button
                    style={{ width: 200 }}
                    size="large"
                    variant="contained"
                    color="primary"
                    onClick={() => modify(type, init.id)}>
                    {term(type)}
                </Button>
            </div>
        </Grid>
    )
}

const styles = {
    ButtomLeftCornerButton: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
}