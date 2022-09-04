import React, { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { gridOptions } from './productsTableConfig'
import { CircularProgress } from '@mui/material';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community';


const AgTableProducts = ({ products }) => {

    const gridRef = useRef();

    const getRowId = useMemo(() => {
        return (params) => {
            return params.data._id;
        };
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%' }}>
            {!products.loading ? <div className='ag-table' style={{ width: '100%', height: '100%' }} >
                <AgGridReact
                    ref={gridRef}
                    rowData={products.data}
                    gridOptions={gridOptions}
                    getRowId={getRowId}
                />
            </div>
                :
                <CircularProgress size={50} />}
        </div>
    )
}

export default React.memo(AgTableProducts)