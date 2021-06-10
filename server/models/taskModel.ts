import { description } from 'commander';
import mongoose from 'mongoose';
import { enu } from './userModel';
import { Field } from './userModel';

export interface Task {
    taskName: string,
    description: string,
    image: string,
    field: Field,
}
const taskSchema = new mongoose.Schema({
    taskName: String,
    description: String,
    image: String,
    field: enu.value,
});

export const Tasks = mongoose.model("Tasks", taskSchema);

const test_task: Task = {
    taskName: "Add two numbers",
    description: "I need to add 5 and 6 together",
    image: "none",
    field: Field.Math
}
export default async () => {
    const newTask = await new Tasks(test_task).save();
    console.log(newTask);
}