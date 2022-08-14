import toast from 'react-hot-toast';
import term from '../../terms';
import client from '../../API/metro';

export const getRowId = params => {
    return params.data._id;
}

export const errorToast = () => toast(term("something_went_wrong"));

export const updateFunction = async (params, display) => {
    try {
        await client.service(display).patch(params?.data?._id, params?.data)
        params.setStatus(params.data.status)
    } catch (e) {
        errorToast()
    }
}

export const exportToExcellFunction = (gridRef, display) => {
    gridRef?.current?.api?.exportDataAsCsv({ fileName: `${display}.csv` });
}

export const getSortingParams = (params) => {
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