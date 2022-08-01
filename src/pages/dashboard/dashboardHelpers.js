import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import term from '../../terms';
import client from '../../API/metro'

export const headerBtns = [
    //can get name, func, input, icon 
    { name: term('daily'), func: () => console.log('Days'), buttonIcon: <TodayOutlinedIcon /> },
    { name: term('weekly'), func: () => console.log('Week'), buttonIcon: <DateRangeOutlinedIcon /> },
    { name: term('monthly'), func: () => console.log('Months'), buttonIcon: <CalendarTodayOutlinedIcon /> },
]

export const getEntitiesCount = async (setEntitiesCount) => {
    const res = await Promise.all([
        client.service("business").find({ query: { $limit: 0 } }),
        client.service("events").find({ query: { $limit: 0 } }),
        client.service("pois").find({ query: { $limit: 0 } }),
        client.service("tracks").find({ query: { $limit: 0 } })
    ])
    setEntitiesCount([res[0].total, res[1].total, res[2].total, res[3].total])
}

export const requestParams = { $limit: 1000 }