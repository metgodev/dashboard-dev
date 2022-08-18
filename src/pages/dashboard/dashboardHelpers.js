import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import term from '../../terms';

export const headerBtns = [
    //can get name, func, input, icon 
    { name: term('weekly'), func: () => console.log('Week'), buttonIcon: <DateRangeOutlinedIcon /> },
    { name: term('monthly'), func: () => console.log('Months'), buttonIcon: <CalendarTodayOutlinedIcon /> },
]

export const requestParams = { $limit: 1000, $select: ['_id', 'location', 'locationInfo', 'tags', 'tagsIds', 'createdAt', 'name', 'shortDescription'] }