import StatusMenu from './StatusMenu';
import term from '../../terms';


export const Cols = (cols, ignore) => Object.keys(cols).filter(x => !ignore.includes(x))

export const Keys = (cols, idOptions, display, onUpdate) => cols.map(key => {
    switch (key) {
        case 'status':
            return {
                headerName: term(key), field: key, pinned: 'right',
                cellRenderer: StatusMenu,
                cellRendererParams: {
                    display,
                    onUpdate,
                },
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
                sortable: false,
                filterable: false,
            }
        case 'relevantTo':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.relevantTo?.map(x => term(x.toLowerCase())),
                editable: false,
                sortable: false,
                filterable: false,
            }
        case 'createdAt':
            return {
                headerName: term(key), field: key, editable: false,
                valueFormatter: (params) => {
                    if (!params.data) return
                    return new Date(params.value).toLocaleString('he-IL')
                },
                filterable: false,
            }
        case 'updatedAt':
            return {
                headerName: term(key), field: key, editable: false,
                valueFormatter: (params) => {
                    if (!params.data) return
                    return new Date(params.value).toLocaleString('he-IL')
                },
                filterable: false,
            }
        case "tags":
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (params?.data === undefined) return
                    return params?.data[key]?.map(tag => [tag?.tag?.title, term(tag?.category?.title)])?.join(' - ')
                },
                sortable: false,
                filterable: false,
            }
        case "startDate":
            return {
                headerName: term(key), field: key, editable: false,
                valueFormatter: (params) => {
                    if (!params.data) return ""
                    return new Date(params.value).toLocaleString('he-IL').split(',')[0]
                },
                filterable: false,
            }
        case "endDate":
            return {
                headerName: term(key), field: key, editable: false,
                valueFormatter: (params) => { return new Date(params.value).toLocaleString('he-IL').split(',')[0] },
                filterable: false,
            }
        case 'authority':
            return {
                headerName: term(key), field: key,
                valueFormatter: (params) => params?.data?.authority?.name,
                editable: false,
                filterable: false,
            }
        case 'locationInfo':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.locationInfo?.description || params?.data?.locationInfo?.formattedAddress,
                editable: false,
                sortable: false,
                filterable: false,
            }
        case 'inPlace':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.inPlace?.type,
                editable: false,
                filterable: false,
            }
        case 'shady':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.shady?.type,
                field: key,
                filterable: false,
            }
        case 'arrivalRecommendations':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.arrivalRecommendations?.type,
                field: key,
                filterable: false,
            }
        case 'isHidden':
        case 'isRecommended':
        case 'online':
        case 'isAccessable':
        case 'isKosher':
        case 'open24Hours':
        case 'openOnWeekend':
        case 'free':
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (!params.data) return ""
                    return params.data && params?.data[key] ? term('yes') : term('no')
                },
                editable: false,
                sortable: false,
                filterable: false,
            }
        case '_id':
            return {
                ...idOptions
            }
        default:
            return {
                headerName: term(key),
                field: key,
                filterable: false,
            }
    }
}).sort((a, b) => {
    if (a.field === 'status' || a.field === 'name') return -1;
    return 0;
}) 