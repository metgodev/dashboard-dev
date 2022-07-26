import { useRef, useCallback, useReducer } from 'react';
import { _get } from '../API/service';


export default (key) => {
    // local refs
    const data = useRef({});
    const cancelRequest = useRef(false)

    // reducer    
    const initialState = {
        error: undefined,
        [key]: undefined,
        isLoading: false,
    }


    const reducer = (state, action, service) => {
        switch (action.type) {
            case 'loading':
                return { ...state, error: undefined, [service]: undefined, loading: true }
            case 'fetched':
                return { ...state, error: undefined, [service]: action.payload, loading: false }
            case 'error':
                return { ...state, error: action.payload, [service]: undefined, loading: false }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    // get all the data
    const _get_data = useCallback(async (service, options, custom_service_name) => {
        // return if cancel request
        if (cancelRequest.current) return;
        try {
            // cherck if there is cache inside the data object service or custom_service_name
            if (data.current[service] || data.current[custom_service_name]) {
                dispatch({ type: 'fetched', payload: data.current[service] || data.current[custom_service_name] })
                return data.current[service] || data.current[custom_service_name]
            } else {
                dispatch({ type: 'loading', payload: undefined })
                const res = await _get(service, options)
                if (res.error) {
                    dispatch({ type: 'error', payload: res.message })
                } else {
                    data.current[service] = res.data
                    dispatch({ type: 'fetched', payload: res.data })
                }
                return res.data
            }
        } catch (err) {
            dispatch({ type: 'error', payload: err })
            console.log(`error fetching data from useService ${err}`)
        } finally {
            cancelRequest.current = false
        }
    }, [])

    const cancel_requests = useCallback(() => {
        cancelRequest.current = true
    }, [])

    const is_cached = useCallback((service) => {
        // check if the service is cached in the cache
        return Object.keys(data.current).filter(key => service.includes(key)).length > 0
    }, [])

    return { _get_data, cancel_requests, is_cached, loading: state.loading, _data: state, caches: data.current }

}
