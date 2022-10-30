import { useEffect, useState } from 'react'

function ImpactValue() {

    const [randomValue, setRandomValue] = useState(0)

    useEffect(() => {
        setRandomValue(parseInt((Math.random() * 100) + 1))
    }, [])

    return (
        <div style={
            {
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '20px',
                color: randomValue < 33 ? 'red' : randomValue < 66 ? '#F99524' : '#47D803',
            }}>
            <div style={{
                width: '50%',
                backgroundColor: '#ECECEC',
                height: '35px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '5px',
                marginTop: '2px'
            }}>
                {`${randomValue}%`}
            </div>
        </div >
    )
}

export default ImpactValue