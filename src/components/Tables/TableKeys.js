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
            }
        case 'relevantTo':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.relevantTo?.map(x => term(x.toLowerCase())),
                editable: false,
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
                valueFormatter: (params) => params?.data[key]?.map(tag => [tag?.tag?.title, term(tag?.category?.title)])?.join(' - '),
            }
        case "startDate":
            return {
                headerName: term(key), field: key, editable: false,
                valueFormatter: (params) => { return new Date(params.value).toLocaleString('he-IL').split(',')[0] }, filter: 'agDateColumnFilter'
            }
        case "endDate":
            return {
                headerName: term(key), field: key, editable: false,
                valueFormatter: (params) => { return new Date(params.value).toLocaleString('he-IL').split(',')[0] }, filter: 'agDateColumnFilter'
            }
        case 'authority':
            return {
                headerName: term(key), field: key,
                valueFormatter: (params) => params?.data?.authority?.name,
                editable: false,
            }
        case 'locationInfo':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.locationInfo?.description || params?.data?.locationInfo?.formattedAddress,
                editable: false,
            }
        case 'inPlace':
            return {
                headerName: term(key),
                valueFormatter: (params) => params?.data?.inPlace?.type,
                editable: false,
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
                valueFormatter: (params) => params.data && params?.data[key] ? term('yes') : term('no'),
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