import React, { useEffect, useState, useRef, useCallback } from 'react'
import { gridOptions, idOptions, ignore } from '../../utils/ag_table_config';
import { AgGridReact } from 'ag-grid-react';
import term from '../../terms';
import client from '../../API/metro';
import StatusMenu from './StatusMenu';
import { useSelector } from 'react-redux';

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import 'ag-grid-enterprise';


const AGTable = ({ display, action }) => {
    const tableChanged = useSelector(state => state.mainReducer.tableChanged)
    const area = useSelector(s => s.mainRememberReducer.area)
    const gridRef = useRef();
    const [RowData, setRowData] = useState([]);
    const [columnDefs, setColumnDefs] = useState([]);

    useEffect(() => {
        fetchData();
    }, [tableChanged]);

    const getRowId = useCallback(params => {
        return params.data._id;
    }, []);

    const onUpdate = useCallback(async (params) => {
        try {
            await client.service(display).patch(params.data._id, params.data)
            fetchData();
        } catch (e) {
            console.log(e)
        }
    }, []);

    const fetchData = async () => {
        try {
            const res = await client.service(display).find({
                query: {
                    areaId: area?.id?.toString(),
                    $limit: 500,
                    $sort: {
                        createdAt: -1
                    }
                }
            });
            if (res.data) {
                let cols = Object.keys(res.data[0]).filter(x => !ignore.includes(x))
                let keys = cols.map(key => {
                    switch (key) {
                        case 'status':
                            return {
                                headerName: term(key), field: key, pinned: 'right',
                                cellRenderer: StatusMenu, cellRendererParams: {
                                    display,
                                    onUpdate,
                                },
                            }
                        case 'createdAt':
                            return {
                                headerName: term(key), field: key, editable: false,
                                valueFormatter: (params) => { return new Date(params.value).toLocaleString('he-IL') }, filter: 'agDateColumnFilter'
                            }
                        case 'updatedAt':
                            return {
                                headerName: term(key), field: key, editable: false,
                                valueFormatter: (params) => { return new Date(params.value).toLocaleString('he-IL') }, filter: 'agDateColumnFilter'
                            }
                        case "tags":
                            return {
                                headerName: term(key),
                                valueFormatter: (params) => params?.data[key]?.map(tag => [tag.tag.title, term(tag?.category?.title)])?.join(' - '),
                            }
                        case 'authority':
                            return {
                                headerName: term(key),
                                children: [
                                    {
                                        headerName: term('authority_email'),
                                        field: term('authority_email'),
                                        valueFormatter: (params) => params?.data.authority?.email,
                                        editable: false,
                                    },
                                    {
                                        headerName: term('authority_name'),
                                        field: term('authority_name'),
                                        valueFormatter: (params) => params?.data.authority?.name,
                                        editable: false,
                                    },
                                ]
                            }
                        case 'locationInfo':
                            return {
                                headerName: term(key),
                                valueFormatter: (params) => params?.data.locationInfo?.description || params?.data.locationInfo?.formattedAddress,
                                editable: false,
                            }
                        case 'inPlace':
                            return {
                                headerName: term(key),
                                valueFormatter: (params) => console.log(params?.data?.inPlace?.type),
                                editable: false,
                            }
                        case 'online':
                        case 'isAccessable':
                        case 'isKosher':
                        case 'open24Hours':
                        case 'openOnWeekend':
                        case 'free':
                            return {
                                headerName: term(key),
                                valueFormatter: (params) => params?.data[key] ? term('yes') : term('no'),
                                editable: false,
                            }
                        case 'openingHours':
                            return {
                                headerName: term(key),
                                valueFormatter: // get today's opening hours
                                    (params) => {
                                        let days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
                                        let today = new Date().getDay()
                                        let hours = params?.data?.openingHours?.[days[today]]
                                        if (hours) {
                                            return `${hours.start} - ${hours.end}`
                                        }
                                    },
                                editable: false,
                            }
                        case '_id':
                            return {
                                ...idOptions
                            }
                        default:
                            return { headerName: term(key), field: key, filter: 'agTextColumnFilter' }
                    }
                }).sort((a, b) => {
                    if (a.field === 'status') return -1;
                    return 0;
                })
                setRowData(res.data.map(item => {
                    let newItem = { ...item };
                    ignore.forEach(key => {
                        delete newItem[key];
                    })
                    return newItem;
                }));
                setColumnDefs(keys);
            }
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div className="ag-theme-alpine" style={{ width: '99.7%' }}>
            <div className='ag-table' style={{ width: '100%', height: window.innerHeight - 120, direction: 'rtl' }} >
                <AgGridReact
                    onGridReady={params => {
                        gridRef.current = params.api;
                        params.api.sizeColumnsToFit();
                    }}
                    onCellDoubleClicked={(event) => { action(event.data, 'edit') }}
                    columnDefs={columnDefs}
                    rowData={RowData}
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
