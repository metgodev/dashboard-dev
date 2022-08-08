import { useMemo, useReducer, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { _get } from '../API/service';
import { set_app_data } from '../REDUX/actions/data.actions';


const useGetService = (url, name, query, area, reload) => {
    // global
    const _dispatch = useDispatch();
    let _data = useSelector(s => s.dataReducer.app_data);
    let dataChanged = useSelector(s => s.mainReducer.tableChanged)

    // Used to prevent state update if the component is unmounted
    let cancelRequest = useRef(false)

    const initialState = {
        error: undefined,
        data: [],
        loading: false,
        cancelRequest: () => cancelRequest.current = true
    }

    // Keep state logic separated
    const fetchReducer = (state, action) => {
        switch (action.type) {
            case 'loading':
                return { ...initialState, loading: true };
            case 'fetched':
                return { ...initialState, data: action.payload, loading: false };
            case 'error':
                return { ...initialState, error: action.payload, loading: false };
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(fetchReducer, initialState)

    useMemo(() => {
        // Do nothing if the url is not given
        if (!url || !name) return

        cancelRequest.current = false

        const fetchData = async () => {
            dispatch({ type: 'loading' })
            // If a cache exists for this url, return it
            if (_data[name] && !reload) {
                //console.log('Using cache for ' + name)
                dispatch({ type: 'fetched', payload: _data[name] })
                return
            }
            try {
                //console.log('Fetching ' + name)
                const res = await _get(url, query);
                if (!res.total) {
                    dispatch({ type: 'error', payload: 'No data found' })
                    return
                }
                _dispatch(set_app_data({ ..._data, [name]: res?.data || [] }))
                if (cancelRequest.current) return
                dispatch({ type: 'fetched', payload: res.data })
            } catch (error) {
                if (cancelRequest.current) return

                dispatch({ type: 'error', payload: error })
            }
        }

        void fetchData()

        // Use the cleanup function for avoiding a possibly...
        // ...state update after the component was unmounted
        return () => {
            cancelRequest.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [name, area, dataChanged])

    return state
}

export default useGetService;


