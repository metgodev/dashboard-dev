import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';

const PointsTableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        pois: [],
        keys: [],
        ignore: [
            'authority', 'address', 'addressType', 'categoriesIds', 'relevantTo', 'isAccessable', 'description',
            'websiteUrl', 'authorityId', 'galleryFileIds', 'arrivalRecommendations', 'phoneNumber', 'webpageUrl', 'contactEmail'
        ],
        tableCategories: {
            poiName: ['all',],
            activitiesInPlace: ['all',],
            exclusiveFor: ['all',],
            prefferedSeason: ['all',],
            shady: ['all',],
            arrivalRecommendations: ['all',],
        }
    })
    useLayoutEffect(() => {
        (async (area_id = area.id, authority_id = filterTable.authority) => {
            let authorities = [];
            let authority_cat = ['all'];
            let pois = [];
            let categories = [];
            // Get all autorities
            if (!area_id) return;
            let authority = await client.service("authorities").find({ query: { areaId: area_id } });
            authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => {
                authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                authority_cat = [...authority_cat, name]
            });
            // Get all point of intrest the autorityId
            if (!authorities.length) return;
            let SpesificAuthority = authority_id && authority_id !== 'all' ?
                { autorityId: authorities.find(a => a.name === authority_id).id, "$limit": rowsPerPage, "$skip": page * rowsPerPage } : { "$limit": rowsPerPage, "$skip": page * rowsPerPage }
            let points = await client.service("pois").find({ query: SpesificAuthority });
            points?.data.map(({
                poiName, address, addressType, categoriesIds, relevantTo, isAccessable, description, websiteUrl, authorityId, galleryFileIds,
                activitiesInPlace, exclusiveFor, prefferedSeason, shady, arrivalRecommendations, phoneNumber, webpageUrl, contactEmail
            }) => pois = [...pois, {
                poiName, address, addressType, categoriesIds, relevantTo, isAccessable, description, websiteUrl,
                authority: authorityId, galleryFileIds, activitiesInPlace, exclusiveFor, prefferedSeason, shady,
                arrivalRecommendations, phoneNumber, webpageUrl, contactEmail,
            }]);
            if (!pois.length) return;
            //get all categories
            let cat = await client.service("categories").find();
            cat?.data.map(({ title, _id }) => categories = [...categories, { title, id: _id }])
            //define the keys
            let keys = Object.keys(pois[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            //state init
            setData(prevState => ({
                ...prevState, authorities, pois, keys,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat }
            }));
        })();
    }, [tableChanged])

    return data
}

export default PointsTableService
