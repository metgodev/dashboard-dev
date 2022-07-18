export default (lang) => {
    switch (lang) {
        case 'en':
            return 'ltr'
        case 'he':
            return 'rtl'
        case 'ar':
            return 'rtl'
        default:
            break;
    }
}