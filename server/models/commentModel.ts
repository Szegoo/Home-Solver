import mongoose from 'mongoose';

export interface Comment {
    taskId: String,
    text: String,
    image: String
}

const commentSchema = new mongoose.Schema({
    taskId: String,
    text: String,
    image: String
});

export const Comments = mongoose.model('Comments', commentSchema);
const test_comment: Comment = {
    taskId: "60be1270e00df855dc57cee3",
    text: "The result 5 + 6 = 11",
    image: "none"
}
export default async () => {
    const newComment = await new Comments(test_comment).save();
    console.log(newComment);
}
