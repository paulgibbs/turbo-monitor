import { useField } from 'formik';

import { FieldMessage } from './FieldMessage';

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <>
            <label>{label}</label>
            <input {...field} {...props} />
            {meta.touched && meta.error ? <FieldMessage context="error">{meta.error}</FieldMessage> : null}
        </>
    );
};

Input.displayName = 'Input';

export { Input };
