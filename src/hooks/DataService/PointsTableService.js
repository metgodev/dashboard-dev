import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';
import stringify_nested from '../../utils/stringify_nested';

const PointsTableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        pois: [],
        keys: [],
        ignore: [
            'address', 'relevantTo', 'addressType', 'categoriesIds', 'isAccessable', 'description', 'websiteUrl', 'locationInfo', 'location',
            'authorityId', 'galleryFileIds', 'arrivalRecommendations', 'phoneNumber', 'webpageUrl', 'contactEmail', 'id', 'createdAt', 'updatedAt', '__v'
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
            // -------------------===autorities===-------------------
            if (!area_id) return;
            await client.service('authorities').find({ query: { areaId: area_id } })
                .then(({ data }) => data.map(({ address, areaId, createdAt, email, name, _id }) => {
                    authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                    authority_cat = [...authority_cat, name]
                }))
            // -------------------===pois===-------------------
            await client.service('pois').find({ query: { "$limit": rowsPerPage, "$skip": page * rowsPerPage, "$sort": { createdAt: 1 } } })
                .then(({ data }) => data.map(({ authority, _id, ...rest }) => pois = [...pois, { authority: authority?.name, id: _id, ...rest }]))
            // -------------------===categories===-------------------
            await client.service('categories').find()
                .then(({ data }) => data.map(({ name, _id }) => categories = [...categories, { name, id: _id }]))
            // -------------------===keys===-------------------
            if (!pois.length) return;
            let keys = Object.keys(pois[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            // -------------------===set data===-------------------
            setData(prevState => ({
                ...prevState, authorities, pois: stringify_nested(pois, 'tags'), keys,
                tableCategories: {
                    ...prevState.tableCategories, category: categories, authority: authority_cat
                }
            }));
        })(area.id, filterTable.authority)
    }, [tableChanged, area, filterTable])

    return data
}

export default PointsTableService
