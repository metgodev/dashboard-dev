import Notify from "../../pages/notifications/Notifications"
import term from "../../terms"

export const helperText = (name) => {
    switch (name) {
        case 'address':
            return term('address_helper')
        case 'locationName':
            return term('location_name_helper')
        case 'location':
            return term('location_helper')
        case 'name':
            return term('name_helper')
        case 'description':
            return term('description_helper')
        case 'tagsIds':
            return term('tags_helper')
        case 'authorityId':
            return term('authority_helper')
        case 'phoneNumber':
            return term('phone_number_helper')
        case 'contactPersonName':
            return term('contact_person_name_helper')
        case 'contactPersonPhoneNumber':
            return term('contact_person_phone_number_helper')
        case 'emailAddress':
            return term('email_address_helper')
        case 'relevantTo':
            return term('relevant_to_helper')
        case 'openingHours':
            return term('opening_hours_helper')
        case 'websiteUrl':
            return term('website_url_helper')
        case 'facebookPageUrl':
            return term('facebook_url_helper')
        case 'instagramPageUrl':
            return term('instagram_url_helper')
        case 'twitterPageUrl':
            return term('twitter_url_helper')
        case 'youtubePageUrl':
            return term('youtube_url_helper')
        case 'linkedInPageUrl':
            return term('linkedin_url_helper')
        case 'startDate':
            return term('start_date_helper')
        case 'endDate':
            return term('end_date_helper')
        case 'tags':
            return term('tags_helper')
        case 'openHour':
            return term('open_hour_helper')
        case 'price':
            return term('price_helper')
        case 'currency':
            return term('currency_helper')
        case 'producerName':
            return term('producer_name_helper')
        case 'producerPhone':
            return term('producer_phone_helper')
        case 'producerEmail':
            return term('producer_email_helper')
        case 'reservationCenterPhone':
            return term('reservation_center_phone_helper')
        case 'reservationCenterEmail':
            return term('reservation_center_email_helper')
        case 'categoryId':
            return term('category_helper')
        default:
            return;
    }
}

export const FormValidator = (rule, value) => {
    switch (rule) {
        case 'requierd':
            !value && Notify(`${value}${term('is_requierd')}`, 'error', Math.random())
            return !value
        case 'email':
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) && Notify(`${value}${term('email_is_not_valid')}`, 'error', Math.random())
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        case 'phone':
            /^\d{10}$/.test(value) && Notify(`${value}${term('phone_is_not_valid')}`, 'error', Math.random())
            return /^\d{10}$/.test(value)
        case 'number':
            !isNaN(value) && Notify(`${value}${term('is_not_number')}`, 'error', Math.random())
            return !isNaN(value)
        default:
            break;
    }
}
