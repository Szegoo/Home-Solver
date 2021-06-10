import App from 'next/app';
import '../styles/styles.scss';
import store from '../redux/store';
import { Provider } from 'react-redux';

class MyApp extends App {
    render() {
        const { children, pageProps, Component } = this.props;
        return (
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        )
    }
}
export default MyApp;