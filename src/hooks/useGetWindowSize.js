import { useState, useLayoutEffect } from 'react'
// See: https://usehooks-ts.com/react-hook/use-event-listener
import useEventListener from './useEventListener'

function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
        width: 0,
        height: 0,
    })

    const handleSize = () => {
        setWindowSize({
            width: window.innerWidth,
            height: window.innerHeight,
        })
    }

    useEventListener('resize', handleSize)

    // Set size at the first client-side load
    useLayoutEffect(() => {
        handleSize()
    }, [])

    return windowSize
}

export default useWindowSize