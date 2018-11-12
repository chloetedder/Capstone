import React, { Component } from 'react';
import axios from 'axios';
import FormErrors from './FormErrors';
import { FormGroup, FormControl, Grid, Jumbotron, ControlLabel } from 'react-bootstrap';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            formErrors: {email: '', password: ''},
            registered: 1,
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.alreadyReg = this.alreadyReg.bind(this);
    }

    handleUserInput(e) {
        this.setState({
            registered: 1
        })
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
        axios.post('/signup', user)
            .then(res => {
                if(!res.data) {
                    this.setState({
                        registered: 0,
                        email: '',
                        password: ''
                    })
                }
                else {
                    this.setState({
                        registered: 2
                    })
                }
            })
            .catch(err => console.log("error"))

    }

    alreadyReg() {
        if(!this.state.registered) {
            return <p>Email already registered</p>;
        }
        if(this.state.registered === 2)
            return <p>{this.state.email} is now registered</p>;
    }

    render() {
        return (
            <Grid>
                <Jumbotron>
                <p>Registration</p>
                <form className="demo" onSubmit={this.handleSubmit}>
                        <FormGroup>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl
                            type="email"
                            className="validate"
                            value={this.state.email}
                            placeholder="Enter Email Address"
                            name="email"
                            onChange={this.handleUserInput}
                            />
                            <ControlLabel>Password</ControlLabel>
                            <FormControl
                            type="password"
                            className="validate"
                            value={this.state.password}
                            placeholder="Enter Password"
                            name="password"
                            onChange={this.handleUserInput}
                            />
                            <button onClick={this.handleSubmit} className="btn btn-primary"
                                disabled={!this.state.formValid}>Sign up</button>
                            </FormGroup>
                            <FormErrors formErrors={this.state.formErrors} />
                </form>
                {this.alreadyReg()}
                </Jumbotron>
            </Grid>
            
        )
    }
}

export default Signup;

/*
<div className="row">
                    <div className="input-field col 6">
                        <Label htmlFor="email">Email</Label>
                        <input type="email" className="validate" 
                            name="email" value={this.state.email}
                            onChange={this.handleUserInput} />
                    </div>
                    <div className="input-field col 6">
                        <Label htmlFor="password">Password</Label>
                        <input type="password" className="validate" 
                            name="password" value={this.state.password}
                            onChange={this.handleUserInput} />
                    </div>
                </div>
                <Button type="submit"
                    disabled={!this.state.formValid}>Sign up</Button>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
*/