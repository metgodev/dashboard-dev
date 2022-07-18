import { useEffect, useState } from "react"

const initialData = {
    areaId: "",
    phoneNumber: "",
    email: "",
    name: "",
    address: ""
}

export const GetFormData = (values, picker) => {

    let formValues = {
        areaId: values.length || Object.keys(values).length ? values.hasOwnProperty('area') ? values.area.name : initialData.areaId : initialData.areaId,
        phoneNumber: values.length || Object.keys(values).length ? values.hasOwnProperty('phoneNumber') ? values.phoneNumber : initialData.phoneNumber : initialData.phoneNumber,
        email: values.length || Object.keys(values).length ? values.hasOwnProperty('email') ? values.email : initialData.email : initialData.email,
        name: values.length || Object.keys(values).length ? values.hasOwnProperty('name') ? values.name : initialData.name : initialData.name,
        address: values.length || Object.keys(values).length ? values.hasOwnProperty('address') ? values.address : initialData.address : initialData.address,
    }

    const [returnValues, setReturnValues] = useState(formValues)

    useEffect(() => {
        setReturnValues(formValues)
    }, [values])

    return returnValues
}