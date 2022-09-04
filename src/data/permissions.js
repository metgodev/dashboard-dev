const PERMISSIONS = {
    METRO_MEMBER: {
        main: true,
        dashboard: true,
        verification: true,
        business: false,
        events: false,
        locations: true,
        routes: false,
        vouchers: true,
        users: true,
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
        admin: true,
        users: true,
        products: false,
        calendar: true,
        status_change: false
    },
    METRO_AREA_OWNER: {
        role: 'metro area owner'
    },
    METRO_AUTHORITY_OWNER: {
        role: 'metro authority owner'
    },
    METRO_BUSINESS_OWNER: {
        main: true,
        dashboard: true,
        verification: false,
        business: true,
        events: true,
        locations: false,
        routes: false,
        vouchers: false,
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
        products: false,
        calendar: false,
        status_change: false
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
        products: true,
        calendar: true,
        status_change: true
    }
}

export default PERMISSIONS