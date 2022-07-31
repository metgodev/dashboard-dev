// import { useLayoutEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { _get } from '../API/service';
// import {
//     set_business_data,
//     set_event_data,
//     set_point_data,
//     set_map_data,
//     set_area_data,
// } from '../REDUX/actions/data.actions';

// const request = {
//     business: set_business_data,
//     event: set_event_data,
//     point: set_point_data,
//     map: set_map_data,
//     area: set_area_data,
// }

// const useGetService = (type, request, query) => {
//     // global
//     const _dispatch = useDispatch();
//     const _data = useSelector(s => s.dataReducer);

//     useLayoutEffect(() => {
//         (async () => {
//             try {
//                 console.log(_data[type], '_data')
//             // if there is no data in the store, fetch it
//             if (!_data[type]) {
//                 let data = await _get(type, query);
//                 _dispatch(request(data));


//             }
//         )()
//     }, [])

// }
