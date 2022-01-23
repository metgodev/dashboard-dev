import React, { useEffect, useState } from 'react'

const ResizeWindow = ({ children }) => {
    const [dimensions, setDimensions] = useState({
        height: window.innerHeight,
        width: window.innerWidth
    })

    useEffect(() => {
        function handleResize() {
            setDimensions({
                height: window.innerHeight,
                width: window.innerWidth
            })

        }
        window.addEventListener('resize', handleResize)
        return _ => {
            window.removeEventListener('resize', handleResize)

        }
    })
    console.log(dimensions)

    return (<div style={{ width: dimensions.width, height: dimensions.height }}>
        {children}
    </div>)
}

export default ResizeWindow;