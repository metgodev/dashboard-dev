import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import term from '../../../../../terms';
import { client } from '../../../../../API/metro';
import { ModalInit } from '../popConfig';
import { Button } from '@material-ui/core';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { FormControl, Grid, InputLabel } from '@mui/material';
import CategoryConfig from '../../CategoryConfig'

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const TagsTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const [values, setValues] = useState({
        userId: user.id,
    });

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
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            await client.service('tags').patch(id, values)
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
                            tab={'tagsManagment'}
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