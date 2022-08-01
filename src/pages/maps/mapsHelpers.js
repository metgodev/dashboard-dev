import attractionIcon from '../../Assets/images/icons/attractions.png'
import cultureIcon from '../../Assets/images/icons/culture.png'
import foodIcon from '../../Assets/images/icons/food.png'
import localIcon from '../../Assets/images/icons/local.png'
import lodgingIcon from '../../Assets/images/icons/lodging.png'
import travelIcon from '../../Assets/images/icons/travel.png'

export const requestParams = { $limit: 1000 }

export const sortDataByCategory = (data, setData) => {
    let culture = []
    let food = []
    let local = []
    let attraction = []
    let lodging = []
    let travel = []

    data.forEach(item => {
        switch (item.category) {
            case "Travel":
                travel.push({ location: item.location, icon: travelIcon })
                break;
            case "Food":
                food.push({ location: item.location, icon: foodIcon })
                break;
            case "Local":
                local.push({ location: item.location, icon: localIcon })
                break;
            case "Attraction":
                attraction.push({ location: item.location, icon: attractionIcon })
                break;
            case "Culture":
                culture.push({ location: item.location, icon: cultureIcon })
                break;
            case "Lodging":
                lodging.push({ location: item.location, icon: lodgingIcon })
                break;
        }
    })

    setData(
        {
            culture: culture,
            food: food,
            travel: travel,
            local: local,
            lodging: lodging,
            attraction: attraction
        })
}