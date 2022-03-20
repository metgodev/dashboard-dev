import React, { useState, useEffect } from 'react'
import term from '../../../../../terms';
import { client } from '../../../../../API/metro';
import { ModalInit } from '../popConfig';
import { Button } from '@material-ui/core';
import { set_table_changed } from '../../../../../REDUX/actions/main.actions';
import { FormControl, Grid, InputLabel } from '@mui/material';
import { useDispatch } from 'react-redux';
import CategoryConfig from '../../CategoryConfig'
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
                            tab={'points'}
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
