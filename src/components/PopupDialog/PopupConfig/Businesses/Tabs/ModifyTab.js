import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import term from '../../../../../terms';
import { client } from '../../../../../API/metro';
import { ModalInit, tags, picker, TimePicker } from '../popConfig';
import { Button, Collapse, MenuItem } from '@material-ui/core';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { Autocomplete as MuiAutomplete, FormControl, Grid, InputLabel, TextField, Switch } from '@mui/material';
import CategoryConfig from '../../CategoryConfig'
//styles
import useStyles from '../../../styles';

let { user } = JSON.parse(localStorage.getItem('@@remember-mainRememberReducer')) || {}

export const ModifyTab = ({ handleClose, initialData, type }) => {
    //global
    const dispatch = useDispatch()
    let classes = useStyles();
    let status = type === 'edit' ? initialData.status : 'PENDING_APPROVAL'
    //local
    let initState = {
        userId: user.id,
        status: status,
        openingHours: {
            sunday: {},
            monday: {},
            tuesday: {},
            wednesday: {},
            thursday: {},
            friday: {},
            saturday: {},
        },
    }
    const openDrop = () => setOpen(!open);
    const [checked, setChecked] = useState([]);
    const [init, setInit] = useState({});
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState(initState);

    useEffect(() => {
        setValues(initState);
        if (Object.keys(initialData).length === 0) return;
        let OC = initialData.contact && JSON.parse(initialData.contact) || {}
        let OH = initialData.openingHours && JSON.parse(initialData.openingHours) || {}
        setInit({ ...initialData, phoneNumber: OC[0].whatsapp, contactPersonPhoneNumber: OC[1].phone, email: OC[2].email })
        setValues(prevState => ({ ...prevState, openingHours: OH }))
        return (() => setInit({}))
    }, [type, initialData])

    //set the values
    const handleChange = (e, field, tags, type) => {
        if (tags) setValues(prevState => ({ ...prevState, [field]: Object.keys(tags).map(key => tags[key].id) }));
        else if (type === 'toggle') setValues(prevState => ({ ...prevState, [field]: e.target.checked }));
        else setValues(prevState => ({ ...prevState, [field]: e.target.value }));
    };

    //set the time
    const setTimes = (times, field, type) => {
        let pos = type === 1 ? 'start' : 'end'
        setValues(prevState => ({ ...prevState, openingHours: { ...prevState.openingHours, [field]: { ...prevState.openingHours[field], [pos]: times } } }))
    };
    const removeDay = (timeRef, e) => {
        if (e.target.checked) return;
        setValues(prevState => ({ ...prevState, openingHours: { ...prevState.openingHours, [timeRef]: { start: "00:00", end: "00:00" } } }))
    }

    const modify = async (type, id) => {
        if (type === 'add')
            client.service('business').create(values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
        else
            client.service('business').patch(id, values)
                .then(() => dispatch(set_table_changed(type)))
                .then(() => handleClose(false))
    }

    let maxSizeElements = ['MapPicker', 'timePicker']
    return (
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            {ModalInit.map(({ title, id, field, rows, size, type }) =>
                <Grid item lg={maxSizeElements.indexOf(type) > -1 ? 12 : 6} md={12} sm={12} xs={12} key={id} >
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
                            tab={'businesses'}
                            openDrop={openDrop}
                            open={open}
                            setTimes={setTimes}
                            removeDay={removeDay}
                            setChecked={setChecked}
                            checked={checked}
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