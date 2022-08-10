import React, { useState, useRef, useCallback, useEffect } from 'react'
import { gridOptions, idOptions, ignore } from '../../utils/ag_table_config';
import { AgGridReact } from 'ag-grid-react';
import client from '../../API/metro';
import { Cols, Keys } from './TableKeys';
import { useSelector } from 'react-redux';
import useGetService from '../../hooks/useGetService';
import toast from 'react-hot-toast';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';
import term from '../../terms';

const AGTable = ({ display, action, setExportToExcel, selectedColumn, setSelectedColumn }) => {

    const gridRef = useRef();

    const [rowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);
    const [loading, setLoading] = useState(false);

    const tableChanged = useSelector(state => state.mainReducer.tableChanged)
    const area = useSelector(s => s.mainRememberReducer.area)

    const requestParams = { areaId: area.id.toString(), $limit: 1000, $sort: { createdAt: -1 } }

    let pageData = useGetService(display, display, requestParams, area, false)

    useEffect(() => {
        setLoading(true)
        if (setExportToExcel !== undefined) {
            setExportToExcel(() => exportToXl)
        }
        if (Object.keys(selectedColumn).length === 0) {
            setColumnDefs([])
            setRowData([])
            onGridReady();
            setLoading(false)
        }
        else if (Object.keys(selectedColumn).length !== 0 && pageData.data.length > 0) {
            onChangeRow()
            setLoading(false)
        }
        return () => {
            pageData.cancelRequest();
            setLoading(false)
        }
    }, [area, tableChanged, pageData])

    const onUpdate = useCallback(async (params) => {
        try {
            let res = await client.service(display).patch(params?.data?._id, params?.data)
            gridRef.current.api.updateRowData({ update: [res] });
        } catch (e) {
            console.log(e)
            errorToast()
        }
    }, [tableChanged]);

    const getRowId = useCallback(params => {
        return params.data._id;
    }, []);

    const exportToXl = () => {
        gridRef?.current?.api?.exportDataAsCsv({ fileName: `${display}.csv` });
    }

    const onChangeRow = useCallback(async () => {
        try {
            let res = await client.service(display).find({ query: { _id: selectedColumn.data._id } })
            if (res) {
                gridRef.current.api.getRowNode(selectedColumn.data._id).setData(res.data[0])
            }
        } catch (e) {
            console.log(e)
            errorToast()
        } finally {
            setSelectedColumn([])
        }
    }, [tableChanged])

    const errorToast = () => toast(term("something_went_wrong"));

    const onGridReady = () => {
        if (pageData.data.length > 0) {
            let cols = Cols(pageData.data[0], ignore);
            let keys = Keys(cols, idOptions, display, onUpdate);
            setRowData(pageData.data.map(item => {
                let newItem = { ...item };
                if (item.tag && item.category) {
                    newItem = { ...newItem, tag: item?.tag?.title, category: term(item?.category?.title) };
                }
                return newItem;
            }));
            setColumnDefs(keys);
        }
    }

    return (
        <div className="ag-theme-alpine" style={{ width: '99.7%' }}>
            <div className='ag-table' style={{ width: '100%', height: window.innerHeight - 120, direction: 'rtl' }} >
                {loading ? <></> : <AgGridReact
                    onGridReady={onGridReady}
                    // listen to changes in the table
                    onCellDoubleClicked={(event) => {
                        setSelectedColumn(event)
                        action(event.data, setSelectedColumn)
                    }}
                    columnDefs={columnDefs}
                    rowData={rowData}
                    rowSelection='multiple'
                    rowDragManaged={true}
                    getRowId={getRowId}
                    getRowNodeId={getRowId}
                    ref={gridRef}
                    gridOptions={gridOptions}
                    suppressColumnVirtualisation={true}
                    suppressRowVirtualisation={true}
                    debounceVerticalScrollbar={true}
                />}
            </div>
        </div>
    )
}



export default AGTable;