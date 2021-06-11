import { Formik } from 'formik';
import * as yup from 'yup';

import { FormGroup } from '../common/FormGroup';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

export const LoginForm = () => {
    const handleFormSubmit = (e) => {
        e.preventDefault();
    };
    const initialValues = {
        email: '',
        password: '',
    };
    return (
        <Formik initialValues={initialValues} validationSchema={schema} onSubmit={handleFormSubmit}>
            {({ handleSubmit }) => (
                <form onSubmit={handleSubmit}>
                    <FormGroup>
                        <Input name="email" type="email" label="Email" />
                    </FormGroup>
                    <FormGroup>
                        <Input name="password" type="password" label="Password" />
                    </FormGroup>
                    <FormGroup>
                        <Button type="submit">Login</Button>
                    </FormGroup>
                </form>
            )}
        </Formik>
    );
};
