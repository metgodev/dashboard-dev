import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';

const PointsTableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        poi: [],
        keys: [],
        ignore: [],
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
            let poi = [];
            let categories = [];
            // Get all autorities
            if (!areaId) return;
            let authority = await client.service("authorities").find({ query: { areaId: areaId } });
            authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => {
                authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                authority_cat = [...authority_cat, name]
            });
            // Get all point of intrest the autorityId
            if (!authorities.length) return;
            let SpesificAuthority = autorityId && autorityId !== 'all' ?
                { autorityId: authorities.find(a => a.name === autorityId).id, "$limit": rowsPerPage, "$skip": page * rowsPerPage } : { "$limit": rowsPerPage, "$skip": page * rowsPerPage }
            let points = await client.service("pois").find({ query: SpesificAuthority });
            points?.data.map(({
                poiName, address, addressType, categoriesIds, relevantTo, isAccessable, description, websiteUrl, authorityId, galleryFileIds,
                activitiesInPlace, exclusiveFor, prefferedSeason, shady, arrivalRecommendations, phoneNumber, webpageUrl, contactEmail
            }) => poi = [...poi, {
                poiName, address, addressType, categoriesIds, relevantTo, isAccessable, description, websiteUrl,
                authority: authorities.find(a => a.id === authorityId).name, galleryFileIds,
                activitiesInPlace, exclusiveFor, prefferedSeason, shady, arrivalRecommendations, phoneNumber, webpageUrl, contactEmail
            }]);
            if (!points.length) return;
            //get all categories
            let cat = await client.service("categories").find();
            cat?.data.map(({ title, _id }) => categories = [...categories, { title, id: _id }])
            //define the keys
            let keys = Object.keys(poi[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            //state init
            setData(prevState => ({
                ...prevState, authorities, poi, keys,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat }
            }));
        })();
    }, [tableChanged])

    return data
}

export default PointsTableService
