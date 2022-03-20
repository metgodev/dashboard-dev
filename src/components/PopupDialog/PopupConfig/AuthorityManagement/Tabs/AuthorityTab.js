import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import term from '../../../../../terms';
import { client } from '../../../../../API/metro';
import { ModalInit, picker } from '../popConfig';
import { Button, MenuItem } from '@material-ui/core';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
import CategoryConfig from '../../CategoryConfig'

export const AuthorityTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const [values, setValues] = useState({});

    //set the values
    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('authorities').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('authorities').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {ModalInit.map(({ title, id, field, rows, size, type }) =>
                <Grid item lg={6} md={12} sm={12} xs={12} key={id} >
                    <InputLabel>{title}</InputLabel>
                    <FormControl fullWidth  >
                    <CategoryConfig
                            title={title}
                            id={id}
                            field={field}
                            rows={rows}
                            size={size}
                            type={type}
                            setValues={setValues}
                            values={values}
                            handleChange={handleChange}
                            tab={'authorityManagment'}
                        />
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
        zIndex: 1,
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
}