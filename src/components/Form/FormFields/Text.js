import React from 'react'

function Text({ title }) {
    return (
        <p style={{ margin: 0, fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{title}</p>
    )
}

export default Text