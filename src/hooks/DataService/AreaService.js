import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';
import intersect_between_objects from '../../utils/intersect_between_objects';
import stringify_nested from '../../utils/stringify_nested';

const AreaService = () => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        areaTags: [],
        authorities: [],
        tags: [],
        areaTagsKeys: [],
        authoritiesKeys: [],
        tagsKeys: [],
        ignore: [
            'id', 'categoryId', 'createdAt', 'updatedAt', 'areaId'
        ],
    })

    useLayoutEffect(() => {
        (async (area_id = area.id) => {
            let areaTags = [];
            let authorities = [];
            let tags = [];
            // -------------------===areas===-------------------
            if (!area_id) return;
            await client.service('area').find({ query: { _id: area_id } })
                .then(({ data }) => data[0].tags.map(({ title, _id, categoryId }) => areaTags = [...areaTags, { title, id: _id, categoryId }]));
            // -------------------===autorities===-------------------
            await client.service('authorities').find({ query: { areaId: area_id } })
                .then(({ data }) => data.map(({ address, areaId, createdAt, email, name, _id }) => {
                    authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                }));
            // -------------------===tags===-------------------
            await client.service('tags').find()
                .then(({ data }) => data.map(({ title, _id, categoryId }) => tags = [...tags, { title, id: _id, categoryId }]));
            // -------------------===keys===-------------------
            let areaTagsKeys = Object.keys(areaTags[0]).filter((el) => !data.ignore.includes(el));
            let authoritiesKeys = Object.keys(authorities[0]).filter((el) => !data.ignore.includes(el));
            let tagsKeys = Object.keys(tags[0]).filter((el) => !data.ignore.includes(el));
            // -------------------===setData===-------------------
            setData(prevState => ({ ...prevState, areaTags, authorities, tags, areaTagsKeys, authoritiesKeys, tagsKeys }))
        })(area.id, filterTable);
    }, [tableChanged, area, filterTable]);

    return data
}

export default AreaService;