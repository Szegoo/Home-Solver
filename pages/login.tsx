import LoginForm from '../preact-components/login-form';
import Layout from '../components/Layout';
import LoginMutation from '../mutations/Login';
export default function Login() {
    return (
        <div>
            <Layout />
            <LoginMutation>
                <LoginForm />
            </LoginMutation>
        </div>
    )
}