import { gql, useMutation } from '@apollo/client';
import client from '../apollo-client';
import React, { PureComponent } from 'react';
const ADD_TASK = gql`
mutation addTask($task: TaskInput) {
  addTask(task: $task) {
    taskName
    description
    image
    field
  }
}
`;
export default ({ children }) => {
    const [addTask, { data }] = useMutation(ADD_TASK, { client: client });

    return (
        <div>
            {
                React.Children.map(children, (child) => {
                    return React.cloneElement(child, { addTask });
                })
            }
        </div>
    )
}