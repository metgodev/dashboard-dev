import { useState, useLayoutEffect } from 'react'
import { useSelector } from 'react-redux';
import { client } from '../../API/metro';

const TracksTableService = (rowsPerPage, page) => {
    //global
    const { tableChanged, area, filterTable } = useSelector(s => s.mainReducer);
    // local
    const [data, setData] = useState({
        authorities: [],
        tracks: [],
        keys: [],
        ignore: [
            'authority', 'relevantTo', 'timeDurationDays', 'timeDurationHours', 'timeDuraionMinutes', 'pois', 'galleryFilesIds', 'id'
        ],
        tableCategories: {
            trackName: ['all',],
            featured: ['all',],
            description: ['all',],
        }
    })
    useLayoutEffect(() => {
        (async (areaId = area.id, autorityId = filterTable.authority) => {
            let authorities = [];
            let authority_cat = ['all'];
            let tracks = [];
            let categories = [];
            // Get all autorities
            if (!areaId) return;
            let authority = await client.service("authorities").find({ query: { areaId: areaId } });
            authority?.data.map(({ address, areaId, createdAt, email, name, _id }) => {
                authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                authority_cat = [...authority_cat, name]
            });
            // Get all tracks the autorityId
            if (!authorities.length) return;
            let SpesificAuthority = autorityId && autorityId !== 'all' ?
                { autorityId: authorities.find(a => a.name === autorityId).id, "$limit": rowsPerPage, "$skip": page * rowsPerPage } : { "$limit": rowsPerPage, "$skip": page * rowsPerPage }
            let track = await client.service("tracks").find({ query: SpesificAuthority });
            track?.data.map(({
                trackName, authorityId, relevantTo, timeDurationDays, timeDurationHours, timeDuraionMinutes, description, pois, featured, galleryFilesIds, _id
            }) => tracks = [...tracks, {
                trackName, authority: authorityId, relevantTo,
                timeDurationDays, timeDurationHours, timeDuraionMinutes, description, pois, featured, galleryFilesIds, id: _id
            }]);
            if (!tracks.length) return;
            //get all categories
            let cat = await client.service("categories").find();
            cat?.data.map(({ title, _id }) => categories = [...categories, { title, id: _id }])
            //define the keys
            let keys = Object.keys(tracks[0]).filter((el) => !data.ignore.includes(el)); keys.push('btn');
            //state init
            setData(prevState => ({
                ...prevState, authorities, tracks, keys,
                tableCategories: { ...prevState.tableCategories, category: categories, authority: authority_cat }
            }));
        })();
    }, [tableChanged])

    return data
}

export default TracksTableService
