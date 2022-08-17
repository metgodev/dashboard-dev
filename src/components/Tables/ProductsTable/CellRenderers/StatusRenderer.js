import React from 'react'
import term from '../../../../terms'

const getColorValue = (props) => {
    switch (props.value) {
        case 'PENDING_APPROVAL':
            return 'orange'
        case 'PUBLIC':
            return 'green'
        case 'PRIVATE':
            return 'red'
    }
}

function StatusRenderer(props) {
    return (
        <div style={{ color: getColorValue(props) }}>
            {term(props.value.toLowerCase())}
        </div>
    )
}

export default StatusRenderer