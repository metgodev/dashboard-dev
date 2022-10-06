import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import term from '../../terms';
import { getApplicationActiveUsersByDate } from "../../API/service";

export const headerBtns = [
    //can get name, func, input, icon 
    { name: term('weekly'), func: () => console.log('Week'), buttonIcon: <DateRangeOutlinedIcon /> },
    { name: term('monthly'), func: () => console.log('Months'), buttonIcon: <CalendarTodayOutlinedIcon /> },
]
export const requestParams = { $limit: 1000, $select: ['status', 'shortDescription', 'price', 'locationName', 'openHour', 'startDate', '_id', 'location', 'locationInfo', 'tags', 'tagsIds', 'createdAt', 'name', 'shortDescription', 'gallery', 'galleryFileIds', 'authorityId', 'authority'] }

export const getWeeklyActiveUsers = async () => {

    const today = new Date()
    const weekAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6)

    const formattedToday = today.getFullYear().toString() + ('0' + (today.getMonth() + 1)).slice(-2).toString() + ('0' + today.getDate()).slice(-2).toString()
    const formattedweekAgo = weekAgo.getFullYear().toString() + ('0' + (weekAgo.getMonth() + 1)).slice(-2).toString() + ('0' + weekAgo.getDate()).slice(-2).toString()

    const getUsers = await getApplicationActiveUsersByDate(formattedweekAgo, formattedToday)

    return getUsers

}