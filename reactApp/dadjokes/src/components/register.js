
//IMPORTS
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { register } from '../actions/index';
import '../App.css';

//REGISTER FORM
class RegisterForm extends Component {
    state = {
        userInfo: {
            username: '',
            password: ''
        }
    }


    changeHandler = event => {
        event.preventDefault();
        this.setState({
            userInfo: {
                ...this.state.userInfo,
                [ event.target.name ]: event.target.value
            }
        });
    };

    submitDataHandler = event => {
        event.preventDefault();
        this.props.register( this.state.userInfo ).then( () => this.props.history.push( "/" ))
    };

    render() {
        return (
            <div className = "form-wrap">
                <form className = 'register' onSubmit={ this.submitDataHandler }>
                    <div className = "sign-header">
                        <h1>Register</h1>
                    </div>
                    <label>Username:</label>
                    <input
                        id = "username"
                        type = "text"
                        name = "username"
                        value = { this.state.userInfo.username }
                        className = 'input'
                        placeholder = "Username"
                        onChange = { this.changeHandler }
                    />
                    <label>Password:</label>
                    <input
                        id = "password"
                        type = "password"
                        name = "password"
                        value = { this.state.userInfo.password }
                        className = 'input'
                        placeholder = "Password"
                        onChange = { this.changeHandler }
                    />
                    <button type='submit' className='actButton'>Register</button>
                </form>
                <div />
            </div>
        )
    }
}

//EXPORTS
export default connect(
    null,
    { register }
)(RegisterForm)