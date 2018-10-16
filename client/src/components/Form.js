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
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleUserInput(e) {
        e.preventDefault();
        const name = e.target.name;
        const value = e.target.value;
        this.setState({[name]: value }, () => {this.validateField(name, value)});
        console.log(this.state.email);
        console.log(this.state.password);
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
        console.log(user);
        axios.post('/login', user)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log("error"))

    }
    render() {
        return (
            <form className="demo" onSubmit={this.handleSubmit}>
                <div className="row">
                    <div className="input-field col 6">
                        <label htmlFor="email">Email</label>
                        <input type="email" className="validate" 
                            name="email" value={this.state.email}
                            onChange={this.handleUserInput} />
                    </div>
                    <div className="input-field col 6">
                        <label htmlFor="password">Password</label>
                        <input type="password" className="validate" 
                            name="password" value={this.state.password}
                            onChange={this.handleUserInput} />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary"
                    disabled={!this.state.formValid}>Sign up</button>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            </form>
        )
    }
}

export default Form;