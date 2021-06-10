import { gql, useQuery } from "@apollo/client";
import Router from 'next/router';
import client from '../apollo-client';
import TaskForm from '../components/taskForm';

const GET_TASKS = gql`
query getTasks {
	getTasks {
    _id
    taskName
    description
    image
    field
  }
}
`
export default () => {
    const { loading, error, data } = useQuery(GET_TASKS, { client });
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    console.log(data);
    return (
        <div className="task-container">
            <TaskForm />
            {data.getTasks.map(task =>
                <div className="task" key={task._id}>
                    <h3 onClick={() => Router.push(`/task?id=${task._id}`)}>{task.taskName}</h3>
                    <p>{task.description}</p>
                    <p className="field">{task.field[0]}</p>
                </div>
            )
            }
        </div >
    )
}