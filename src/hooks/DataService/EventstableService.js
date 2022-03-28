import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import client from '../../API/metro';
import intersect_between_objects from '../../utils/intersect_between_objects';
import stringify_nested from '../../utils/stringify_nested';

const EventstableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        events: [],
        keys: [],
        ignore: [
            "authorityId", "userId", 'gallery', 'galleryFileIds', 'description', "categoryId", "address", "endDate",
            "relevantTo", "currency", "producerName", "producerPhone", "producerEmail", "locationName", 'isAccessable', "reservationCenterPhone",
            "galleryFileIds", "reservationCenterEmail", "updatedAt", "websiteUrl", "id", 'createdAt', 'location', 'locationInfo', '__v'
        ],
        tableCategories: {
            status: ['all', 'private', 'public', 'pending_approval'],
            authority: ['all'],
            openHour: ['all'],
            tag: ['all'],
            category: ['all'],
            price: ['all',],
            startDate: ['all',],
            endDate: ['all', 'today', 'last_week', 'last_month'],
            startDate: ['all', 'today', 'last_week', 'last_month'],
        }
    })

    useLayoutEffect(() => {
        (async (area_id = area.id, authority_id = filterTable.authority) => {
            let authorities = [];
            let authority_cat = ['all'];
            let events = [];
            let categories = [];
            let tags = [];
            let keys = [];
            // -------------------===tags===-------------------
            if (!area_id) return;
            await client.service('area').find({ query: { _id: area_id } })
                .then(({ data }) => data[0].tags.map(({ title, _id, categoryId }) => tags = [...tags, { title, id: _id, categoryId }]));
            // -------------------===autorities===-------------------
            if (!area_id) return;
            await client.service('authorities').find({ query: { areaId: area_id } })
                .then(({ data }) => data.map(({ address, areaId, createdAt, email, name, _id }) => {
                    authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                    authority_cat = [...authority_cat, name]
                }))
            // -------------------===events===-------------------
            await client.service('events').find({ query: { areaId: area_id, $limit: rowsPerPage, $skip: page * rowsPerPage, $sort: { createdAt: -1 } } })
                .then(({ data }) => data.map(({ status, authority, endDate, startDate, tags: tagsIds, _id, ...rest }) => {
                    events = [...events, {
                        status, authority: authority?.name, endDate: new Date(endDate).toLocaleDateString(),
                        startDate: new Date(startDate).toLocaleDateString(), tag: intersect_between_objects(tagsIds, tags, 'title'), id: _id, ...rest
                    }]
                }))
            // -------------------===categories===-------------------
            await client.service('categories').find()
                .then(({ data }) => data.map(({ title, _id }) => categories = [...categories, { title, id: _id }]));
            // -------------------===keys===-------------------
            if (events.length) {
                keys = Object.keys(events[0]).filter((el) => !data.ignore.includes(el));
                keys.push('btn');
            }
            // -------------------===set data===-------------------
            setData(prevState => ({
                ...prevState, authorities, events: stringify_nested(events, 'tags'), keys,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat, tag: [...new Set(tags.map(t => t.title))] }
            }));
        })(area.id, filterTable.authority);
    }, [tableChanged, area, filterTable]);

    return data
}

export default EventstableService
