import { gql, useMutation } from '@apollo/client';
import client from '../apollo-client';
import React, { Component } from 'react'
const LOGIN = gql`
    mutation login($user:LoginUserInput) {
        login(user: $user) {
            user {
            email
            username
            field
            }
        }
    }
`;
export default ({ children }) => {

    const [login, { data }] = useMutation(LOGIN, { client: client });
    return (
        <div>
            {
                React.Children.map(children, (child) => {
                    return React.cloneElement(child, { login });
                })
            }
        </div>
    )
}