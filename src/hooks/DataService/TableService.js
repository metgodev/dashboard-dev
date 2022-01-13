import { useState, useLayoutEffect } from 'react'
import { client } from '../../API/metro';

const TableService = ({ rowsPerPage, page }) => {
    // local
    const [data, setData] = useState({
        areas: {},
        authorities: [],
        businesses: [],
        ignore: ['contactPersonName',
            'description', 'facebookPageUrl', 'galleryFileIds', 'instagramPageUrl',
            'linkedInPageUrl', 'open24Hours', 'openingHours',
            'twitterPageUrl', 'userId', 'websiteUrl', 'youtubePageUrl', 'id', 'relevantTo', 'contact']
    })

    useLayoutEffect(() => {
        (async (areaName = "Western Negev", autorityId = "61d2eb2df58fa2f89374dbb7") => {
            let areas = {};
            let authorities = [];
            let businesses = [];
            // Get all areas
            let area = await client.service("area").find({ "$limit": rowsPerPage, "$skip": page * rowsPerPage });
            area?.data.map(n => areas = { ...areas, [n.name]: n._id });
            // Get all autorities
            let authority = await client.service("authorities").find({ query: { areaId: areas[areaName] } });
            authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]);
            // Get all businesses
            let business = await client.service("business").find({ query: { autorityId: authorities.find(a => a.id === autorityId).id } });
            business?.data.map(({
                address, autorityId, contactPersonName, contactPersonPhoneNumber,
                createdAt, description, emailAddress, facebookPageUrl, galleryFileIds, instagramPageUrl,
                linkedInPageUrl, name, open24Hours, openingHours, phoneNumber, relevantTo, status, tagsIds,
                twitterPageUrl, updatedAt, userId, websiteUrl, youtubePageUrl, _id
            }) => businesses = [...businesses, {
                address, authority: autorityId, contactPersonName,
                createdAt, description, facebookPageUrl, galleryFileIds, instagramPageUrl,
                linkedInPageUrl, name, open24Hours, openingHours: JSON.stringify(openingHours), relevantTo, status, tag: tagsIds,
                twitterPageUrl, edit: updatedAt, userId, websiteUrl, youtubePageUrl, id: _id,
                contact: JSON.stringify([{ 'whatsapp': phoneNumber }, { 'phone': contactPersonPhoneNumber }, { 'email': emailAddress }])
            }]);
            setData(prevState => ({ ...prevState, areas, authorities, businesses }))
        })();
    }, [])


    return data
}

export default TableService
