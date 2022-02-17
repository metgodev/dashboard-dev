import { useEffect, useState } from 'react'

const useValidator = ({ rule, value }) => {
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState({
        isValid: false,
        isRequierd: false,
        isEmail: false,
        isPhone: false,
        isNumber: false,
        isMin: false,
        isMax: false,
        isMinLength: false,
        isMaxLength: false,
        isEqual: false,
    })

    const validate = () => {
        switch (rule) {
            case 'isRequierd':
                setIsValid({ isValid: !!value, isRequierd: true })
                setError(value ? '' : 'is required')
                break;
            case 'isEmail':
                setIsValid({ isValid: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value), isEmail: true })
                setError(value ? '' : 'is not valid email')
                break;
            case 'isPhone':
                setIsValid({ isValid: /^\d{10}$/.test(value), isPhone: true })
                setError(value ? '' : 'is not valid phone')
                break;
            case 'isNumber':
                setIsValid({ isValid: !isNaN(value), isNumber: true })
                setError(value ? '' : 'is not valid number')
                break;
            case 'isMin':
                setIsValid({ isValid: value >= rule, isMin: true })
                setError(value ? '' : 'is not valid min')
                break;
            case 'isMax':
                setIsValid({ isValid: value <= rule, isMax: true })
                setError(value ? '' : 'is not valid max')
                break;
            case 'isMinLength':
                setIsValid({ isValid: value.length >= rule, isMinLength: true })
                setError(value ? '' : 'is not valid min length')
                break;
            case 'isMaxLength':
                setIsValid({ isValid: value.length <= rule, isMaxLength: true })
                setError(value ? '' : 'is not valid max length')
                break;
            case 'isEqual':
                setIsValid({ isValid: value === rule, isEqual: true })
                setError(value ? '' : 'is not valid equal')
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        if (rule, value) {
            validate()
        }
    }, [rule, value])

    return [error, isValid]
}

export default useValidator

