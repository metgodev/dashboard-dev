export const getPicturesForImagePicker = (values) => {
    return []
}

export const getTagColor = (tagName) => {
    switch (tagName.split(' ')[tagName.split(' ').length - 1]) {
        case 'אטרקציה':
            return `rgba(52, 235, 229, 0.2)`
        case 'לינה':
            return 'rgba(197, 66, 245, 0.2)'
        case 'תרבות':
            return 'rgba(250, 97, 247, 0.2)'
        case 'מקומי':
            return 'rgba(238, 255, 0, 0.2)'
        case 'לטייל':
            return 'rgba(0, 255, 30, 0.2)'
        case 'אוכל':
            return 'rgba(255, 17, 0, 0.2)'
        default:
            return 'rbga(0,0,0,0.1)'
    }
}

export const formatObjects = (itemsToSend, options) => {
    return itemsToSend.map(item => {
        if (options.business.includes(item)) {
            return { id: item, type: 'BUSINESS' }
        } else if (options.pois.includes(item)) {
            return { id: item, type: 'POI' }
        }
    })
}