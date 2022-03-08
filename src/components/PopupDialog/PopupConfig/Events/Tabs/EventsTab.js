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

export const EventsTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const [init, setInit] = useState({});
    const [values, setValues] = useState({});

    useEffect(() => {
        if (type === 'add') setInit({})
        else setInit(initialData)
        return (() => setInit({}))
    }, [type])

    const handleChange = (e, field, tagsIds) => {
        if (tagsIds) setValues(prevState => ({ ...prevState, [field]: Object.keys(tagsIds).map(key => tagsIds[key].id) }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const setDateTime = (time, field) => setValues(prevState => ({ ...prevState, [field]: new Date(time) }));

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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size, type }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {type === 'googleAutocomplete' && <GoogleAutocomplete setFatherValue={setValues} field={field} />}
                        {type === 'textfield' &&
                            <TextField
                                size={size}
                                id={title}
                                label={title}
                                placeholder={title}
                                multiline
                                rows={rows}
                                maxRows={maxRows}
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
                            <TimeSelector label={title} setTime={setDateTime} field={field} />
                        }
                        {type === 'toggle' &&
                            <Switch
                                checked={values[field]}
                                onChange={(e) => handleChange(e, field)}
                                inputprops={{ 'aria-label': title }}
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
            <div style={styles.ButtomLeftCornerButton}>
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

const styles = {
    ButtomLeftCornerButton: {
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
}