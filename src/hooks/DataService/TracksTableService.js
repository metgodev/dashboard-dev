import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';

const TracksTableService = (rowsPerPage, page) => {
    //global
    const { businessAdded, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        businesses: [],
        keys: [],
        ignore: ['autorityId', 'contactPersonName', 'description', 'facebookPageUrl', 'galleryFileIds',
            'instagramPageUrl', 'createdAt', 'linkedInPageUrl', 'open24Hours', 'openingHours',
            'twitterPageUrl', 'userId', 'websiteUrl', 'youtubePageUrl', 'id',
            'relevantTo', 'contact'],
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
        (async (areaId = area.id, autorityId = filterTable.authority) => {
            let authorities = [];
            let authority_cat = ['all'];
            let businesses = [];
            let categories = [];
            // Get all autorities
            if (!areaId) return;
            let authority = await client.service("authorities").find({ query: { areaId: areaId } });
            authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => {
                authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                authority_cat = [...authority_cat, name]
            });
            // Get all businesses the autorityId
            if (!authorities.length) return;
            let SpesificAuthority = autorityId && autorityId !== 'all' ?
                { autorityId: authorities.find(a => a.name === autorityId).id, "$limit": rowsPerPage, "$skip": page * rowsPerPage } : { "$limit": rowsPerPage, "$skip": page * rowsPerPage }
            let business = await client.service("business").find({ query: SpesificAuthority });
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
            let keys = Object.keys(businesses[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            //state init
            setData(prevState => ({
                ...prevState, authorities, businesses, keys,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat }
            }));
        })();
    }, [businessAdded])

    return data
}

export default TracksTableService
