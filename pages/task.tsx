import React from 'react';
import Router from 'next/router';
import GetTask from '../queries/getTask';
import Layout from '../components/Layout';
export default class Task extends React.PureComponent {
    state = {
        _id: ''
    }
    componentDidMount() {
        const path = Router.asPath;
        let index = path.indexOf('=');
        const id = path.substring(index + 1);
        this.setState({ _id: id });
    }
    render() {
        const { _id } = this.state;
        return (
            <div>
                <Layout />
                <GetTask _id={_id} />
            </div>
        )
    }
}