import React from 'react'
import { Switches } from 'mui-rff'

function Checkbox({ field, title }) {
    return (
        <Switches
            key={field}
            name={field}
            required={true}
            data={{ label: title, value: true }}
        />
    )
}

export default Checkbox