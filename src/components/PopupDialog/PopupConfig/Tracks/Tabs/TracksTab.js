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
import MapPick from '../../../../MapPicker.js/MapPick';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const TracksTab = ({ handleClose, initialData, type }) => {
    //global
    let dispatch = useDispatch()
    let classes = useStyles();
    //local
    let status = type === 'edit' ? initialData.status : 'PENDING_APPROVAL'
    const [values, setValues] = useState({
        status: status,
        userId: user.id,
        relevantTo: "GOLDEN_AGE"
    });
    //validator 
    let isFulfilled = Object.values(values).every(Boolean);

    const handleChange = (e, field) => {
        if (field === 'featured') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('tracks').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('tracks').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    let maxSizeElements = ['MapPicker']
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ paddingBottom: 50 }}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size, type }) =>
                <Grid item lg={maxSizeElements.indexOf(type) > -1 ? 12 : 6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {type === 'MapPicker' && <MapPick setFatherValue={setValues} />}
                        {type === 'textfield' &&
                            <TextField
                                size={size}
                                id={title}
                                label={title}
                                placeholder={title}
                                multiline
                                rows={rows}
                                maxRows={maxRows}
                                defaultValue={initialData[field] || ''}
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
                        {type === 'timePicker' &&
                            <TimeSelector label={title} />
                        }
                        {type === 'toggle' &&
                            <Switch
                                checked={values[field]}
                                onChange={(e) => handleChange(e, field)}
                                inputprops={{ 'aria-label': title }}
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
            <div style={styles.ButtomLeftCornerButton}>
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

const styles = {
    ButtomLeftCornerButton: {
        zIndex: 1,
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
}