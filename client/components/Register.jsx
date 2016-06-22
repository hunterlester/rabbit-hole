import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { registerUser } from '../state/reducer_components/auth/user_registration/register_core';
import {Toolbar } from 'material-ui/Toolbar';
import {blue500, white, red500, green500, orange500} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

export const Register = React.createClass({
  getInitialState: function() {
    return {
      displayNameReserved: false,
      emailReserved: false,
      emailError: '',
      errorText: '',
      password: true,
      passwordError: ''
    }
  },
  handleOpen: function() {
    if(this.props.errorMessage) {
      return true;
    } else {
      return false;
    }
  },
  passwordLength: function(value) {
    if(value.length >= 12) {
      this.setState({
        password: false,
        passwordError: ''
      })
    } else {
      this.setState({
        password: true,
        passwordError: 'Password must be at least 12 characters long'
      })
    }
  },
  checkEmail: function(value) {
    let reserved = this.props.reserved_user_info.some(user => value == user.username);

    if(reserved) {
      this.setState({
        emailReserved: true,
        emailError: 'Email already registered'
      })
    } else {
      this.setState({
        emailReserved: false,
        emailError: ''
      })
    }
  },
  checkDisplayName: function(value) {

    let reserved = this.props.reserved_user_info.some(user => value == user.displayName);

    if(reserved) {
      this.setState({
        displayNameReserved: true,
        errorText: 'Already taken'
      })
    } else {
      this.setState({
        displayNameReserved: false,
        errorText: ''
      })
    }
  },
  render: function() {
    const { dispatch, isAuthenticated, errorMessage, reserved_user_info } = this.props;
    return (
      <div>
        <Snackbar
          bodyStyle={{backgroundColor: red500}}
          open={this.handleOpen()}
          message={errorMessage || ''}
          autoHideDuration={4000}
        />
      <Toolbar style={{backgroundColor: '#FF9800'}}>
      </Toolbar>
      <Toolbar style={{backgroundColor: '#FF9800'}}>
      </Toolbar>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-12'>
            <TextField fullWidth={true}
                       ref='displayName'
                       errorText={this.state.errorText}
                       onChange={(event, val) => {
                         this.checkDisplayName(val)
                       }}
                       floatingLabelText="Choose your display name" />

              <TextField fullWidth={true}
                         floatingLabelText='Enter your email address'
                         errorText={this.state.emailError}
                         onChange={(event, val) => {
                           this.checkEmail(val)
                         }}
                         ref='username'/>

               <TextField fullWidth={true}
                          floatingLabelText='Choose a strong password'
                          errorText={this.state.passwordError}
                          onChange={(event, val) => {
                            this.passwordLength(val)
                          }}
                          type='password'
                          ref='password'/>

               <RaisedButton label="Register"
                            backgroundColor={blue500}
                            disabled={this.state. password || this.state.displayNameReserved || this.state.emailReserved}
                            labelColor={white}
                            onTouchTap={() => {

                              let registerObj = {};

                              Object.keys(this.refs).map((key) => {
                                registerObj = Object.assign(registerObj, {[key]: this.refs[key].getValue()});
                              });
                              dispatch(registerUser(registerObj));

                             }}/>
          </div>
        </div>
      </div>
      </div>
    );
  }
})

function mapStateToProps(state) {
  const { errorMessage, reserved_user_info } = state.auth.toJS();
  return {
    state,
    errorMessage,
    reserved_user_info
  };
}

export const ConnectedRegister = connect(
  mapStateToProps
)(Register);
