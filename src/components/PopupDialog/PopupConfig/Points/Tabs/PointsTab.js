import React, { useState, useEffect } from 'react'
import term from '../../../../../terms';
import { ModalInit, tags, picker } from '../popConfig';
import TimeSelector from '../../../../TimePicker/TimePicker';
import { Button, MenuItem, TextareaAutosize } from '@material-ui/core';
import { Autocomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
//styles
import useStyles from '../../../styles'
import Calendar from '../../../../Calendar/Calendar';

export const PointsTab = ({ handleClose, initialData, type }) => {
    //global
    let classes = useStyles();
    //local
    const [values, setValues] = useState({
        poiName: "",
        address: "",
        addressType: "FREE_TEXT", //  ["WEBSITE_URL", "FREE_TEXT"] 
        categoriesIds: "",
        relevantTo: "GOLDEN_AGE",
        isAccessable: false,
        description: "",
        websiteUrl: "",
        authorityId: "",
        galleryFileIds: "",
        activitiesInPlace: "",
        exclusiveFor: "",
        prefferedSeason: "SUMMER",
        shady: "FULL",
        arrivalRecommendations: "",
        phoneNumber: "",
        webpageUrl: "",
        contactEmail: ""
    });
    //validator 
    let isFulfilled = Object.values(values).every(Boolean);

    const handleChange = (e, field, tags) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (field === 'isAccessable') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const edit = async () => { }

    const add = async () => { }

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
                                getOptionLabel={(o) => o.id}
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
                    onClick={() => add()}>
                    {term(type)}
                </Button>
            </div>
        </Grid>
    )
}
