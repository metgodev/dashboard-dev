export const getPicturesForImagePicker = (values) => {
    return []
}

export const GetTagColor = (tagName) => {
    switch (tagName) {
        case 'Attraction':
            return `rgba(52, 235, 229, 0.2)`
        case 'Lodging':
            return 'rgba(197, 66, 245, 0.2)'
        case 'Culture':
            return 'rgba(250, 97, 247, 0.2)'
        case 'Local':
            return 'rgba(238, 255, 0, 0.2)'
        case 'Travel':
            return 'rgba(0, 255, 30, 0.2)'
        case 'Food':
            return 'rgba(255, 17, 0, 0.2)'
        default:
            return 'rbga(0,0,0,0.1)'
    }
}

export const formatObjects = (itemsToSend, options) => {
    if (itemsToSend === undefined) return []
    return itemsToSend.map(item => {
        if (options.business.includes(item)) {
            return { id: item, type: 'BUSINESS' }
        } else if (options.pois.includes(item)) {
            return { id: item, type: 'POI' }
        }
    })
}