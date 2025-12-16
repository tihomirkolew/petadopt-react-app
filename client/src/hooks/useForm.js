import { useState } from "react";

export default function useForm(initialValues, validate, onSubmit) {

    const [values, setValues] = useState(initialValues);
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
        const { name, value } = e.target;

        setValues(state => ({
            ...state,
            [name]: value
        }));

        if (errors[name]) {
            setErrors(state => ({ ...state, [name]: undefined }));
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        const validationErrors = validate(values);

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});

        try {
            await onSubmit(values);
        } catch (err) {
            setErrors({ general: err.message})
        }
    }

    return ({
        values,
        errors,
        changeHandler,
        submitHandler,
        setValues
    });
}
