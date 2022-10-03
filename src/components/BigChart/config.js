import term from "../../terms"

export const getFormattedData = (users) => {
    const formattedData = []
    for (let i = 0; i < 7; i++) {
        formattedData.push(
            {
                name: getDisplayName(users.data.xValues[i]),
                pv: users.data.series[0][i],
            }
        )
    }
    return formattedData
}

const getDisplayName = (date) => {
    const d = new Date(date)
    switch (d.getDay()) {
        case 0:
            return term('sunday')
        case 1:
            return term('monday')
        case 2:
            return term('tuesday')
        case 3:
            return term('wednesday')
        case 4:
            return term('thursday')
        case 5:
            return term('friday')
        case 6:
            return term('saturday')
        default:
            return null
    }
}