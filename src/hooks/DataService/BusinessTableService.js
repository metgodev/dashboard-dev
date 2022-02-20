import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';
import intersect_between_objects from '../../utils/intersect_between_objects';
import stringify_nested from '../../utils/stringify_nested';

const BusinessTableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        businesses: [],
        keys: [],
        ignore: [
            'address', 'contact', 'contactPersonName', 'createdAt', 'description', 'facebookPageUrl', 'gallery', 'galleryFileIds',
            'id', 'instagramPageUrl', 'linkedInPageUrl', 'location', 'locationInfo', 'open24Hours', 'openingHours',
            'relevantTo', 'twitterPageUrl', 'userId', 'websiteUrl', 'youtubePageUrl', '__v'
        ],
        tableCategories: {
            impact: ['all', '1-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
            status: ['all', 'private', 'public', 'pending_approval'],
            category: ['all', 'lodging', 'attraction', 'culture', 'local', 'travel', 'food'],
            tag: ['all',],
            authority: ['all',],
            edit: ['all', 'today', 'last_week', 'last_month'],
        }
    })


    useLayoutEffect(() => {
        (async (area_id = area.id) => {
            let authorities = [];
            let authority_cat = ['all'];
            let businesses = [];
            let categories = [];
            let tags = [];
            // -------------------===tags===-------------------
            await client.service('tags').find()
                .then(({ data }) => data.map(({ title, _id, categoryId }) => tags = [...tags, { title, id: _id, categoryId }]));
            // -------------------===autorities===-------------------
            if (!area_id) return;
            await client.service('authorities').find({ query: { areaId: area_id } })
                .then(({ data }) => data.map(({ address, areaId, createdAt, email, name, _id }) => {
                    authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                    authority_cat = [...authority_cat, name]
                }));
            // -------------------===businesses===-------------------
            await client.service('business').find({ query: { "$limit": rowsPerPage, "$skip": page * rowsPerPage, "$sort": { createdAt: 1 } } })
                .then(({ data }) => data.map(({
                    status, autorityId, contactPersonPhoneNumber, emailAddress, phoneNumber, tagsIds, updatedAt, _id, ...rest
                }) => businesses = [...businesses, {
                    status, authority: authorities.find(a => a.id === autorityId)?.name,
                    tag: intersect_between_objects(tagsIds, tags, 'title'), edit: new Date(updatedAt).toLocaleDateString(), id: _id,
                    contact: [{ whatsapp: phoneNumber }, { phone: contactPersonPhoneNumber }, { email: emailAddress }], ...rest
                }]));
            // -------------------===categories===-------------------
            await client.service('categories').find()
                .then(({ data }) => data.map(({ title, _id }) => categories = [...categories, { title, id: _id }]));
            // -------------------===keys===-------------------
            let keys = Object.keys(businesses[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            // -------------------===setData===-------------------
            setData(prevState => ({
                ...prevState, authorities, businesses: stringify_nested(businesses, 'tag'), keys,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat, tag: [...new Set(tags.map(t => t.title))] }
            }));
        })(area.id, filterTable);
    }, [tableChanged, area, filterTable]);

    return data
}

export default BusinessTableService;
