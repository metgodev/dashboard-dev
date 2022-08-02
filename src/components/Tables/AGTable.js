import React, { useState, useRef, useCallback, useEffect } from 'react'
import { gridOptions, idOptions, ignore } from '../../utils/ag_table_config';
import { AgGridReact } from 'ag-grid-react';
import client from '../../API/metro';
import { Cols, Keys } from './TableKeys';
import { useSelector } from 'react-redux';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';
import term from '../../terms';

const AGTable = ({ display, action }) => {
    const tableChanged = useSelector(state => state.mainReducer.tableChanged)
    const area = useSelector(s => s.mainRememberReducer.area)
    const gridRef = useRef();
    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    const getRowId = useCallback(params => {
        return params.data._id;
    }, []);

    const onUpdate = useCallback(async (params) => {
        try {
            let res = await client.service(display).patch(params.data._id, params.data)
            gridRef.current.api.updateRowData({ update: [res] });
        } catch (e) {
            console.log(e)
        }
    }, []);

    // const exportToXl = useCallback(() => {  
    //     gridRef.current.api.exportDataAsCsv({ fileName: `${display}.csv` });
    // }, []);

    useEffect(() => {
        onGridReady(gridRef.current.api);
    }, [tableChanged, area])

    const onGridReady = useCallback(async () => {
        try {
            const res = await client.service(display).find({
                query: {
                    areaId: area.id.toString(),
                    $limit: 1000,
                    $sort: {
                        createdAt: -1
                    }
                }
            });
            if (res.data) {
                let cols = Cols(res.data[0], ignore);
                let keys = Keys(cols, idOptions, display, onUpdate);
                setRowData(res.data.map(item => {
                    let newItem = { ...item };
                    if (item.tag && item.category) {
                        newItem = { ...newItem, tag: item?.tag?.title, category: term(item?.category?.title) };
                    }
                    return newItem;
                }));
                setColumnDefs(keys);
            }
        } catch (e) {
            console.log(e)
        }
    }, [tableChanged, area]);

    return (
        <div className="ag-theme-alpine" style={{ width: '99.7%' }}>
            <div className='ag-table' style={{ width: '100%', height: window.innerHeight - 120, direction: 'rtl' }} >
                <AgGridReact
                    onGridReady={onGridReady}
                    // listen to changes in the table
                    onCellDoubleClicked={(event) => { action(event.data, 'edit') }}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    rowSelection='multiple'
                    rowDragManaged={true}
                    getRowId={getRowId}
                    getRowNodeId={getRowId}
                    onCellValueChanged={onUpdate}
                    ref={gridRef}
                    gridOptions={gridOptions}
                    suppressColumnVirtualisation={true}
                    suppressRowVirtualisation={true}
                    debounceVerticalScrollbar={true}
                />
            </div>
        </div>
    )
}



export default AGTable;
