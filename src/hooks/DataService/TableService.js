import React, { useState, useLayoutEffect } from 'react'
import { client } from '../../API/metro';

const TableService = ({ rowsPerPage, page }) => {
    // local
    const [data, setData] = useState({
        areas: {},
        autorities: [],
        businesses: []
    })


    useLayoutEffect(() => {
        (async (rowsPerPage, page, areaName = "Western Negev", autorityId = "61d2eb2df58fa2f89374dbb7") => {
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
                address, autorityId, contactPersonName, contactPersonPhoneNumber,
                createdAt, description, emailAddress, facebookPageUrl, galleryFileIds, instagramPageUrl,
                linkedInPageUrl, name, open24Hours, openingHours, phoneNumber, relevantTo, status, tagsIds,
                twitterPageUrl, updatedAt, userId, websiteUrl, youtubePageUrl, id: _id
            }]);
            setData({ areas, authorities, businesses })
            // console.log(areas, 'areas')
            // console.log(authorities, 'authorities')
            // console.log(businesses, 'businesses')
        })();
    }, [])

    return data
}

export default TableService

// businesses_table: [
//     {
//       id: 0,
//       status: statuses[Math.floor(Math.random() * statuses.length)],
//       name: "שם העסק",
//       impact: Math.floor(Math.random() * 100) + 1,
//       category: "אוכל",
//       tag: "מסעדות ובתי קפה",
//       authority: "שער הנגב",
//       address: "שדרות",
//       edit: new Date().toLocaleDateString(),
//       contact: ['whatsapp', 'phone', 'email']
//     },
// ]

// tableCategories: {
//     impact: ['1-10', '10-20', '20-30', '30-40', '40-50', '50-60', '60-70', '70-80', '80-90', '90-100'],
//     status: ['private', 'public', 'pending'],
//     category: ['all', 'lodging', 'attraction', 'culture', 'local', 'travel', 'food'],
//     tag: ['all', 'lodging', 'attraction', 'culture', 'local', 'travel', 'food'],
//     authority: ['ashdod', 'askelon'],
//     edit: ['last week', 'last month']
//   }