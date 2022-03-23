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
            'relevantTo', 'timeDurationDays', 'timeDurationHours', 'timeDuraionMinutes', 'pois', 'galleryFilesIds', 'createdAt', 'updatedAt', '__v', 'id'
        ],
        tableCategories: {
            status: ['all', 'private', 'public', 'pending_approval'],
            trackName: ['all',],
            featured: ['all',],
            description: ['all',],
        }
    })

    useLayoutEffect(() => {
        (async (area_id = area.id, authority_id = filterTable.authority) => {
            let authorities = [];
            let authority_cat = ['all'];
            let tracks = [];
            let categories = [];
            let keys = [];
            // -------------------===autorities===-------------------
            if (!area_id) return;
            await client.service('authorities').find({ query: { areaId: area_id } })
                .then(({ data }) => data.map(({ address, areaId, createdAt, email, name, _id }) => {
                    authorities = [...authorities, { address, areaId, createdAt, email, name, id: _id }]
                    authority_cat = [...authority_cat, name]
                }))
            // -------------------===tracks===-------------------
            await client.service('tracks').find({ query: { authorityId: authorities.map(({ id }) => id), $limit: rowsPerPage, $skip: page * rowsPerPage, $sort: { createdAt: 1 } } })
                .then(({ data }) => data.map(({ status, authority, _id, ...rest }) => {
                    tracks = [...tracks, { status, authority: authority?.name, id: _id, ...rest }]
                }))
            // -------------------===categories===-------------------
            await client.service('categories').find()
                .then(({ data }) => data.map(({ name, _id }) => categories = [...categories, { name, id: _id }]))
            // -------------------===keys===-------------------
            if (tracks.length) {
                keys = Object.keys(tracks[0]).filter((el) => !data.ignore.includes(el));
                keys.push('btn');
            }
            // -------------------===set data===-------------------
            setData(prevState => ({
                ...prevState, authorities, tracks, keys,
                tableCategories: {
                    ...prevState.tableCategories,
                    authority: authority_cat,
                    trackName: [...new Set(tracks.map(({ trackName }) => trackName))],
                    featured: [...new Set(tracks.map(({ featured }) => featured))],
                    description: [...new Set(tracks.map(({ description }) => description))],
                }
            }))
        })(area.id, filterTable.authority)
    }, [tableChanged, area, filterTable])

    return data
}

export default TracksTableService
