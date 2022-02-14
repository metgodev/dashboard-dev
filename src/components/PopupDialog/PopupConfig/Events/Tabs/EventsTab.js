import React, { useState, useEffect } from 'react'
import term from '../../../../../terms';
import { useDispatch } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit, tags, picker } from '../popConfig';
import TimeSelector from '../../../../TimePicker/TimePicker';
import { Button, MenuItem, TextareaAutosize } from '@material-ui/core';
import { Autocomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import Calendar from '../../../../Calendar/Calendar';
import GoogleAutocomplete from '../../../../GoogleAutocomplete/GoogleAutocomplete';
//styles
import useStyles from '../../../styles'

export const EventsTab = ({ imagesArr, handleClose, initialData, type }) => {
    //global
    let classes = useStyles();
    const dispatch = useDispatch()
    //local
    const [init, setInit] = useState({});
    const [values, setValues] = useState({
        galleryFileIds: imagesArr.map((itm) => itm.id) || [],
    });

    //validator 
    let isFulfilled = Object.values(values).every(Boolean);

    useEffect(() => {
        if (type === 'add') setInit({})
        else setInit(initialData)
        return (() => setInit({}))
    }, [type])

    const handleChange = (e, field, tagsIds) => {
        if (tagsIds) setValues(prevState => ({ ...prevState, [field]: Object.keys(tagsIds).map(key => tagsIds[key].id) }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const setDateTime = (time, field) => setValues(prevState => ({ ...prevState, [field]: time }));

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('events').create(values)
                .then(() => dispatch(set_table_changed(type + Math.random())))
                .then(() => handleClose(false))
        else
            client.service('events').patch(id, values)
                .then(() => dispatch(set_table_changed(type + Math.random())))
                .then(() => handleClose(false))
    }

    return (
        <Grid container spacing={2}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size, type }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {type === 'googleAutocomplete' && <GoogleAutocomplete setFatherValue={setValues} field={field} />}
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
                            <TimeSelector label={title} setTime={setDateTime} field={field} />
                        }
                        {type === 'toggle' &&
                            <Switch
                                checked={values[field]}
                                onChange={(e) => handleChange(e, field)}
                                inputProps={{ 'aria-label': title }}
                            />
                        }
                        {type === 'datePicker' &&
                            <Calendar type={2} setDateTwo={setDateTime} field={field} />
                        }
                        {type === 'textArea' &&
                            <TextareaAutosize
                                maxRows={maxRows}
                                aria-label={title}
                                defaultValue={init[field] || ''}
                                fullWidth
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
