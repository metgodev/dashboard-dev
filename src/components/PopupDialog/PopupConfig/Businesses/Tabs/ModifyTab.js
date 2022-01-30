import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import term from '../../../../../terms';
import { Button } from '@material-ui/core';
import { Collapse, MenuItem } from '@material-ui/core';
import { ModalInit, tags, picker, TimePicker } from '../popConfig';
import { Autocomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
import TimeSelector from '../../../../TimePicker/TimePicker';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { client } from '../../../../../API/metro';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
//styles
import useStyles from '../../../styles';



// add anothe option ___ addable text _____
export const ModifyTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    let classes = useStyles();
    const openDrop = () => setOpen(!open);
    //local
    const [OT, setOT] = useState({});
    const [init, setInit] = useState({});
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        status: 'PENDING_APPROVAL',
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
    //validator 
    let isFulfilled = Object.values(values).every(Boolean);

    useEffect(() => {
        if (Object.keys(initialData).length === 0) return;
        let OC = initialData.contact && JSON.parse(initialData.contact) || {}
        setOT(initialData.openingHours && JSON.parse(initialData.openingHours) || {})
        setInit({ ...initialData, phoneNumber: OC[0].whatsapp, contactPersonPhoneNumber: OC[1].phone, email: OC[2].email })
        return (() => setInit({}))
    }, [type, initialData])

    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const setTimes = (times, field, type) => {
        let pos = type === 1 ? 'start' : 'end'
        setValues(prevState => ({ ...prevState, openingHours: { ...prevState.openingHours, [field]: { ...prevState.openingHours[field], [pos]: times } } }))
    };

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

    return (
        <Grid container spacing={2}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size, type }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {type === 'textfield' &&
                            <TextField
                                inputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                size={size}
                                id={title}
                                label={title}
                                placeholder={title}
                                multiline
                                rows={rows}
                                maxRows={maxRows}
                                defaultValue={init[field] || ''}
                                onChange={(e) => handleChange(e, field)}
                            />}
                        {type === 'picker' &&
                            <TextField
                                inputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                size={size}
                                id="select-field"
                                select
                                label={title}
                                value={values[field]}
                                onChange={(e) => handleChange(e, field)}
                            >
                                {picker[field].map((s) => (
                                    <MenuItem key={s.value} value={s.value}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                            </TextField>}
                        {type === 'tagsPicker' &&
                            <Autocomplete
                                inputProps={{
                                    classes: {
                                        input: classes.textField,
                                    },
                                }}
                                size={size}
                                multiple
                                id="tags-outlined"
                                options={tags}
                                getOptionLabel={(o) => o.title}
                                filterSelectedOptions
                                onChange={(e, val) => handleChange(e, field, val)}
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
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="stretch" spacing={1}>
                                        {TimePicker.map((s) => (
                                            <Grid item lg={6} md={6} sm={6} key={s.day}>
                                                <TimeSelector label={s.day} type={s.type} times={OT[s.timeref] || null}
                                                    timeref={s.timeref} setTimes={setTimes} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Collapse>
                            </>}
                        {type === 'toggle' &&
                            <Switch
                                checked={values[field]}
                                onChange={(e) => handleChange(e, field, type)}
                                inputProps={{ 'aria-label': title }}
                            />
                        }
                    </FormControl>
                </Grid>
            )}
            <div style={{ marginTop: 10, marginLeft: 15, display: 'flex', justifyContent: 'left', width: '100%' }}>
                <Button
                    style={{ width: 200 }}
                    size="large"
                    // disabled={!isFulfilled}
                    variant="contained"
                    color="primary"
                    onClick={() => modify(type, init.id)}>
                    {term(type)}
                </Button>
            </div>
        </Grid>
    )
}
