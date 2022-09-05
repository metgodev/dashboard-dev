import React, { useCallback } from 'react'
import { Box, Modal } from '@material-ui/core'
import term from '../../terms';

function ProfileModal({ open, setOpen, user }) {

    const handleClose = useCallback(() => {
        setOpen(false)
    }, [])

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ borderRadius: '10px', flexDirection: 'column', paddingTop: '40px', display: 'flex', alignItems: 'center', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70vw', height: '70%', backgroundColor: 'white' }}>
                    <p style={{ fontWeight: 'bold', fontSize: '20px' }}>{term('profile')}</p>
                    <img style={{ width: '250px', height: '250px', borderRadius: '50%' }} src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' />
                    <p>Name</p>
                    <p>{user?.email}</p>
                </div>
            </Box>
        </Modal>
    )
}

export default ProfileModal