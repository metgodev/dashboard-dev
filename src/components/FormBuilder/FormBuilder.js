import React, { useState } from 'react'
import term from '../../terms';
import TimeSelector from '../TimePicker/TimePicker';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { Button, Collapse, MenuItem } from '@material-ui/core';
import GoogleAutocomplete from '../GoogleAutocomplete/GoogleAutocomplete';
import { Autocomplete as MuiAutomplete, Grid, InputLabel, TextField, Switch, Tabs, Tab } from '@mui/material';
import MapPick from '../MapPicker.js/MapPick';
import Calendar from '../Calendar/Calendar';
import VerticalTabPannel from '../TabPanel/VerticalTabPannel';
import { Box } from '@mui/system';
import { useSelector } from 'react-redux';

let tabs = [{
    value: term('general'),
}, {
    value: term('map_location'),
}];


const FormBuilder = ({ handleChange, ModalInit, values, tags, picker, TimePicker, init, type, ...props }) => {
    const [tab, setTab] = useState(0);

    const handleTabs = (event, newValue) => {
        setTab(newValue);
    };
    const { mobile } = useSelector(s => s.mainReducer)
    return (
        <>
            <Box sx={{ flexGrow: 1, display: 'flex', height: '100%' }} >
                <Box sx={{ position: 'absolute' }} >
                    {mobile && <Tabs value={tab} onChange={handleTabs} aria-label="vertical-tabs" variant="fullWidth" scrollButtons="auto" orientation="vertical">
                        {tabs.map(b => <Tab key={b.value} label={b.value} />)}
                    </Tabs>}
                </Box>
                <Box sx={{ paddingRight: mobile ? 18 : 0, paddingBottom: 3 }} >
                    <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 3, md: 5 }} >
                        {ModalInit.map(({ title, id, field, rows, size, type }) =>
                            <Grid item md={props.maxSizeElements?.indexOf(type) > -1 ? 12 : 6} sm={12} xs={12} key={id} >
                                <VerticalTabPannel value={tab} index={0} >
                                    {type === 'textfield' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <TextField
                                                fullWidth
                                                size={size}
                                                id={title}
                                                label={title}
                                                placeholder={title}
                                                multiline
                                                rows={rows}
                                                defaultValue={init[field] || ''}
                                                onChange={(e) => handleChange(e, field)}
                                                error={values[field] === ''}
                                            />
                                        </>
                                    }
                                    {type === 'picker' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <TextField
                                                fullWidth
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
                                            </TextField>
                                        </>
                                    }
                                    {type === 'tagsPicker' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <MuiAutomplete
                                                size={size}
                                                multiple
                                                id="tags-outlined"
                                                options={tags}
                                                getOptionLabel={(o) => o.title}
                                                filterSelectedOptions
                                                onChange={(e, val) => handleChange(e, field, val)}
                                                renderInput={(params) => (
                                                    <TextField
                                                        fullWidth
                                                        {...params}
                                                        label={title}
                                                        placeholder={title}
                                                        error={values[field]?.length > 4 || false}
                                                    />
                                                )}
                                            />
                                        </>
                                    }
                                    {type === 'timesPicker' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <Button fullWidth variant="outlined" size={'large'} color="primary"
                                                onClick={props.openDrop} style={{ marginBottom: 10 }} >
                                                {props.open ? <ExpandLess /> : <ExpandMore />}
                                            </Button>
                                            <Collapse in={props.open} timeout="auto" unmountOnExit>
                                                <Grid container spacing={1}>
                                                    {TimePicker?.map((s) => (
                                                        <Grid item lg={6} md={6} sm={6} key={s.day}>
                                                            <TimeSelector label={s.day} type={s.type} times={values.openingHours[s.timeref] || {}}
                                                                timeref={s.timeref}
                                                                setTimes={props.setTimes}
                                                                removeDay={props.removeDay}
                                                                setChecked={props.setChecked}
                                                                checked={props.checked} />
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Collapse>
                                        </>}
                                    {type === 'timePicker' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <TimeSelector label={title} setTime={props.setDateTime} field={field} />
                                        </>
                                    }
                                    {type === 'datePicker' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <Calendar type={2} setDateTwo={props.setDateTime} field={field} />
                                        </>
                                    }
                                    {type === 'toggle' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <Switch
                                                defaultValue={init[field] || false}
                                                checked={values[field] || false}
                                                onChange={(e) => handleChange(e, field, undefined, type)}
                                                inputprops={{ 'aria-label': title }}
                                            />
                                        </>
                                    }
                                </VerticalTabPannel>
                                <VerticalTabPannel value={tab} index={!mobile ? 0 : 1} >
                                    {type === 'MapPicker' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <MapPick setFatherValue={props.setValues} />
                                        </>
                                    }
                                    {type === 'googleAutocomplete' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <GoogleAutocomplete setFatherValue={props.setValues} field={field} />
                                        </>
                                    }
                                    {type === 'locationName' &&
                                        <>
                                            <InputLabel>{title}</InputLabel>
                                            <TextField
                                                fullWidth
                                                size={size}
                                                id={title}
                                                label={title}
                                                placeholder={title}
                                                multiline
                                                rows={rows}
                                                defaultValue={init[field] || ''}
                                                onChange={(e) => handleChange(e, field)}
                                                error={values[field] === ''}
                                            />
                                        </>
                                    }
                                </VerticalTabPannel>
                            </Grid>
                        )}
                        <div style={styles.ButtomLeftCornerButton}>
                            <Button
                                style={{ width: 200 }}
                                size="large"
                                variant="contained"
                                color="primary"
                                onClick={() => props.modify(type, init.id)}>
                                {term(type)}
                            </Button>
                        </div>
                    </Grid>
                </Box>
            </Box >
        </>
    )
}

export default FormBuilder


const styles = {
    ButtomLeftCornerButton: {
        zIndex: 1,
        position: 'absolute',
        bottom: '10px',
        left: '10px',
    },
}

