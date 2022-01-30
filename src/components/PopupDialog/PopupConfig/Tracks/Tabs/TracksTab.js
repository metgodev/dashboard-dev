import React, { useState } from 'react'
import term from '../../../../../terms';
import { ModalInit, picker } from '../popConfig';
import TimeSelector from '../../../../TimePicker/TimePicker';
import { Button, MenuItem, TextareaAutosize } from '@material-ui/core';
import { FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
import Calendar from '../../../../Calendar/Calendar';
import { client } from '../../../../../API/metro';
import { useDispatch } from 'react-redux';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
//styles
import useStyles from '../../../styles'

export const TracksTab = ({ handleClose, initialData, type }) => {
    //global
    let dispatch = useDispatch()
    let classes = useStyles();
    //local
    const [values, setValues] = useState({ relevantTo: "GOLDEN_AGE" });
    //validator 
    let isFulfilled = Object.values(values).every(Boolean);

    const handleChange = (e, field) => {
        if (field === 'featured') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('pois').create(values)
                .then(() => dispatch(set_table_changed(type + Math.random())))
                .then(() => handleClose(false))
        else
            client.service('pois').patch(id, values)
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
                                defaultValue={initialData[field] || ''}
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
                        {type === 'timePicker' &&
                            <TimeSelector label={title} />
                        }
                        {type === 'toggle' &&
                            <Switch
                                checked={values[field]}
                                onChange={(e) => handleChange(e, field)}
                                inputProps={{ 'aria-label': title }}
                            />
                        }
                        {type === 'datePicker' &&
                            <Calendar type={2} />
                        }
                        {type === 'textArea' &&
                            <TextareaAutosize
                                maxRows={maxRows}
                                aria-label={title}
                                defaultValue={initialData[field] || ''}
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
                    disabled={!isFulfilled}
                    variant="contained"
                    color="primary"
                    onClick={() => modify(type, initialData.id)}>
                    {term(type)}
                </Button>
            </div>
        </Grid>
    )
}
