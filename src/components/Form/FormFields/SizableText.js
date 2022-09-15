import React from 'react'
import { TextareaAutosize } from '@mui/material'
import term from '../../../terms'
import Helper from './Helper'

function SizableText({ field, classes, resizableText, setResizableText, tooltip }) {

    return (
        <>
            {tooltip && <Helper tooltip={tooltip} />}
            <TextareaAutosize
                aria-label={field}
                style={{ height: '200px', fontSize: '16px', paddingTop: '10px', overflowY: 'hidden' }}
                className={classes.resizeTextField}
                placeholder={term('description')}
                value={resizableText}
                minRows={3}
                onChange={(e) => { setResizableText(e.target.value) }}
            />
        </>
    )
}

export default SizableText