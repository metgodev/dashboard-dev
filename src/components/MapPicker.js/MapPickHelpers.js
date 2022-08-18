export const getFormattedAddress = (res) => {
    return res.results[0].address_components.filter(item => !item.types.includes('country') && !item.types.includes('plus_code') && !item.types.includes('administrative_area_level_2') && !item.types.includes('administrative_area_level_1'))
        .map(item => item.long_name).join(', ')
}

export const sendPositionToInfoWindow = (position, title, description, setInfoWindow) => {
    setInfoWindow({ position, title, description })
}