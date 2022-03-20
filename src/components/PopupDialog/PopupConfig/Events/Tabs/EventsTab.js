import React, { useState, useEffect } from 'react'
import term from '../../../../../terms';
import { useDispatch } from 'react-redux';
import { client } from '../../../../../API/metro';
import { ModalInit } from '../popConfig';
import { Button } from '@material-ui/core';
import { FormControl, Grid, InputLabel } from '@mui/material';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import CategoryConfig from '../../CategoryConfig'

export const EventsTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    //local
    const openDrop = () => setOpen(!open);
    const [open, setOpen] = useState(false);
    const [init, setInit] = useState({});
    const [values, setValues] = useState({});

    useEffect(() => {
        if (type === 'add') setInit({})
        else setInit(initialData)
        return (() => setInit({}))
    }, [type])

    const handleChange = (e, field, tagsIds) => {
        if (tagsIds) setValues(prevState => ({ ...prevState, [field]: Object.keys(tagsIds).map(key => tagsIds[key].id) }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    const setDateTime = (time, field) => setValues(prevState => ({ ...prevState, [field]: new Date(time) }));

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('events').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('events').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {ModalInit.map(({ title, id, field, rows, maxRows, size, type }) =>
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
                            init={init}
                            values={values}
                            handleChange={handleChange}
                            tab={'events'}
                            open={open}
                            setOpen={setOpen}
                        />
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
                    onClick={() => modify(type, init.id)}>
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