import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';

const EventstableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        events: [],
        keys: [],
        ignore: [
            "authorityId", "categoryId", "address", "tag", "relevantTo", "currency", "producerName", "producerPhone",
            "producerEmail", "reservationCenterPhone", "reservationCenterEmail", "updatedAt", "websiteUrl", "id"
        ],
        tableCategories: {
            openHour: ['all'],
            tags: ['all'],
            category: ['all'],
            price: ['all',],
            startDate: ['all',],
            endDate: ['all', 'today', 'last_week', 'last_month'],
        }
    })

    useLayoutEffect(() => {
        (async (area_id = area.id, authority_id = filterTable.authority) => {
            let authorities = [];
            let authority_cat = ['all'];
            let events = [];
            let categories = [];
            // Get all autorities
            if (!area_id) return;
            let authority = await client.service("authorities").find({ query: { areaId: area_id } });
            authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => {
                authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                authority_cat = [...authority_cat, name]
            });
            if (!authorities.length) return;
            let SpesificAuthority = authority_id && authority_id !== 'all' ?
                { autorityId: authorities.find(a => a.name === authority_id).id, "$limit": rowsPerPage, "$skip": page * rowsPerPage } : { "$limit": rowsPerPage, "$skip": page * rowsPerPage }
            let event = await client.service("events").find({ query: SpesificAuthority });
            event?.data.map(({
                address, authorityId, categoryId, currency, endDate, name, openHour, price, producerEmail, producerName, producerPhone,
                relevantTo, reservationCenterEmail, reservationCenterPhone, startDate, tags, updatedAt, websiteUrl, _id
            }) => events = [...events, {
                address, authorityId, categoryId, currency, endDate: new Date(endDate).toLocaleDateString(), name, openHour, price, producerEmail, producerName, producerPhone,
                relevantTo, reservationCenterEmail, reservationCenterPhone, startDate: new Date(startDate).toLocaleDateString(), tag: tags, updatedAt, websiteUrl, id: _id
            }]);
            if (!events.length) return;
            //get all categories
            let cat = await client.service("categories").find();
            cat?.data.map(({ title, _id }) => categories = [...categories, { title, id: _id }])
            // //define the keys
            let keys = Object.keys(events[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            // //state init
            setData(prevState => ({
                ...prevState, authorities, events, keys,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat }
            }));
        })();
    }, [tableChanged, area])

    return data
}

export default EventstableService
