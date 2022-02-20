import { useEffect, useState } from 'react'

const useValidator = () => {
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);


    const validate = (rule, value) => {
        console.log(rule, value)
        switch (rule) {
            case 'isRequierd':
                setIsValid(!!value)
                setError(value ? '' : 'is required')
                break;
            case 'isEmail':
                setIsValid(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value))
                setError(value ? '' : 'is not valid email')
                break;
            case 'isPhone':
                setIsValid(/^\d{10}$/.test(value))
                setError(value ? '' : 'is not valid phone')
                break;
            case 'isNumber':
                setIsValid(!isNaN(value))
                setError(value ? '' : 'is not valid number')
                break;
            case 'isMin':
                setIsValid(value >= rule)
                setError(value ? '' : 'is not valid min')
                break;
            case 'isMax':
                setIsValid(value <= rule)
                setError(value ? '' : 'is not valid max')
                break;
            case 'isMinLength':
                setIsValid(value.length >= rule)
                setError(value ? '' : 'is not valid min length')
                break;
            case 'isMaxLength':
                setIsValid(value.length <= rule)
                setError(value ? '' : 'is not valid max length')
                break;
            case 'isEqual':
                setIsValid(value === rule)
                setError(value ? '' : 'is not valid equal')
                break;
            default:
                break;
        }
    }

    return [error, isValid, validate]
}

export default useValidator

