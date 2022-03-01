import React, { useEffect, useState } from 'react'
import term from '../../terms'
import { Box, Divider, FormControl, InputLabel, MenuItem, TextField } from '@mui/material'
import { Grid } from "@material-ui/core";
import PageTitle from '../../components/PageTitle/PageTitle'
import Widget from '../../components/Widget/Widget';
import { add_new_area, add_new_authority, tags } from './adminConfig';
import { Button } from '@material-ui/core';
import { client } from '../../API/metro';
import Notify from '../notifications/Notifications';

const styleBtn = {
    marginTop: 10,
}

const GetForm = ({ data, values, handleChange, form, callAgain }) => {

    let [picker, setPicker] = useState({
        areaId: [],
        categoryId: [],
    })

    useEffect(() => {
        (async () => {
            client.service("area").find().then((res) => {
                res?.data.map(({ name, _id }) => setPicker(pervState => ({ ...pervState, areaId: [...pervState.areaId, { title: name, id: _id }] })))
            })

            client.service("categories").find().then((res) => {
                res?.data.map(({ title, _id }) => setPicker(pervState => ({ ...pervState, categoryId: [...pervState.categoryId, { title, id: _id }] })))
            })
        })();
        return () => {
            setPicker({
                areaId: [],
                categoryId: [],
            })
        }
    }, [callAgain])

    return (
        <>
            {data.map(({ title, id, field, rows, maxRows, size, type }) =>
                <FormControl fullWidth key={id} sx={{ pt: 1 }}>
                    {type === 'textfield' &&
                        <TextField
                            size={size}
                            id={title}
                            label={title}
                            placeholder={title}
                            multiline
                            rows={rows}
                            value={values[field] || ''}
                            maxRows={maxRows}
                            onChange={(e) => handleChange(e, field, form)}
                            error={values[field] === ''}
                        />}
                    {type === 'picker' &&
                        <TextField
                            size={size}
                            id="select-field"
                            select
                            label={title}
                            value={values[field] || ''}
                            onChange={(e) => handleChange(e, field, form)}
                        >
                            {picker[field].map(({ title, id }) => (
                                <MenuItem key={id} value={id}>
                                    {term(title.toLowerCase())}
                                </MenuItem>
                            ))}
                        </TextField>}
                </FormControl>
            )}
        </>
    )
}

const AuthorityManagement = () => {
    let headerBtns = [
        //can get name, func, input, icon ,buttonIcon
        { name: term('manage_users') },
        { name: term('manage_properties') },
    ]

    const [NewArea, setNewArea] = useState({})
    const [NewAuthority, setNewAuthority] = useState({})
    const [NewTag, setNewTag] = useState({})
    const [info, setInfo] = useState({ text: '', id: 0 })

    const handleChange = (e, field, type) => {
        if (type === 'area') {
            setNewArea({ ...NewArea, [field]: e.target.value })
        } else if (type === 'authority') {
            setNewAuthority({ ...NewAuthority, [field]: e.target.value })
        } else {
            setNewTag({ ...NewTag, [field]: e.target.value })
        }
    }

    let isFulfilled = (state) => {
        let isFulfilled;
        for (let key in state) {
            state[key] === '' ? isFulfilled = false : isFulfilled = true
        }
        return isFulfilled
    }

    let heandleSubmit = (type) => {
        if (type === 'area') {
            client.service('area').create(NewArea).then((res) => {
                setNewArea({})
                errHandler(res, type)

            })
        } else if (type === 'authority') {
            client.service('authorities').create(NewAuthority).then((res) => {
                setNewAuthority({})
                errHandler(res, type)
            })
        } else {
            client.service('tags').create(NewTag).then((res) => {
                setNewTag({})
                errHandler(res, type)
            })
        }
    }

    const errHandler = (res, type) => {
        if (!res._id) {
            setInfo({ text: `${term('error_creating')} ${term(type)}`, id: Math.random() })
        } else {
            setInfo({ text: `${term(type)} - ${term('created_successfully')}`, id: Math.random() })
        }
    }

    return (
        <Box>
            <PageTitle buttonGroup={{ btns: headerBtns }} title={term('manage_authorities')} />
            <Divider />
            <Box pt={2} />
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Widget header={term('add_new_area')} disableWidgetMenu >
                        <GetForm data={add_new_area} values={NewArea} handleChange={handleChange} form={'area'} callAgain={info.id} />
                        <Button disabled={!isFulfilled(NewArea)} style={styleBtn} variant="contained" color="primary" onClick={() => heandleSubmit('area')} >{term('add_new_area')}</Button>
                    </Widget>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Widget header={term('add_new_authority')} disableWidgetMenu >
                        <GetForm data={add_new_authority} values={NewAuthority} handleChange={handleChange} form={'authority'} callAgain={info.id} />
                        <Button disabled={!isFulfilled(NewAuthority)} style={styleBtn} variant="contained" color="primary" onClick={() => heandleSubmit('authority')} >{term('add_new_authority')}</Button>
                    </Widget>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                    <Widget header={term('add_tags')} disableWidgetMenu >
                        <GetForm data={tags} values={NewTag} handleChange={handleChange} form={'tags'} callAgain={info.id} />
                        <Button disabled={!isFulfilled(NewTag)} style={styleBtn} variant="contained" color="primary" onClick={() => heandleSubmit('tags')} >{term('add_tags')}</Button>
                    </Widget>
                </Grid>
            </Grid>
            {info.text !== '' && <Notify text={info.text} />}
        </Box>
    )
}

export default AuthorityManagement