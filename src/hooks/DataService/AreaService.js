import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';
import term from '../../terms';

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
            let categories = [];
            let tags = [];
            // -------------------===areas===-------------------
            if (!area_id) return;
            await client.service('area').find({ query: { _id: area_id } })
                .then(({ data }) => data[0].tags.map(({ title, _id }) => areaTags = [...areaTags, { title, id: _id }]));
            // -------------------===autorities===-------------------
            await client.service('authorities').find({ query: { areaId: area_id } })
                .then(({ data }) => data.map(({ address, areaId, createdAt, email, name, _id }) => {
                    authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                }));
            // -------------------===categories===-------------------
            await client.service('categories').find()
                .then(({ data }) => data.map(({ title, _id }) => categories = [...categories, { title, id: _id }]));
            // -------------------===tags===-------------------
            await client.service('tags').find()
                .then(({ data }) => data.map(({ title, _id, categoryIds }) => tags = [...tags, { title, id: _id, categoryIds: categoryIds?.map(id => categories.find(cat => cat.id === id)) }]));
            // -------------------===keys===------------------- 
            // add categoryIds to areaTags by looping through tagsIds in area
            areaTags = areaTags.map((tag) => ({ ...tag, relatedCategories: tags.find(t => t.id === tag.id)?.categoryIds?.map(({ title }) => `${term(title.toLowerCase())}, `) }))
            //-------------------===filter===-------------------
            let areaTagsKeys = Object.keys(areaTags[0]).filter((el) => !data.ignore.includes(el)); areaTagsKeys.push('actions');
            let authoritiesKeys = Object.keys(authorities[0]).filter((el) => !data.ignore.includes(el)); authoritiesKeys.push('actions');
            let tagsKeys = Object.keys(tags[0]).filter((el) => !data.ignore.includes(el)); tagsKeys.push('actions');
            // -------------------===setData===-------------------
            setData(prevState => ({ ...prevState, areaTags: areaTags.reverse(), authorities, tags, areaTagsKeys, authoritiesKeys, tagsKeys }))
        })(area.id, filterTable);
    }, [tableChanged, area, filterTable]);

    return data
}

export default AreaService;