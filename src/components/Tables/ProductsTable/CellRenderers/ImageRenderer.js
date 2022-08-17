import React from 'react'

function ImageRenderer({ value }) {

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <img style={{ padding: '5px', width: '100%', height: '100%' }} src={value} />
        </div>
    )
}

export default ImageRenderer