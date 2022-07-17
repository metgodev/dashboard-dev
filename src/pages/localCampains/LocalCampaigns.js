import React from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'
import term from '../../terms'
import campains from '../../Assets/placeholders/campains.png'

function LocalCampaigns() {
    return (
        <div>
            <PageTitle title={term('local_campaigns')} />
            <img src={campains} alt="campaings" style={{ width: '100%', height: '100%' }} />
        </div>
    )
}

export default LocalCampaigns
