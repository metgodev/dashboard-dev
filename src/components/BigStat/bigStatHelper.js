import previousSunday from 'date-fns/previousSunday'
import compareAsc from 'date-fns/compareAsc'
import term from "../../terms";
import TIME_PERIODS from '../../data/time_periods';


export const getNumberOfEntities = (timePeriod, data) => {

    let number = 0
    const today = new Date()

    switch (timePeriod) {
        case TIME_PERIODS.DAILY:
            number = data.filter(item => {
                const date = new Date(item.createdAt)
                return (
                    date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate()
                )
            }).length
            break;
        case TIME_PERIODS.WEEKLY:
            number = data.filter(item => {
                const date = new Date(item.createdAt)
                if (today.getDay() === 0) {
                    return date.getFullYear() === today.getFullYear() &&
                        date.getMonth() === today.getMonth() &&
                        date.getDate() === today.getDate()
                } else {
                    const firstDayOfWeek = previousSunday(today)
                    return (
                        compareAsc(date, firstDayOfWeek) === 1
                    )
                }
            }).length
            break;
        case TIME_PERIODS.MONTHLY:
            number = data.filter(item => {
                const date = new Date(item.createdAt)
                return (
                    date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth()
                )
            }).length
            break;
        default:
            break;
    }

    return number
}

export const getTextForComparison = (value) => {
    let text = ''
    switch (value) {
        case TIME_PERIODS.DAILY:
            text = term('added_today')
            break;
        case TIME_PERIODS.WEEKLY:
            text = term('added_this_week')
            break;
        case TIME_PERIODS.MONTHLY:
            text = term('added_this_month')
            break;
        default:
            break;
    }
    return text
}