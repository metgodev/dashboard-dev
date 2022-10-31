import React, { useState, useRef, useCallback, useEffect } from 'react'
//MUI
import { Box } from '@mui/system';
//AG Grid
import { gridOptions, idOptions, ignore, requestParams, excelStyles } from './ag_table_config';
import { Cols, Keys } from './TableKeys';
import { getRowId, updateFunction, exportToExcellFunction, getSortingParams, getFilterParams, checkIfTablePrefsChanged, proccessCellToExport, useGetParams } from './tableFunctions'
import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';
import { AgGridReact } from 'ag-grid-react';
//Redux
import { useDispatch, useSelector } from 'react-redux';
import useGetService from '../../hooks/useGetService';
import { set_tags_table_preferences, set_authorities_table_preferences, set_business_table_preferences, set_events_table_preferences, set_points_table_preferences, set_tracks_table_preferences, set_products_table_preferences } from '../../REDUX/actions/main.actions';
//Helper
import term from '../../terms';
import BACK_ROUTES from '../../data/back_routes';
import CACHED_DATA_ROUTES from '../../data/cached_data_routes';
import LISTENER from '../../data/listener';
import Toast from '../../utils/useToast'
import GetRole from '../../hooks/GetRole'
//Service
import { _get } from '../../API/service'
import { CircularProgress } from '@mui/material';

const AGTable = ({ display, action, setExportToExcel, options }) => {

    const gridRef = useRef();

    const dispatch = useDispatch()
    const role = GetRole()

    const tableChanged = useSelector(state => state.mainReducer.tableChanged)
    const area = useSelector(s => s.mainRememberReducer.area)
    const preferences = useSelector(s => s.mainRememberReducer[`${display}TablePreferences`])

    const userDetails = useSelector(s => s.userReducer.userDetails)
    let pageData = useGetService(display, display, requestParams(area, userDetails), area, false)
    const authorities = useGetService(BACK_ROUTES.AUTHORITIES, CACHED_DATA_ROUTES.AUTHORITIES, { areaId: area.id }, area, false)
    const additionalParams = useCallback(useGetParams(display, userDetails, area), [userDetails, area])

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
        document.addEventListener(LISTENER.TYPES.MOUSEUP, dragged)
        return () => {
            authorities.cancelRequest()
            pageData.cancelRequest()
            document.removeEventListener(LISTENER.TYPES.MOUSEUP, dragged)
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
        if (checkIfTablePrefsChanged(e)) {
            switch (display) {
                case BACK_ROUTES.AUTHORITIES:
                    dispatch(set_authorities_table_preferences(gridRef.current.columnApi.getColumnState()))
                    break;
                case BACK_ROUTES.TAG_CATEGORIES:
                    dispatch(set_tags_table_preferences(gridRef.current.columnApi.getColumnState()))
                    break;
                case BACK_ROUTES.BUSINESS:
                    dispatch(set_business_table_preferences(gridRef.current.columnApi.getColumnState()))
                    break;
                case BACK_ROUTES.EVENTS:
                    dispatch(set_events_table_preferences(gridRef.current.columnApi.getColumnState()))
                    break;
                case BACK_ROUTES.POINTS:
                    dispatch(set_points_table_preferences(gridRef.current.columnApi.getColumnState()))
                    break;
                case BACK_ROUTES.TRACKS:
                    dispatch(set_tracks_table_preferences(gridRef.current.columnApi.getColumnState()))
                    break;
                case BACK_ROUTES.PRODUCTS:
                    dispatch(set_products_table_preferences(gridRef.current.columnApi.getColumnState()))
                    break;
            }
        }
    }

    const onUpdate = useCallback((params) => {
        const rowData = gridRef.current.api.getRowNode(params.data._id)
        if (rowData?.data?.tagsIds?.length === 0) {
            Toast('cant_change_status_please_add_tags')
        }
        updateFunction(params, display)
    }, [tableChanged]);

    const exportToXl = useCallback(() => {
        exportToExcellFunction(gridRef, display)
    }, [gridRef])

    const rows = async (params) => {
        const filterParams = getFilterParams(params.filterModel, authorities)
        const skip = params.startRow === 0 ? {} : { $skip: params.startRow }
        let valuesToSend = Object.assign({}, filterParams, {
            isAnonymous: false,
            $limit: params.endRow - params.startRow,
            $sort: getSortingParams(params),
        }, skip, additionalParams)
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
            console.log('agTable', e)
            Toast()
        }
    }

    const onGridReady = useCallback(() => {
        if (gridRef.current.api !== undefined) {
            if (pageData.data.length > 0) {
                let cols = Cols(pageData.data[0], ignore, display, role);
                let keys = Keys(cols, idOptions, display, onUpdate, options);
                setColumnDefs(keys);
            }
            let datasource = {
                rowCount: undefined,
                getRows: rows
            }
            gridRef.current.api.setDatasource(datasource);
        }
    }, [pageData.data, gridRef, area, columnDefs, tableChanged])

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
                    getRowId={getRowId}
                    excelStyles={excelStyles}
                    defaultExportParams={
                        {
                            fileName: `${display} data`,
                            processCellCallback: (params) => proccessCellToExport(params)
                        }
                    }
                />
                <Box sx={{ width: '100%', height: '50px', backgroundColor: '#F1F0F0', display: 'flex', alignItems: 'center' }}>
                    {pageData.loading ?
                        <CircularProgress size={20} sx={{ marginRight: '20px' }} />
                        :
                        <span style={{ marginRight: '20px', fontWeight: 'bold', fontSize: '13px' }}>{`${term('total')}: ${totalNumber}`}</span>}
                </Box>
            </div>
        </div >
    )
}



export default AGTable;