import React from 'react'
import PageTitle from '../../components/PageTitle/PageTitle'
import AGTable from '../../components/Tables/AGTable';
import term from '../../terms';

const Voucher = () => {
    return (
        <div >
            <PageTitle title={term('voucher')} />
            <AGTable display={'events'} />
        </div>
    )
}



export default Voucher;
