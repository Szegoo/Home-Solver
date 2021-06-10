import Layout from '../components/Layout';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import GetTasks from '../queries/getTasks';
import LoginMutation from '../mutations/Login';
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/reducers/user'
import React, { useState, useEffect, use } from 'react';

const Index = ({ login }) => {
    function gotoLoginPage() {
        Router.push("/get-started");
    }
    const dispatch = useDispatch();
    useEffect(() => {
        console.log(localStorage.getItem('email'));
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        if (email && password && !user.user) {
            try {
                login({ variables: { user: { email, password } } })
                    .then((res) => {
                        console.log(res.data.login);
                        dispatch(setUser(res.data.login));
                    });
            } catch (err) {
            }
        } else {
            localStorage.setItem('isLoggedIn', 'no');
        }
    })
    let userProfile = null
    var { user } = useSelector(state => state.user);
    if (user) {
        userProfile = user.user;
    }
    return (
        <div>
            <Layout />
            {userProfile ?
                (
                    <div>
                        <GetTasks />
                    </div>
                ) : (
                    <main>
                        <h1>HomeSolver</h1>
                        <button onClick={gotoLoginPage}>get started</button>
                        <h3>for only 14.99$ per month</h3>
                    </main>
                )
            }
        </div>
    )
}
export default () => {
    return (
        <LoginMutation>
            <Index />
        </LoginMutation>
    )
}