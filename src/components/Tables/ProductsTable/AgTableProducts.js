import { useEffect, useRef, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { gridOptions, rowData } from './productsTableConfig'

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community';


const AgTableProducts = ({ products }) => {

    const gridRef = useRef();
    const [columns, setColumns] = useState(null)

    useEffect(() => {
        if (gridRef?.current?.api?.sizeColumnsToFit !== undefined) {
            gridRef.current.api.sizeColumnsToFit();
        } else {
            setColumns(prev => !prev)
        }
    }, [columns])

    return (
        <div className="ag-theme-alpine" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%' }}>
            <div className='ag-table' style={{ width: '100%', height: '100%' }} >
                <AgGridReact
                    ref={gridRef}
                    rowData={rowData}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    )
}

export default AgTableProducts