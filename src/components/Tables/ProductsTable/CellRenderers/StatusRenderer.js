import React from 'react'
import ENTITY_STATUS from '../../../../data/entity_status'
import term from '../../../../terms'

const getColorValue = (props) => {
    switch (props.value) {
        case ENTITY_STATUS.PENDING_APPROVAL:
            return 'orange'
        case ENTITY_STATUS.PUBLIC:
            return 'green'
        case ENTITY_STATUS.PRIVATE:
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