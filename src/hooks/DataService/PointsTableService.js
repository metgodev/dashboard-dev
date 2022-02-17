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
            'address', 'addressType', 'categoriesIds', 'relevantTo', 'isAccessable', 'description', 'websiteUrl',
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
            await client.service('pois').find({ query: { "$limit": rowsPerPage, "$skip": page * rowsPerPage } })
                .then(({ data }) => data.map(({ authorityId, _id, ...rest }) => pois = [...pois, { authority: authorities.find(el => el.id === authorityId)?.name, id: _id, ...rest }]))
            // -------------------===categories===-------------------
            await client.service('categories').find()
                .then(({ data }) => data.map(({ name, _id }) => categories = [...categories, { name, id: _id }]))
            // -------------------===keys===-------------------
            let keys = Object.keys(pois[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            // -------------------===set data===-------------------
            setData(prevState => ({
                ...prevState, authorities, pois, keys,
                tableCategories: {
                    ...prevState.tableCategories, category: categories, authority: authority_cat
                }
            }));
        })(area.id, filterTable.authority)
    }, [tableChanged, area, filterTable])


    return data
}

export default PointsTableService
