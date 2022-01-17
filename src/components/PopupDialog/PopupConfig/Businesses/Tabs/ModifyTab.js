import React, { useState } from 'react'
import term from '../../../../../terms';
import { Button } from '@material-ui/core';
import { Collapse, MenuItem } from '@material-ui/core';
import { ModalInit, tags, picker, TimePicker } from '../../popConfig';
import { Autocomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
import TimeSelector from '../../../../TimePicker/TimePicker';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
//styles
import useStyles from '../../../styles'

export const ModifyTab = ({ initialData, type }) => {
    let classes = useStyles();
    let OT = initialData.openingHours && JSON.parse(initialData.openingHours) || {}
    let OC = initialData.contact && JSON.parse(initialData.contact) || {}

    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        name: '',
        description: '',
        status: 'PRIVATE',
        tagsIds: [],
        autorityId: '',
        address: '',
        phoneNumber: '',
        contactPersonName: '',
        contactPersonPhoneNumber: '',
        emailAddress: '',
        relevantTo: '',
        websiteUrl: '',
        facebookPageUrl: '',
        instagramPageUrl: '',
        youtubePageUrl: '',
        twitterPageUrl: '',
        linkedInPageUrl: '',
        openingHours: {},
        open24Hours: null,
    });

    const handleChange = (e, field, tags) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (field === 'open24Hours') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const openDrop = () => {
        setOpen(!open);
    };

    return (
        <Grid container spacing={2}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size, type }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {type === 'textfield' &&
                            <TextField
                                InputProps={{
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
                                defaultValue={initialData[field]}
                                onChange={(e) => handleChange(e, field)}
                            />}
                        {type === 'picker' &&
                            <TextField
                                InputProps={{
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
                                        {s.value}
                                    </MenuItem>
                                ))}
                            </TextField>}
                        {type === 'tagsPicker' &&
                            <Autocomplete
                                InputProps={{
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
                            <>
                                <Button variant="outlined" size={'large'} color="primary" onClick={openDrop} style={{ marginBottom: 10 }} >
                                    {open ? <ExpandLess /> : <ExpandMore />}
                                </Button>
                                <Collapse in={open} timeout="auto" unmountOnExit>
                                    <Grid container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="stretch" spacing={1}>
                                        {TimePicker.map((s) => (
                                            <Grid item lg={6} md={6} sm={6} key={s}>
                                                <TimeSelector label={s.day} type={s.type} times={OT[s.timeref]} />
                                            </Grid>
                                        ))}
                                    </Grid>
                                </Collapse>
                            </>}
                        {type === 'toggle' &&
                            <Switch
                                checked={values[field]}
                                onChange={(e) => handleChange(e, field)}
                                inputProps={{ 'aria-label': title }}
                            />
                        }
                    </FormControl>
                </Grid>
            )}
            <Button
                variant="contained"
                style={{ marginTop: 10 }}
                color="primary"
                onClick={() => { console.log(values) }}>
                {term(type)}
            </Button>
        </Grid>
    )
}
