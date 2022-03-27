import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';
import stringify_nested from '../../utils/stringify_nested';
import term from '../../terms';

const PointsTableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        pois: [],
        keys: [],
        ignore: [
            'address', 'relevantTo', 'addressType', 'categoriesIds', 'isAccessable', 'description', 'websiteUrl', 'locationInfo', 'location', 'gallery',
            'authorityId', 'galleryFileIds', 'arrivalRecommendations', 'phoneNumber', 'webpageUrl', 'contactEmail', 'id', 'createdAt', 'updatedAt', '__v'
        ],
        stringifyExept: ['tags', 'activitiesInPlace', 'exclusiveFor'],
        tableCategories: {
            status: ['all', 'private', 'public', 'pending_approval'],
            poiName: ['all',],
            activitiesInPlace: ['all',],
            exclusiveFor: ['all',],
            prefferedSeason: ['all', "summer", "winter", "fall", "spring"],
            shady: ['all', "full", "partial", "none"],
            arrivalRecommendations: ['all',],
        }
    })

    useLayoutEffect(() => {
        (async (area_id = area.id, authority_id = filterTable.authority) => {
            let authorities = [];
            let authority_cat = ['all'];
            let pois = [];
            let categories = [];
            let keys = [];
            // -------------------===autorities===-------------------
            if (!area_id) return;
            await client.service('authorities').find({ query: { areaId: area_id } })
                .then(({ data }) => data.map(({ address, areaId, createdAt, email, name, _id }) => {
                    authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                    authority_cat = [...authority_cat, name]
                }))
            // -------------------===pois===-------------------
            await client.service('pois').find({ query: { areaId: area_id, $limit: rowsPerPage, $skip: page * rowsPerPage, $sort: { createdAt: -1 } } })
                .then(({ data }) => data.map(({ status, authority, _id, prefferedSeason, shady, ...rest }) =>
                    pois = [...pois, {
                        status, authority: authority?.name, id: _id, prefferedSeason: term(prefferedSeason.toLowerCase()),
                        shady: term(shady.toLowerCase()), ...rest
                    }]))
            // -------------------===categories===-------------------
            await client.service('categories').find()
                .then(({ data }) => data.map(({ name, _id }) => categories = [...categories, { name, id: _id }]))
            // -------------------===keys===-------------------
            if (pois.length) {
                keys = Object.keys(pois[0]).filter((el) => !data.ignore.includes(el));
                keys.push('btn');
            }
            // -------------------===set data===-------------------
            setData(prevState => ({
                ...prevState, authorities, pois: stringify_nested(pois, data.stringifyExept), keys,
                tableCategories: {
                    ...prevState.tableCategories, category: categories, authority: authority_cat
                }
            }));
        })(area.id, filterTable.authority)
    }, [tableChanged, area, filterTable])

    return data
}

export default PointsTableService
