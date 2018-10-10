import React, { Component } from 'react';
import axios from 'axios';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
        this.handleUsername = this.handleUsername.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    handleUsername(event) {
        event.preventDefault();
        this.setState({ username: event.target.value });
    }

    handlePassword(event) {
        event.preventDefault();
        this.setState({ password: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({
            username: event.target.value,
            password: event.target.value
        })
        axios.post('/login', {
            username: this.state.username,
            password: this.state.password
        })
        .then(res => {
            console.log(res, 'added');
        })
        .catch(err => {
            console.log(err, 'not in');
        });
        this.setState({
            username: '',
            password: ''
        })
    }

    render() {
        return (
            <div className="login-form">
                <label>Email</label>
                <input type="text" onChange={this.handleUsername} value={this.state.username} placeholder="email@gmail.com" />
                <label>Password</label>
                <input type="text" onChange={this.handlePassword} value={this.password} placeholder="..." />
                <button onClick={this.handleSubmit} type="submit">Submit</button>
            </div>
        )
    }
}

export default Login;