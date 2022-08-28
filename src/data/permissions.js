const PERMISSIONS = {
    METRO_MEMBER: {
        main: true,
        dashboard: true,
        verification: true,
        business: true,
        events: true,
        locations: true,
        routes: true,
        vouchers: true,
        users: false,
        campaign: false,
        map: true,
        support: true,
        faq: true,
        error: true,
        authority: false,
        tagcategories: false,
        navigationBar: {
            area: false,
        },
        admin: false,
        users: false,
        products: false
    },
    METRO_AREA_OWNER: {
        role: 'metro area owner'
    },
    METRO_AUTHORITY_OWNER: {
        role: 'metro authority owner'
    },
    METRO_AREA_OWNER: {
        role: 'metro are owner'
    },
    METRO_SUPER_ADMIN: {
        main: true,
        dashboard: true,
        verification: true,
        business: true,
        events: true,
        locations: true,
        routes: true,
        vouchers: true,
        users: true,
        campaign: true,
        map: true,
        support: true,
        faq: true,
        error: true,
        authority: true,
        tagcategories: true,
        navigationBar: {
            area: true,
        },
        admin: true,
        users: true,
        products: true
    }
}

export default PERMISSIONS