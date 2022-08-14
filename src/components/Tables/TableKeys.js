import StatusMenu from './StatusMenu';
import term from '../../terms';


export const Cols = (cols, ignore) => Object.keys(cols).filter(x => !ignore.includes(x)).sort()

export const Keys = (cols, idOptions, display, onUpdate) => cols.map(key => {
    switch (key) {
        case 'status':
            return {
                headerName: term(key),
                field: key,
                pinned: 'right',
                cellRenderer: StatusMenu,
                cellRendererParams: {
                    display,
                    onUpdate,
                },
                filter: 'agSetColumnFilter',
                filterParams: {
                    values: ['PENDING_APPROVAL', 'PUBLIC', 'PRIVATE'],
                    valueFormatter: statusValueFormatter
                }
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
                field: key,
            }
        case 'relevantTo':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.relevantTo?.map(x => term(x.toLowerCase())),
                editable: false,
                sortable: false,
                filterable: false,
                field: key,
            }
        case 'createdAt':
            return {
                headerName: term(key), field: key, editable: false,
                field: key,
                valueFormatter: (params) => {
                    if (!params.data) return
                    return new Date(params.value).toLocaleString('he-IL')
                },
                filterable: false,
            }
        case 'updatedAt':
            return {
                headerName: term(key),
                field: key,
                editable: false,
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
                field: key,
            }
        case "tag":
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (params?.data === undefined) return
                    return params.value.title
                },
                sortable: false,
                filterable: false,
                field: key,
            }
        case "category":
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (params?.data === undefined) return
                    return term(params.data.category.title.toLowerCase())
                },
                sortable: false,
                filterable: false,
                field: key,
            }
        case "startDate":
            return {
                headerName: term(key),
                field: key,
                editable: false,
                valueFormatter: (params) => {
                    if (!params.data) return ""
                    return new Date(params.value).toLocaleString('he-IL').split(',')[0]
                },
                filterable: false
            }
        case "endDate":
            return {
                headerName: term(key),
                field: key,
                editable: false,
                valueFormatter: (params) => {
                    if (!params.data) return ""
                    return new Date(params.value).toLocaleString('he-IL').split(',')[0]
                },
                filterable: false
            }
        case 'authority':
            return {
                headerName: term(key),
                field: key,
                valueFormatter: (params) => params?.data?.authority?.name,
                editable: false,
                filter: 'agTextColumnFilter',
            }
        case 'locationInfo':
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    return params?.data?.locationInfo?.description || params?.data?.locationInfo?.formattedAddress
                },
                editable: false,
                sortable: false,
                filterable: false,
                field: key,
            }
        case 'inPlace':
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (!params || !params.value) return
                    return params?.data[key]?.map(place => term(place.toLowerCase()))
                },
                editable: false,
                field: key,
            }
        case 'shady':
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (!params || !params.value) return
                    return term(params?.value.toLowerCase())
                },
                field: key,
                filter: 'agTextColumnFilter',
            }
        case 'prefferedSeason':
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (!params || !params.value || typeof params.value[0] === 'object') return
                    return term(params?.value[0].toLowerCase())
                },
                field: key,
                filter: 'agTextColumnFilter',
            }
        case 'arrivalRecommendations':
        case 'time':
            return {
                headerName: term(key),
                valueFormatter: (params) => {
                    if (!params || !params.value) return
                    return term(params?.value.toLowerCase())
                },
                field: key,
                filter: 'agTextColumnFilter',
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
                field: key,
                editable: false,
                sortable: false,
                filter: 'agTextColumnFilter',
            }
        case "activitiesInPlace":
        case "exclusiveFor":
        case "websitesUrl":
            return {
                headerName: term(key),
                field: key,
            }
        case '_id':
            return {
                ...idOptions
            }
        default:
            return {
                headerName: term(key),
                field: key,
                filter: 'agTextColumnFilter',
            }
    }
}).sort((a, b) => {
    if (a.field === 'name') return -1;
    return 0;
})

const statusValueFormatter = (params) => {
    const status = params.value
    return term(status.toLowerCase())
}