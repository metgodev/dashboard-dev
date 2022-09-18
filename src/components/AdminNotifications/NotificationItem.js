import React from 'react'
import { Button } from '@material-ui/core'

function NotificationItem({ text, onClick }) {
    return (
        <Button
            onClick={onClick}
            variant='outlined'
            style={{ minWidth: '300px' }}
        >
            {text}
        </Button>
    )
}

export default NotificationItem