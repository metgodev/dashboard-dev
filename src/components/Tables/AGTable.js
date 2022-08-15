import React, { useState, useRef, useCallback, useEffect } from 'react'
import { Box } from '@mui/system';
import { gridOptions, idOptions, ignore } from './ag_table_config';
import { AgGridReact } from 'ag-grid-react';
import { Cols, Keys } from './TableKeys';
import { useDispatch, useSelector } from 'react-redux';
import useGetService from '../../hooks/useGetService';
import term from '../../terms';
import { _get } from '../../API/service'
import { getRowId, errorToast, updateFunction, exportToExcellFunction, getSortingParams, getFilterParams } from './tableFunctions'

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';
import { set_tags_table_preferences, set_authorities_table_preferences, set_business_table_preferences, set_events_table_preferences, set_points_table_preferences, set_tracks_table_preferences } from '../../REDUX/actions/main.actions';

const AGTable = ({ display, action, setExportToExcel }) => {

    const gridRef = useRef();

    const dispatch = useDispatch()

    const tableChanged = useSelector(state => state.mainReducer.tableChanged)
    const area = useSelector(s => s.mainRememberReducer.area)
    const preferences = useSelector(s => s.mainRememberReducer[`${display}TablePreferences`])

    let requestParams = { areaId: area.id.toString(), $limit: 1 }
    let pageData = useGetService(display, display, requestParams, area, false)
    const authorities = useGetService("authorities", "authorities", { areaId: area.id }, area, false)

    const [columnDefs, setColumnDefs] = useState([]);
    const [totalNumber, setTotalNumber] = useState(0)
    const [columns, setColumns] = useState(null)

    useEffect(() => {
        if (setExportToExcel !== undefined) {
            setExportToExcel(() => exportToXl)
        }
        onGridReady()
    }, [pageData])

    useEffect(() => {
        document.addEventListener('mouseup', dragged)
        return () => {
            document.removeEventListener('mouseup', dragged)
        }
    }, [])

    useEffect(() => {
        if (columnDefs.length > 0 && columnDefs.length < 9) {
            gridRef.current.api.sizeColumnsToFit()
        }
        if (preferences?.length !== 0 && gridRef.current.columnApi !== undefined && columns === null) {
            gridRef.current.columnApi.applyColumnState({
                state: preferences,
                applyOrder: true,
            });
            setColumns(gridRef.current.columnApi.getColumnState())
        }
    }, [columnDefs, preferences])

    async function dragged(e) {
        if (typeof e.target.className === 'string' && e.target.className.includes('MuiButton')) return
        switch (display) {
            case 'authorities':
                dispatch(set_authorities_table_preferences(gridRef.current.columnApi.getColumnState()))
                break;
            case 'tag-categories':
                dispatch(set_tags_table_preferences(gridRef.current.columnApi.getColumnState()))
                break;
            case 'business':
                dispatch(set_business_table_preferences(gridRef.current.columnApi.getColumnState()))
                break;
            case 'events':
                dispatch(set_events_table_preferences(gridRef.current.columnApi.getColumnState()))
                break;
            case 'pois':
                dispatch(set_points_table_preferences(gridRef.current.columnApi.getColumnState()))
                break;
            case 'tracks':
                dispatch(set_tracks_table_preferences(gridRef.current.columnApi.getColumnState()))
                break;
        }
    }

    const onUpdate = useCallback((params) => updateFunction(params, display), [tableChanged]);

    const exportToXl = useCallback(() => {
        exportToExcellFunction(gridRef, display)
    }, [gridRef])

    const rows = async (params) => {
        const filterParams = getFilterParams(params.filterModel, authorities)
        const skip = params.startRow === 0 ? {} : { $skip: params.startRow }
        let valuesToSend = Object.assign({}, filterParams, {
            areaId: area.id.toString(),
            $limit: params.endRow - params.startRow,
            $sort: getSortingParams(params),
        }, skip)
        // take a slice of the total rows
        try {
            const rowsThisPage = await _get(display, valuesToSend)
            setTotalNumber(rowsThisPage.total)
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
            <div className='ag-table' style={{ width: '100%', height: window.innerHeight - 170, direction: 'rtl' }} >
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
                <Box sx={{ width: '100%', height: '50px', backgroundColor: '#F1F0F0', display: 'flex', alignItems: 'center' }}>
                    <span style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '13px' }}>{`${term('total')}: ${totalNumber}`}</span>
                </Box>
            </div>
        </div >
    )
}



export default AGTable;