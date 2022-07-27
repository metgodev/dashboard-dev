import term from "../../../../terms";

export const initialState = (area, user) => {
    return (
        {
            status: 'PENDING_APPROVAL',
            userId: user.id,
            areaId: area?.id?.toString(),
        }
    )
}

export const Picker = {
    relevantTo: [
        { id: 'INFANCY', title: term('infancy') },
        { id: 'KIDS', title: term('kids') },
        { id: 'YOUTH', title: term('youth') },
        { id: 'ALL_FAMILY', title: term('all_family') },
        { id: 'YOUNG_ADULTS', title: term('young_adults') },
        { id: 'ADULTS', title: term('adults') },
        { id: 'FAMALIES', title: term('families') },
        { id: 'GOLDEN_AGE', title: term('golden_age') },
        { id: 'WOMEN_ONLY', title: term('women_only') },
        { id: 'MEN_ONLY', title: term('men_only') },
    ],
    pois: [{ id: 'something', title: 'something' }],
    timeDurationDays: [
        { values: 'HOUR', name: term('hour') },
        { values: 'HOUR_TO_THREE', name: term('between_an_hour_and_three_hours') },
        { values: 'HALF_A_DAY', name: term('half_a_day') },
        { values: 'FULL_DAY', name: term('full_day') },
        { values: 'MORE_THAN_TWO_DAYS', name: term('more_than_two_days') },
    ]
};