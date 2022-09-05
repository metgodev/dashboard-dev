import React from 'react'
import { Button } from '@material-ui/core'

function NotificationItem({ text, buttonText, onClick }) {
    return (
        <p style={{ fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '20px', justifyContent: 'space-between' }}>
            <span>{text}</span>
            <Button style={{ width: '100px' }} onClick={onClick} variant='outlined'>{buttonText}</Button>
        </p>
    )
}

export default NotificationItem