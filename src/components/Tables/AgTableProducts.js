import { useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-community';
import term from '../../terms';

const AgTableProducts = () => {

    const [rowData] = useState([
        { image: "Toyota", name: "חמוצים", description: 'אחלה חמוצים', category: 'אוכל', tags: 'אוכל', created_at: '10.10.22', status: "PENDING_APPROVAL" },
        { image: "Toyota", name: "שידה", description: 'שידת איפור', category: 'מוצרים לבית', tags: 'תגיות', created_at: '10.10.22', status: "PENDING_APPROVAL" },
    ]);

    const [columnDefs] = useState([
        { headerName: term('status'), field: 'status', resizable: true },
        { headerName: term('image'), field: 'image', resizable: true },
        { headerName: term('name'), field: 'name', resizable: true },
        { headerName: term('description'), field: 'description', resizable: true },
        { headerName: term('category'), field: 'category', resizable: true },
        { headerName: term('tags'), field: 'tags', resizable: true },
        { headerName: term('created_at'), field: 'created_at', resizable: true },
    ])

    const gridOptions = {
        columnDefs: columnDefs,
        enableRtl: true,
    }

    return (
        <div className="ag-theme-alpine" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: "100%", width: '100%' }}>
            <div className='ag-table' style={{ width: '90%', height: '100%' }} >
                <AgGridReact
                    rowData={rowData}
                    gridOptions={gridOptions}
                />
            </div>
        </div>
    )
}

export default AgTableProducts