import term from '../../terms';
import { _patch } from '../../API/service'
import Toast from '../../utils/useToast';
import ROLES from '../../data/roles';

export const getRowId = params => {
    return params.data._id;
}

const FAKE_ID = 'a0a0a0a0a0a0a0a0a0a0a0a0'

export const updateFunction = async (params, display) => {
    try {
        await _patch(display, params?.data?._id, params?.data)
        params.setStatus(params.data.status)
    } catch (e) {
        console.log('tableFunction', e)
        Toast()
    }
}

export const useGetParams = (display, user, area) => {
    if (user?.roles === undefined) return {}
    let paramsToSend = {}
    if (display === 'users') {
        paramsToSend.isAnonymous = false
    }
    if (user.roles.length === 2 && user.roles[1].roleName === ROLES.BUSINESS_OWNER) {
        user.roles[1].resourceIds.length > 0 ? paramsToSend._id = {
            $in: user.roles[1].resourceIds
        } : paramsToSend._id = FAKE_ID
    }
    if (user.roles.length === 1 && user.roles[0].roleName === ROLES.MEMBER) {
        paramsToSend._id = FAKE_ID
    }
    if (user.roles.length === 2 && user.roles[1].roleName !== ROLES.BUSINESS_OWNER) {
        paramsToSend.areaId = area.id
    }
    return paramsToSend
}

export const proccessCellToExport = (params) => {
    switch (params.column.colId) {
        case 'status':
        case "arrivalRecommendations":
        case "prefferedSeason":
        case "shady":
        case "time":
        case "shipmentType":
            if (typeof params.value === 'object') {
                if (params.value[0] && typeof params.value[0] !== 'object') {
                    return term(params?.value[0]?.toLowerCase())
                }
                return ''
            }
            return params.value ? term(params?.value?.toLowerCase()) : ''
        case 'roles':
            let roles = ''
            if (params.value) {
                for (let i = 0; i < params.value.length; i++) {
                    roles = roles + ` ${term(params.value[i].roleName.toLowerCase())}`
                }
            }
            return roles
        case 'authority':
            return params.value.name
        case "contactPersonPhoneNumber":
            return params.value.toString()
        case "relevantTo":
        case 'inPlace':
            let formattedRelevantTo = ''
            if (params.value) {
                for (let i = 0; i < params.value.length; i++) {
                    formattedRelevantTo = formattedRelevantTo + ` ${term(params.value[i].toLowerCase())}`
                }
            }

            return formattedRelevantTo
        case "tags":
            let formattedTags = ''
            if (params.value) {
                for (let i = 0; i < params.value.length; i++) {
                    formattedTags = formattedTags + ` [${term(params.value[i].category.title.toLowerCase())} - ${params.value[i].tag.title}] `
                }
            }
            return formattedTags
        case "openingHours":
            let formattedOpeningHours = '';
            for (let i = 0; i < Object.keys(params.value).length; i++) {
                if (params.value[Object.keys(params.value)[i]].open) {
                    formattedOpeningHours = formattedOpeningHours + ` ${term(Object.keys(params.value)[i])} : ${params.value[Object.keys(params.value)[i]].start} - ${params.value[Object.keys(params.value)[i]].end}`
                }
            }
            return formattedOpeningHours
        default:
            return params.value
    }
}

export const exportToExcellFunction = (gridRef, display) => {
    //Save the grid ref
    //Get all entity data
    //Set all data on grid ref
    //export
    //set gridref back to normal
    gridRef?.current?.api?.exportDataAsCsv({
        fileName: `${display} data`,
        processCellCallback: (params) => proccessCellToExport(params)
    });
}

export const getSortingParams = (params) => {
    if (params === undefined || params?.sortModel?.length === 0) {
        return { updatedAt: -1 }
    } else {
        switch (params?.sortModel[0].sort) {
            case 'asc':
                return { [params?.sortModel[0].colId]: -1 }
            case 'desc':
                return { [params?.sortModel[0].colId]: 1 }
        }
    }
}

export const getFilterParams = (filterParams, authorities) => {
    let formattedFilterParams = {}
    Object.keys(filterParams).forEach(key => {
        switch (key) {
            case 'name':
            case 'address':
            case 'contactPersonName':
            case 'contactPersonPhoneNumber':
            case 'phoneNumber':
            case 'description':
            case 'emailAddress':
            case 'facebookPageUrl':
            case 'instagramPageUrl':
            case 'instagramPageUrl':
            case 'youtubePageUrl':
            case 'locationName':
            case 'shortDescription':
            case 'currency':
            case 'openHour':
            case 'price':
            case 'tip':
                formattedFilterParams[key] = filterParams[key].filter
                break
            case 'isAccessable':
            case 'isKosher':
            case 'open24Hours':
            case 'openOnWeekend':
            case 'online':
            case 'free':
            case 'isHidden':
            case 'isRecommended':
                if (filterParams[key].filter === 'כן' || filterParams[key].filter === 'yes') {
                    formattedFilterParams[key] = true
                } else if (filterParams[key].filter === 'לא' || filterParams[key].filter === 'no') {
                    formattedFilterParams[key] = false
                }
                break;
            case 'authority':
                formattedFilterParams['authorityId'] = getAuthorityIdByName(filterParams[key].filter, authorities)
                break;
            case 'arrivalRecommendations':
                formattedFilterParams[key] = getArrivalRecommendations(filterParams[key].filter)
                break;
            case 'prefferedSeason':
                formattedFilterParams[key] = getPrefferedSeason(filterParams[key].filter)
                break;
            case 'shady':
                formattedFilterParams[key] = getShadyValue(filterParams[key].filter)
                break;
            case 'time':
                formattedFilterParams[key] = getTimeValue(filterParams[key].filter)
                break;
            case 'status':
                formattedFilterParams['status'] = {
                    $in: filterParams[key].values
                }
        }
    })
    return formattedFilterParams
}

const getAuthorityIdByName = (name, authorities) => {
    const authorityId = authorities?.data?.find(item => item.name === name)?._id
    return authorityId?.toString()
}

const getArrivalRecommendations = (name) => {
    switch (name) {
        case "Walk":
        case "walk":
        case "רגלי":
            return "WALK"
        case "רכב":
        case "car":
        case "Car":
            return "CAR"
        case "4x4":
        case "4 x 4":
        case "4 X 4":
            return "OFF_ROAD"
        case "אופניים":
        case "Bicycle":
        case "bicycle":
            return "BICYCLE"
    }
}

const getPrefferedSeason = (name) => {
    switch (name) {
        case 'קיץ':
        case 'summer':
        case 'Summer':
            return 'SUMMER'
        case 'חורף':
        case 'Winter':
        case 'winter':
            return "WINTER"
        case 'סתיו':
        case 'fall':
        case 'Fall':
            return 'FALL'
        case 'אביב':
        case 'spring':
        case 'Spring':
            return 'SPRING'
        case 'כל העונות':
        case 'All seasons':
        case 'All Seasons':
        case 'all seasons':
            return 'ALL_SEASONS'
    }
}

const getShadyValue = (name) => {
    switch (name) {
        case "חלקי":
        case "Partial":
        case "partial":
            return "PARTIAL"
        case 'מלא':
        case "Full":
        case "full":
            return "FULL"
        case 'ללא':
        case "None":
        case "none":
            return "NONE"
    }
}

const getTimeValue = (time) => {
    switch (time) {
        case "שעה":
        case "Hour":
        case "hour":
            return "HOUR"
        case "בין שעה לשלוש שעות":
        case "An hour to three hours":
        case "an hour to three hours":
            return "1_TO_3_HOURS"
        case "חצי יום":
        case "Half a day":
        case "half a day":
            return "HALF_DAY"
        case "יום שלם":
        case "Full day":
        case "full day":
            return 'FULL_DAY'
        case "יומיים ומעלה":
        case "More than two days":
        case "more than two days":
            return '2_DAYS_AND_ABOVE'
    }
}


export const checkIfTablePrefsChanged = (e) => {
    if (typeof e.target.className === 'string' &&
        (e.target.className === 'ag-header-cell-resize' ||
            e.target.className === 'ag-input-field-input ag-checkbox-input' ||
            e.target.className === 'ag-dnd-ghost ag-unselectable ag-theme-alpine')
    ) {
        return true
    }
    return false
}