import React from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'
import term from '../../terms';
import giv_tav from '../../Assets/placeholders/give_tav.png'

const Voucher = () => {
    return (
        <div >
            <PageTitle title={term('voucher')} />
            <img src={giv_tav} alt="give_tav" style={{ width: '100%', height: '100%' }} />
        </div>
    )
}



export default Voucher;
