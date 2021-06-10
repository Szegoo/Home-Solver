import userModel, { Users, User, Field } from '../models/userModel';
import { Tasks } from '../models/taskModel';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Comments, Comment } from '../models/commentModel';
interface TokenRespnse {
    token: string
}
const resolvers = {
    Query: {
        Users: async () => {
            const users = await Users.find();
            return users;
        },
        getTasks: async () => {
            const tasks = await Tasks.find();
            return tasks;
        },
        getTaskById: async (root, { id }, context) => {
            const task = await Tasks.findOne({
                _id: id
            });
            console.log(task);
            return task;
        }
    },
    Mutation: {
        signup: async (root, { user }, context) => {
            const newUser: User = user;
            const usersWithEmail: any = await Users.find().where({
                email: newUser.email
            });
            if (usersWithEmail.length > 0) {
                throw new Error("User with this email already exists");
            }
            const hash = await bcrypt.hash(newUser.password, 10);
            newUser.password = hash;
            await new Users(newUser).save();
            return {
                user: newUser
            }
        },
        login: async (root, { user }, context) => {
            const dbUser: any = await Users.findOne({
                email: user.email
            });
            console.log(dbUser);
            const hash = dbUser.password;
            const isValid = await bcrypt.compare(user.password, hash);
            if (!isValid) {
                throw new Error("Password is not valid");
            }
            return {
                user: dbUser
            }
        },
        addTask: async (root, { task }, context) => {
            await new Tasks(task).save();
            return {
                task
            }
        },
        addComment: async (root, { email, password, taskId, text, image }, context) => {
            const comment: Comment = {
                taskId,
                text,
                image
            }
            const newComment = await new Comments(comment).save();
            console.log(newComment);
            return {
                success: true
            }
        }
    }
}
export default resolvers;