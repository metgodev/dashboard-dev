import React, { useState } from 'react'
import term from '../../../../../terms';
import { Button } from '@material-ui/core';
import { Collapse, MenuItem } from '@material-ui/core';
import { ModalInit, tags, picker, TimePicker } from '../../popConfig';
import { Autocomplete, FormControl, Grid, IconButton, InputLabel, TextField } from '@mui/material';
import TimeSelector from '../../../../TimePicker/TimePicker';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const ModifyTab = ({ initialData, type }) => {
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({
        bussinesName: '',
        suitableFor: '',
        authority: '',
        address: '',
        tags: [],
        description: '',
        openingTimes: '',
        contactNumber: '',
        phoneNumber: '',
        websiteLink: '',
        bussinesPhone: '',
        email: '',
    });

    const handleChange = (e, field, tags) => {
        if (tags) {
            setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        } else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const openDrop = () => {
        setOpen(!open);
    };

    console.log(values)
    return (
        <Grid container spacing={2}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {!(['tags', 'suitableFor', 'authority', 'openingTimes'].indexOf(field) > - 1) ?
                            <TextField
                                size={size}
                                id={title}
                                label={title}
                                placeholder={title}
                                multiline
                                rows={rows}
                                maxRows={maxRows}
                                defaultValue={initialData[field]}
                                onChange={(e) => handleChange(e, field)}
                            />
                            : !(['tags', 'openingTimes'].indexOf(field) > - 1) ?
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
                                            {s.value}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                : field !== 'openingTimes' ?
                                    <Autocomplete
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
                                    />
                                    :
                                    <>
                                        <Button variant="outlined" size={'large'} color="warning" onClick={openDrop} sx={{ mb: 1 }}>
                                            {open ? <ExpandLess /> : <ExpandMore />}
                                        </Button>
                                        <Collapse in={open} timeout="auto" unmountOnExit>
                                            <Grid container
                                                direction="row"
                                                justifyContent="center"
                                                alignItems="stretch" spacing={1}>
                                                {TimePicker.map((s) => (
                                                    <Grid item lg={6} md={6} sm={6} key={s}>
                                                        <TimeSelector label={s.day} type={s.type} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                        </Collapse>
                                    </>
                        }
                    </FormControl>
                </Grid>
            )}
            <Button
                variant="contained"
                style={{ marginTop: 10 }}
                color="primary"
                onClick={() => { console.log('edit') }}>
                {term(type)}
            </Button>
        </Grid>
    )
}
