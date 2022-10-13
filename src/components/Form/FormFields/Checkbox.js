import React from 'react'
import { Switches } from 'mui-rff'

function Checkbox({ field, title, disabled }) {

    return (
        <Switches
            key={field}
            name={field}
            required={true}
            data={{ label: title, value: true }}
            disabled={disabled}
        />
    )
}

export default Checkbox