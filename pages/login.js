import { Layout } from '../components/layout/Layout';
import { Page } from '../components/layout/Page';
import { LoginForm } from '../components/forms/LoginForm';

export default function Login() {
    return (
        <Layout>
            <Page>
                <LoginForm />
            </Page>
        </Layout>
    );
}
