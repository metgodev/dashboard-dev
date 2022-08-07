import previousSunday from 'date-fns/previousSunday'
import compareAsc from 'date-fns/compareAsc'
import isYesterday from 'date-fns/isYesterday'
import startOfYesterday from 'date-fns/startOfYesterday'
import term from "../../terms";


export const getNumberOfEntities = (timePeriod, data) => {

    let number = 0
    const today = new Date()

    switch (timePeriod) {
        case 'daily':
            number = data.filter(item => {
                const date = new Date(item.createdAt)
                return (
                    date.getFullYear() === today.getFullYear() &&
                    date.getMonth() === today.getMonth() &&
                    date.getDate() === today.getDate()
                )
            }).length
            break;
        case 'weekly':
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
        case 'monthly':
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
        case 'daily':
            text = term('added_today')
            break;
        case 'weekly':
            text = term('added_this_week')
            break;
        case 'monthly':
            text = term('added_this_month')
            break;
        default:
            break;
    }
    return text
}