import mongoose from 'mongoose';

export enum Field {
    Math = "Math",
    Physics = "Physics",
    English = "English",
    Biology = "Biology",
    ComputerScience = "ComputerScience",
    History = "History",
    Chemistry = "Chemistry",
    Geography = "Geography",
    None = "None"
}
export var enu = {
    value: ["Math", "Physics", "English", "Biology", "ComputerScience",
        "History", "Chemistry", "Geography", "None"]
}
export interface User {
    username: string,
    email: string,
    password: string,
    field: Field
}
const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    field: enu.value
});

export const Users = mongoose.model('Users', userSchema);

const testUser = {
    email: 'test@gmail.com',
    username: 'test',
    password: '1234',
    field: "Math"
}
export default () => {
    const newTestUser = new Users(testUser).save();
    console.log(newTestUser);
}