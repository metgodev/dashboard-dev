import { useEffect, useState } from "react"

const initialData = {
    name: "",
    location: {
        type: "Point",
        coordinates: [0, 0]
    }
}

export const GetFormData = (values) => {

    let formValues = {
        name: values.length || Object.keys(values).length ? values.hasOwnProperty('name') ? values.name : initialData.name : initialData.name,
        email: values.length || Object.keys(values).length ? values.hasOwnProperty('location') ? values.location : initialData.location : initialData.location,
    }

    const [returnValues, setReturnValues] = useState(formValues)

    useEffect(() => {
        setReturnValues(formValues)
    }, [values])

    return returnValues
}