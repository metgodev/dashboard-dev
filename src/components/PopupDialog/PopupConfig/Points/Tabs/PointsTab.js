import React, { useState, useEffect } from 'react'
import term from '../../../../../terms';
import { client } from '../../../../../API/metro';
import Calendar from '../../../../Calendar/Calendar';
import { ModalInit, tags, picker } from '../popConfig';
import TimeSelector from '../../../../TimePicker/TimePicker';
import { Button, MenuItem, TextareaAutosize } from '@material-ui/core';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { Autocomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import GoogleAutocomplete from '../../../../GoogleAutocomplete/GoogleAutocomplete';
//styles
import useStyles from '../../../styles'

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const PointsTab = ({ handleClose, initialData, type }) => {
    //global
    let classes = useStyles();
    let dispatch = useDispatch();
    //local
    const [init, setInit] = useState({});
    const [values, setValues] = useState({
        userId: user.id,
        addressType: "FREE_TEXT", //  ["WEBSITE_URL", "FREE_TEXT"] 
        relevantTo: "GOLDEN_AGE",
        prefferedSeason: "SUMMER",
        shady: "FULL",
    });
    //validator 
    let isFulfilled = Object.values(values).every(Boolean);

    const handleChange = (e, field, tags) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (field === 'isAccessable') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    useEffect(() => {
        if (type === 'add') setInit({})
        else setInit(initialData)
        return (() => setInit({}))
    }, [type])

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('pois').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('pois').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} style={{ paddingBottom: 50 }}>

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
