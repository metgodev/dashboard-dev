import React from 'react'
import { Button } from '@material-ui/core'

function NotificationItem({ text, onClick }) {
    return (
        <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
            <Button style={{ width: '30vw' }} onClick={onClick} variant='outlined'>{text}</Button>
        </p>
    )
}

export default NotificationItem