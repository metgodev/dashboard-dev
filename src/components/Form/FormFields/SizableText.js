import React from 'react'
import { TextareaAutosize } from '@mui/material'
import term from '../../../terms'

function SizableText({ field, classes, resizableText, setResizableText }) {
    return (
        <TextareaAutosize
            aria-label={field}
            style={{ height: '200px', fontSize: '16px', paddingTop: '10px', overflowY: 'hidden' }}
            className={classes.resizeTextField}
            placeholder={term('description')}
            value={resizableText}
            minRows={3}
            onChange={(e) => { setResizableText(e.target.value) }}
        />
    )
}

export default SizableText