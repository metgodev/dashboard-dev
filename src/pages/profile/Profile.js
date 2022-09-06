import React from 'react'
import { Box } from '@material-ui/core'
import { useSelector } from 'react-redux'
import term from '../../terms'
import PageTitle from '../../components/PageTitle/PageTitle'

function Profile() {

    const userDetails = useSelector(s => s.userReducer.userDetails)

    return (
        <Box style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100vh' }} >
            <Box style={{ position: 'absolute', top: 15, right: 105 }}>
                <PageTitle title={term('profile')} />
            </Box>
            <Box style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'column', height: '60vh'
            }}>
                <img style={{ width: '250px', height: '250px', borderRadius: '50%' }} src='https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg' />
                <p>Name</p>
                <p>{userDetails?.email}</p>
            </Box>
        </Box >
    )
}

export default Profile