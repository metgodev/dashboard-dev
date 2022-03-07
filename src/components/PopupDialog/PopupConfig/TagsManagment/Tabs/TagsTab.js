import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import term from '../../../../../terms';
import { client } from '../../../../../API/metro';
import { ModalInit, picker, categories } from '../popConfig';
import { Button, MenuItem } from '@material-ui/core';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { Autocomplete as MuiAutomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';


export const TagsTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const [values, setValues] = useState({});

    //set the values
    const handleChange = (e, field, categories, type) => {
        if (categories) setValues(prevState => ({ ...prevState, [field]: Object.keys(categories).map(key => categories[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const modify = async (type, id) => {
        let area_id = localStorage.getItem('aid')
        if (type === 'add')
            await client.service('tags').create(values)
                .then(({ _id }) => client.service('area').patch(area_id, { $push: { tagsIds: _id } }))
                .then(() => dispatch(set_table_changed(type + Math.random())))
                .then(() => handleClose(false))
        else
            await client.service('tags').patch(id, values)
                .then(() => dispatch(set_table_changed(type + Math.random())))
                .then(() => handleClose(false))
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {ModalInit.map(({ title, id, field, rows, size, type }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                        {type === 'textfield' &&
                            <TextField
                                size={size}
                                id={title}
                                label={title}
                                placeholder={title}
                                multiline
                                rows={rows}
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
                                value={values[field] || ''}
                                onChange={(e) => handleChange(e, field)}
                            >
                                {picker[field].map((s) => (
                                    <MenuItem key={s.value} value={s.value}>
                                        {s.name}
                                    </MenuItem>
                                ))}
                            </TextField>}
                        {type === 'tagsPicker' &&
                            <MuiAutomplete
                                size={size}
                                multiple
                                id="categories-outlined"
                                options={categories}
                                getOptionLabel={(o) => o.title}
                                filterSelectedOptions
                                onChange={(e, val) => handleChange(e, field, val)}
                                // disabled={values[field]?.length > 4 || false}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label={title}
                                        placeholder="תגיות"
                                    />
                                )}
                            />}
                        {type === 'toggle' &&
                            <Switch
                                defaultValue={values[field] || false}
                                checked={values[field] || false}
                                onChange={(e) => handleChange(e, field, undefined, type)}
                                inputprops={{ 'aria-label': title }}
                            />
                        }
                    </FormControl>
                </Grid>
            )}
            <div style={styles.ButtomLeftCornerButton}>
                <Button
                    style={{ width: 200 }}
                    size="large"
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
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
}