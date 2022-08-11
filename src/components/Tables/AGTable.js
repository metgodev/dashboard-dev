import React, { useState, useRef, useCallback, useEffect } from 'react'
import { gridOptions, idOptions, ignore } from '../../utils/ag_table_config';
import { AgGridReact } from 'ag-grid-react';
import client from '../../API/metro';
import { Cols, Keys } from './TableKeys';
import { useSelector } from 'react-redux';
import useGetService from '../../hooks/useGetService';
import toast from 'react-hot-toast';
import term from '../../terms';
import { _get } from '../../API/service'

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';

const AGTable = ({ display, action, setExportToExcel }) => {


    const gridRef = useRef();
    const tableChanged = useSelector(state => state.mainReducer.tableChanged)
    const area = useSelector(s => s.mainRememberReducer.area)

    let requestParams = { areaId: area.id.toString(), $limit: 1 }
    let pageData = useGetService(display, display, requestParams, area, false)

    const [columnDefs, setColumnDefs] = useState([]);

    const errorToast = () => toast(term("something_went_wrong"));

    useEffect(() => {
        if (setExportToExcel !== undefined) {
            setExportToExcel(() => exportToXl)
        }
        onGridReady()
    }, [pageData])

    useEffect(() => {
        if (columnDefs.length > 0 && columnDefs.length < 9) {
            gridRef.current.api.sizeColumnsToFit()
        }
    }, [columnDefs])

    const onUpdate = useCallback(async (params) => {
        try {
            await client.service(display).patch(params?.data?._id, params?.data)
            params.setStatus(params.data.status)
        } catch (e) {
            errorToast()
        }
    }, [tableChanged]);

    const getRowId = useCallback(params => {
        return params.data._id;
    }, []);

    const exportToXl = () => {
        gridRef?.current?.api?.exportDataAsCsv({ fileName: `${display}.csv` });
    }

    const getSortingParams = (params) => {
        if (params === undefined || params?.sortModel?.length === 0) {
            return { createdAt: -1 }
        } else {
            switch (params?.sortModel[0].sort) {
                case 'asc':
                    return { [params?.sortModel[0].colId]: -1 }
                case 'desc':
                    return { [params?.sortModel[0].colId]: 1 }
            }
        }
    }

    const rows = async (params) => {
        // take a slice of the total rows
        try {
            const rowsThisPage = await _get(display,
                {
                    areaId: area.id.toString(),
                    $limit: params.endRow - params.startRow,
                    $skip: params.startRow,
                    $sort: getSortingParams(params)
                }
            )
            // if on or after the last page, work out the last row.
            let lastRow = -1;
            if (params.endRow >= rowsThisPage.total) {
                lastRow = rowsThisPage.total;
            }
            // call the success callback
            params.successCallback(rowsThisPage.data, lastRow);
        } catch (e) {
            errorToast()
        }
    }

    const onGridReady = useCallback(() => {
        if (gridRef.current.api !== undefined) {
            if (pageData.data.length > 0) {
                let cols = Cols(pageData.data[0], ignore);
                let keys = Keys(cols, idOptions, display, onUpdate);
                setColumnDefs(keys);
            }
            let datasource = {
                rowCount: undefined,
                getRows: rows
            }
            gridRef.current.api.setDatasource(datasource);
        }
    }, [pageData.data, gridRef, area, columnDefs])

    return (
        <div className="ag-theme-alpine" style={{ width: '99.7%' }}>
            <div className='ag-table' style={{ width: '100%', height: window.innerHeight - 120, direction: 'rtl' }} >
                <AgGridReact
                    onGridReady={onGridReady}
                    onCellDoubleClicked={(event) => {
                        action(event.data)
                    }}
                    columnDefs={columnDefs}
                    ref={gridRef}
                    gridOptions={gridOptions}
                    rowModelType={'infinite'}
                    rowBuffer={0}
                    rowSelection={'multiple'}
                    cacheOverflowSize={2}
                    cacheBlockSize={30}
                    maxConcurrentDatasourceRequests={1}
                    infiniteInitialRowCount={1}
                    rowId={getRowId}
                />
            </div>
        </div>
    )
}



export default AGTable;