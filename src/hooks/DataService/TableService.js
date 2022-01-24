import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';

const TableService = ({ rowsPerPage, page, ignorePage = 'businesses' }) => {
    //global
    const { businessAdded } = useSelector(s => s.mainReducer);
    const { area } = useSelector(s => s.mainRememberReducer);
    // local
    const [data, setData] = useState({
        areas: {},
        authorities: [],
        businesses: [],
        keys: [],
        ignore: {
            businesses: ['autorityId', 'contactPersonName', 'description', 'facebookPageUrl', 'galleryFileIds',
                'instagramPageUrl', 'createdAt', 'linkedInPageUrl', 'open24Hours', 'openingHours',
                'twitterPageUrl', 'userId', 'websiteUrl', 'youtubePageUrl', 'id',
                'relevantTo', 'contact'],
            events: ['autorityId', 'contactPersonName', 'description', 'facebookPageUrl', 'galleryFileIds',
                'instagramPageUrl', 'createdAt', 'linkedInPageUrl', 'open24Hours', 'openingHours',
                'twitterPageUrl', 'userId', 'websiteUrl', 'youtubePageUrl', 'id',
                'relevantTo', 'contact']
        },
        tableCategories: {
            impact: ['1-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
            status: ['private', 'public', 'pending_approval'],
            category: ['all', 'lodging', 'attraction', 'culture', 'local', 'travel', 'food'],
            tag: [],
            authority: [],
            edit: ['today', 'last_week', 'last_month'],
        }
    })

    useLayoutEffect(() => {
        (async (areaName = 'Western Negev', autorityId = "61d2eb2df58fa2f89374dbb7") => {
            localStorage.setItem('areaID', '61d2e93c927d2b5be84b2cdb') // delete in future
            let areas = {};
            let authorities = [];
            let authority_cat = [];
            let businesses = [];
            let categories = [];
            // Get all areas
            let area = await client.service("area").find();
            area?.data.map(n => areas = { ...areas, [n.name]: n._id });
            // Get all autorities
            let authority = await client.service("authorities").find({ query: { areaId: areas[areaName] } });
            authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => {
                authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                authority_cat = [...authority_cat, name]
            });
            // Get all businesses the autorityId
            let SpesificAuthority = autorityId ? { autorityId: authorities.find(a => a.id === autorityId).id } : null
            let business = await client.service("business").find({ query: { SpesificAuthority, "$limit": rowsPerPage, "$skip": page * rowsPerPage } });
            business?.data.map(({
                address, autorityId, contactPersonName, contactPersonPhoneNumber,
                createdAt, description, emailAddress, facebookPageUrl, galleryFileIds, instagramPageUrl,
                linkedInPageUrl, name, open24Hours, openingHours, phoneNumber, relevantTo, status, tagsIds,
                twitterPageUrl, updatedAt, userId, websiteUrl, youtubePageUrl, _id
            }) => businesses = [...businesses, {
                status, address, authority: authorities.find(a => a.id === autorityId).name, contactPersonName,
                createdAt, description, facebookPageUrl, galleryFileIds, instagramPageUrl,
                linkedInPageUrl, name, open24Hours, openingHours: JSON.stringify(openingHours), relevantTo, tag: tagsIds,
                twitterPageUrl, edit: new Date(updatedAt).toLocaleDateString(), userId, websiteUrl, youtubePageUrl, id: _id, autorityId,
                contact: JSON.stringify([{ whatsapp: phoneNumber }, { phone: contactPersonPhoneNumber }, { email: emailAddress }])
            }]);
            //get all categories
            let cat = await client.service("categories").find();
            cat?.data.map(({ title, _id }) => categories = [...categories, { title, id: _id }])
            //define the keys
            let keys = Object.keys(businesses[0]).filter((el) => !data.ignore[ignorePage].includes(el)); keys.push('btn');
            //state init
            setData(prevState => ({
                ...prevState, areas, authorities, businesses, keys, area,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat }
            }));
        })();
    }, [businessAdded])

    return data
}

export default TableService
