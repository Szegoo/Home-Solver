import { gql } from 'apollo-server-express';

export default gql`
    type User {
        _id: String,
        email: String,
        username: String,
        password: String,
        field: [String]
    }
    input TaskInput{
        taskName: String
        description: String
        image: String
        field: [String]
    }
    type LoginResponse {
        user: User
    }
    type Response {
        success: Boolean
    }
    type Task {
        _id: String
        taskName: String
        description: String
        image: String
        field: [String]
    }
    input LoginUserInput {
        email: String,
        password: String
    }
    input UserInput {
        username: String,
        email: String,
        field: [String],
        password: String!
    }
    type Query {
        Users: [User]
        getTasks: [Task]
        getTaskById(id: String): Task
    }
    type Mutation {
        signup(user: UserInput): LoginResponse
        login(user: LoginUserInput): LoginResponse
        addTask(task: TaskInput): Task
        addComment(
            taskId: String!,
            text: String!,
            image: String!
        ): Response
    }
    schema {
        query: Query,
        mutation: Mutation
    }
`