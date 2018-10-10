import React, { Component } from 'react';
import axios from 'axios';
import FormErrors from './FormErrors';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
    }

    handleUserInput(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value }, () => {this.validateField(name, value)});
    }

    validateField(fieldName, value) {
        let errors = this.state.formErrors;
        let emailValid = this.state.emailValid;
        let passwordValid = this.state.passwordValid;

        switch(fieldName) {
            case 'email':
                emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
                errors.email = emailValid ? '' : ' is invalid';
                break;
            case 'password':
                passwordValid = value.length >= 6;
                errors.password = passwordValid ? '': ' is too short';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: errors,
            emailValid: emailValid,
            passwordValid: passwordValid
        }, this.validateForm);
    }

    validateForm() {
        this.setState({formValid: this.state.emailValid && this.state.passwordValid});
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', user).then(res => {
            console.log(res);
        })

    }
    render() {
        console.log("in render");
        return (
            <form className="demo">
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" className="form-control" 
                        name="email" value={this.state.email}
                        onChange={(event) => this.handleUserInput(event)} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" 
                        name="password" value={this.state.password}
                        onChange={(event) => this.handleUserInput(event)} />
                </div>
                <button type="submit" className="btn btn-primary"
                    disabled={!this.state.formValid}
                    onSubmit={event => this.handleSubmit(event)}>Sign up</button>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            </form>
        )
    }
}

export default Form;