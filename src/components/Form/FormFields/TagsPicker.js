import React from 'react'
// import { Autocomplete } from 'mui-rff'
import Autocomplete from '@mui/material/Autocomplete';
import { Box, Checkbox } from '@material-ui/core'
import { GetTagColor } from '../FormFunctions'
import { Chip, TextField } from '@mui/material'
import ERRORS from '../../../data/errors'
import Toast from '../../../utils/useToast'
import Helper from './Helper';

function TagsPicker({ title, field, options, values, setValues, tooltip }) {

    const handleRenderTags = (tagValue, getTagProps, y) => {
        return tagValue.map((option, index) => {
            return (
                <Chip
                    style={{
                        border: index === 0 ? `2px solid #01A1FC` : `1px solid grey`,
                        padding: '10px',
                        backgroundColor: GetTagColor(option.category),
                    }}
                    {...getTagProps({ index })}
                    label={option.label}
                />
            )
        });
    }

    const handleMuiRenderTags = (params) => (
        <Box>
            {tooltip && <Helper tooltip={tooltip} />}
            <TextField
                {...params}
                variant="outlined"
                label={title}
            />
        </Box>
    )

    const isOptionEqualToValue = (option, value) => {
        if (option.value === value.value) {
            return true
        } else {
            return false
        }
    }

    const handleRenderOption = (props, option, { selected }) => {
        return (
            < Box onClick={() => Toast(ERRORS.MAIN_TAG, {
                duration: 4000,
                style: { fontSize: '16px', fontWeight: 'bold' },
                position: 'top-center',
            })
            }>
                <li {...props}>
                    <Checkbox
                        style={{ marginRight: 8 }}
                        checked={selected}
                    />
                    {option.label}
                </li>
            </Box >
        )
    }

    const handleOptions = options.map((item) => {
        return (
            {
                label: item.title,
                value: item.id,
                category: item.category
            }
        )
    })

    const handleChange = (event, values) => {
        setValues(prev => ({ ...prev, [field]: values }))
    }

    return (
        <Autocomplete
            label={title}
            name={field}
            multiple={true}
            variant="outlined"
            options={handleOptions}
            defaultValue={values}
            onChange={(event, values) => handleChange(event, values)}
            isOptionEqualToValue={isOptionEqualToValue}
            renderInput={handleMuiRenderTags}
            renderTags={handleRenderTags}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            disableCloseOnSelect={true}
            renderOption={handleRenderOption}
        />
    )
}

export default React.memo(TagsPicker)