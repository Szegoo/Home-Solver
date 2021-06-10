import { PureComponent } from 'react';
import { uploadImage } from '../lib/api';
import AddTaskMutation from '../mutations/addTask';
import Router from 'next/router';
import React from 'react';
class TaskForm extends React.PureComponent {
    state = {
        taskName: '',
        description: '',
        field: []
    }
    componentDidMount() {
        this.postData = new FormData();
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const { addTask } = this.props;
        const { taskName, description, field } = this.state;
        const post = this.postData;
        console.log(post.get('image'));
        uploadImage(post).then(async res => {
            const image = res.image;
            await addTask({ variables: { task: { taskName, description, field, image } } }).then(() => {
            })
            Router.push('/');
        });
    }
    handleChange = (e) => {
        let inputValue;
        if (e.target.name === "image") {
            inputValue = e.target.files[0];
        } else if (e.target.name === "field") {
            inputValue = [e.target.value];
            this.setState({ field: inputValue });
        } else {
            inputValue = e.target.value;
            this.setState({ [e.target.name]: inputValue })
        }
        this.postData.set(e.target.name, inputValue);
    }
    render() {
        return (
            <form>
                <input onChange={this.handleChange} name="taskName" placeholder="Enter the task name" />
                <textarea onChange={this.handleChange} name="description" placeholder="Enter the task description" />
                <label htmlFor="image">Upload image:{"(Optional)"}</label>
                <input accept="image/*" onChange={this.handleChange} name="image" type="file" />
                <select name="field" onChange={this.handleChange}>
                    <option value="Math">Math</option>
                    <option value="Biology">Biology</option>
                    <option value="Physics">Physics</option>
                    <option value="English">English</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="History">History</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Geography">Geography</option>
                </select>
                <button onClick={this.handleSubmit}>Submit</button>
            </form>
        )
    }
}
export default () => {
    return (
        <AddTaskMutation>
            <TaskForm />
        </AddTaskMutation>
    )
}