import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import term from '../../terms';

export const headerBtns = [
    //can get name, func, input, icon 
    { name: term('daily'), func: () => console.log('Days'), buttonIcon: <TodayOutlinedIcon /> },
    { name: term('weekly'), func: () => console.log('Week'), buttonIcon: <DateRangeOutlinedIcon /> },
    { name: term('monthly'), func: () => console.log('Months'), buttonIcon: <CalendarTodayOutlinedIcon /> },
]

export const requestParams = { $limit: 1000, $select: ['_id', 'location', 'locationInfo', 'tags', 'tagsIds'] }


export const setNumberOfBusinesses = (businesses, setEntitiesCount) => {
    businesses.data.length > 0 && setEntitiesCount(prev => { return [businesses.data.length, prev[1], prev[2], prev[3]] })
}
export const setNumberOfEvents = (events, setEntitiesCount) => {
    events.data.length > 0 && setEntitiesCount(prev => { return [prev[0], events.data.length, prev[2], prev[3]] })
}
export const setNumberOfPoints = (points, setEntitiesCount) => {
    points.data.length > 0 && setEntitiesCount(prev => { return [prev[0], prev[1], points.data.length, prev[3]] })
}
export const setNumberOfTracks = (tracks, setEntitiesCount) => {
    tracks.data.length > 0 && setEntitiesCount(prev => { return [prev[0], prev[1], prev[2], tracks.data.length] })
}