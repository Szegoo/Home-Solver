import { gql, useMutation } from '@apollo/client';
import client from '../apollo-client';
import React, { Component } from 'react'
const SIGNUP = gql`
        mutation signup($user:UserInput) {
        signup(user: $user) {
            user
        }
    }
`;
export default ({ children }) => {

    const [signup, { data }] = useMutation(SIGNUP, { client: client });
    return (
        <div>
            {
                React.Children.map(children, (child) => {
                    return React.cloneElement(child, { signup });
                })
            }
        </div>
    )
}
