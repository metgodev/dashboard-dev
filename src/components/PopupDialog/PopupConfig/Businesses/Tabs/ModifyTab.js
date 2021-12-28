import React, { useState } from 'react'
import { Box } from '@mui/system';
import term from '../../../../../terms';
import { Button } from '../../../../Wrappers/Wrappers';
import { MenuItem } from '@material-ui/core';
import { ModalInit, tags, picker } from '../popConfig';
import { Autocomplete, FormControl, Grid, InputLabel, TextField } from '@mui/material';

export const ModifyTab = ({ initialData, type }) => {
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


    const handleChange = (e, key, tags) => {
        if (tags) {
            setValues(prevState => ({ ...prevState, [key]: Object.keys(tags).map(key => tags[key].id) }));
        } else setValues(prevState => ({ ...prevState, [key]: e.target.value }));
    };

    return (
        <Grid container spacing={2}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {!(['tags', 'suitableFor', 'authority'].indexOf(field) > - 1) ?
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
                            : field !== 'tags' ?
                                <TextField
                                    size={size}
                                    id="outlined-select-currency"
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
                                :
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
                        }
                    </FormControl>
                </Grid>
            )}
            <Button
                style={{ marginTop: 10 }}
                color="primary"
                onClick={() => { console.log('edit') }}>
                {term(type)}
            </Button>
        </Grid>
    )
}
