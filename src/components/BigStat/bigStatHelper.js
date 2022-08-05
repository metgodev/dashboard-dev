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
                const firstDayOfWeek = previousSunday(today)
                return (
                    compareAsc(date, firstDayOfWeek) === 1
                )
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

export const getNumberOfEntitiesToCompare = (timePeriod, data) => {

    let number = 0
    const today = new Date()

    switch (timePeriod) {
        case 'daily':
            number = data.filter(item => {
                const date = new Date(item.createdAt)
                return (
                    isYesterday(date)
                )
            }).length
            break;
        case 'weekly':
            number = data.filter(item => {
                const date = new Date(item.createdAt)
                const firstDay = previousSunday(startOfYesterday(previousSunday(today)))
                const lastDay = startOfYesterday(previousSunday(today))
                return (
                    compareAsc(date, firstDay) === 1 &&
                    compareAsc(lastDay, date) === 1
                )
            }).length
            break;
        case 'monthly':
            number = data.filter(item => {
                const date = new Date(item.createdAt)
                return (
                    date.getFullYear() === today.getFullYear() &&
                        today.getMonth() === 0 ? date.getMonth() === 11 : date.getMonth() === today.getMonth() - 1
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
            text = term('added_yesterday')
            break;
        case 'weekly':
            text = term('added_last_week')
            break;
        case 'monthly':
            text = term('added_last_month')
            break;
        default:
            break;
    }
    return text
}