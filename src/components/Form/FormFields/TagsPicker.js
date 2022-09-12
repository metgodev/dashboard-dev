import React from 'react'
import { Autocomplete } from 'mui-rff'
import { Box, Checkbox } from '@material-ui/core'
import { getTagColor } from '../FormFunctions'
import { Chip } from '@mui/material'
import ERRORS from '../../../data/errors'
import Toast from '../../../utils/useToast'

function TagsPicker({ title, field, options }) {
    return (
        <Autocomplete
            label={title}
            name={field}
            multiple={true}
            variant="outlined"
            options={
                options[field].map((item) => ({
                    label: item.title,
                    value: item.id,
                }))
            }
            isOptionEqualToValue={(option, value) => {
                if (option.value === value.value) {
                    return true
                } else {
                    return false
                }
            }}
            renderTags={(tagValue, getTagProps, y) => {
                return tagValue.map((option, index) => {
                    return (
                        <Chip
                            style={{
                                border: index === 0 ? `2px solid #01A1FC` : `1px solid grey`,
                                padding: '10px',
                                backgroundColor: `${getTagColor(options?.tagsIds?.find(tag => tag.id === option.value)?.category)}`,
                            }}
                            {...getTagProps({ index })}
                            label={option.label}
                        />
                    )
                });
            }}
            getOptionValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            disableCloseOnSelect={true}
            renderOption={(props, option, { selected }) => (
                <Box onClick={() => Toast(ERRORS.MAIN_TAG, {
                    duration: 4000,
                    style: { fontSize: '16px', fontWeight: 'bold' },
                    position: 'top-center',
                })}>
                    <li {...props}>
                        <Checkbox
                            style={{ marginRight: 8 }}
                            checked={selected}
                        />
                        {option.label}
                    </li>
                </Box>
            )}
        />
    )
}

export default TagsPicker