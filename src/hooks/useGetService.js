import { useRef, useCallback, useReducer } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { _get } from '../API/service';
import { set_cache_data } from '../REDUX/actions/main.actions';

const useGetService = () => {
    const _dispatch = useDispatch();
    const cache = useSelector(s => s.mainReducer.cache);
    // Used to prevent state update if the component is unmounted
    const cancelRequest = useRef(false)
    // declare src of data
    let src = '';
    const initialState = {
        error: undefined,
        [src]: undefined,
    }

    const reducer = (state, action) => {
        switch (action.type) {
            case 'loading':
                return { ...state, error: undefined, [src]: undefined, loading: true }
            case 'fetched':
                return { ...state, error: undefined, [src]: action.payload, loading: false }
            case 'error':
                return { ...state, error: action.payload, [src]: undefined, loading: false }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    const _get_service = useCallback(async (service, options, reload, custom_name) => {
        let src = custom_name ? custom_name : service;
        try {
            // chack if the service or the custom_name is in cache
            if (cache[src]) {
                dispatch({ type: 'fetched', payload: cache[src] })
            }
            // if not, then fetch the data
            else {
                dispatch({ type: 'loading' })
                const response = await _get(service, options);
                if (cancelRequest.current) {
                    return;
                }
                dispatch({ type: 'fetched', payload: response.data })
                _dispatch(set_cache_data({ [src]: response.data }))
            }
        } catch (err) {
            dispatch({ type: 'error', payload: err })
            console.log(`error fetching data from useService ${err}`)
        } finally {
            cancelRequest.current = false
        }
    }, [cache])

    const cancel_requests = useCallback(() => {
        cancelRequest.current = true
    }, [])

    // check  if the service is cached in the cache
    const is_cached = useCallback((service) => {
        return Object.keys(cache).filter(key => service.includes(key)).length > 0
    }, [])

    return { _get_service, cancel_requests, is_cached, cache: cache, error: state.error, loading: state.loading, _data: state }

}

export default useGetService;
