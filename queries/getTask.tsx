import { gql, useQuery } from "@apollo/client";
import client from '../apollo-client';
import { Task } from '../server/models/taskModel';
import { useState } from 'react';

const GET_TASK = gql`
query getTaskById($id: String) {
  getTaskById(id: $id) {
    field
    taskName
    description
    image
  }
}
`
export default ({ _id }) => {
    const [isImageSelected, openImage] = useState(false);
    const { loading, error, data } = useQuery(GET_TASK, { client, variables: { id: _id } });
    if (loading) return <p>'Loading...'</p>;
    if (error) return <p>`Error! ${error.message}`</p>;
    console.log(data);
    const task: Task = data.getTaskById;
    return (
        <div className="task-full">
            <h2>{task.taskName}</h2>
            <p>{task.description}</p>
            {task.image !== "none" &&
                <img onClick={() => openImage(true)} src={task.image} />
            }
            {isImageSelected &&
                <div>
                    <div onClick={() => openImage(false)} className="background"></div>
                    <img className="full-image" src={task.image} />
                </div>
            }
        </div>
    )
}