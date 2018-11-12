
import React, { Component } from 'react';
import axios from 'axios';
import FormErrors from './FormErrors';
import { FormControl, Grid, Jumbotron, ControlLabel, FormGroup } from 'react-bootstrap';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            loggedin: 1,
            formErrors: {email: '', password: ''},
            emailValid: false,
            passwordValid: false,
            formValid: false
        }
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.checkingStatus = this.checkingStatus.bind(this);
    }

    handleUserInput(e) {
        e.preventDefault();
        this.setState({
            loggedin: 1
        })
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
        axios.post('/login', user)
            .then(res => {
                if(!res.data) {
                    this.setState({
                        loggedin: 0,
                        password: ''
                    })
                }
                else if(res.data.invalid === 2) {
                    this.setState({
                        loggedin: 2,
                        email: '',
                        password: ''
                    })
                }
                else {
                    this.setState({
                        loggedin: 3,
                        email: '',
                        password: ''
                    })
                }
            })
            .catch(err => console.log("error", err.response))

    }

    checkingStatus() {
        if(!this.state.loggedin)
            return <p>Re-enter password</p>;
        if(this.state.loggedin === 2)
            return <p>Email not registered</p>;
        if(this.state.loggedin === 3)
            return <p>Successfully logged in!</p>;
    }

    render() {

        return (
            <Grid>
                <Jumbotron>
                <p>Login</p>
                <form className="demo">
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
                        >Login</button>
                    </FormGroup>
                    <FormErrors formErrors={this.state.formErrors} />
                </form>
                {this.checkingStatus()}
                </Jumbotron>
            </Grid>
        )
        
    }
}

export default Form;

/*
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
                    disabled={!this.state.formValid}>Login</button>
                <div className="panel panel-default">
                    <FormErrors formErrors={this.state.formErrors} />
                </div>
            </form>
        )

        */