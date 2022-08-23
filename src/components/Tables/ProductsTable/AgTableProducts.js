import { useRef, useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { gridOptions } from './productsTableConfig'

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community';


const AgTableProducts = ({ products }) => {

    const gridRef = useRef();

    const getRowId = useMemo(() => {
        return (params) => {
            return params.data.id;
        };
    }, []);

    return (
        <div className="ag-theme-alpine" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%' }}>
            <div className='ag-table' style={{ width: '100%', height: '100%' }} >
                {products.length > 0 && <AgGridReact
                    ref={gridRef}
                    rowData={products}
                    gridOptions={gridOptions}
                    getRowId={getRowId}
                />}
            </div>
        </div>
    )
}

export default AgTableProducts