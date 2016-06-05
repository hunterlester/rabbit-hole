import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import {registerUser} from '../state/user_registration/register_core';

export const Register = React.createClass({
  render: function() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;

    return (
      <div>

      <TextField hintText="Display Name"
                 fullWidth={true}
                 ref='displayName'
                 floatingLabelText="Display Name" />

        <TextField fullWidth={true}
                   floatingLabelText='Email'
                   hintText='Email'
                   ref='username'/>

         <TextField fullWidth={true}
                    floatingLabelText='Password'
                    hintText='Password'
                    type='password'
                    ref='password'/>

        <TextField fullWidth={true}
                   floatingLabelText='Confirm Password'
                   hintText='Confirm Password'
                   type='password'
                   ref='password2'/>

         <RaisedButton label="Register"
                       onTouchTap={() => {

                        if (this.refs.password.getValue() !== this.refs.password2.getValue()) {
                          this.refs.password2.setErrorText("Passwords not matched");
                        } else {
                          let registerObj = {};

                          Object.keys(this.refs).filter((key) => {
                            if (key !== "password2") {
                              return key;
                            }
                          }).map((key) => {
                            registerObj = Object.assign(registerObj, {[key]: this.refs[key].getValue()});
                          });
                          dispatch(registerUser(registerObj));
                        }

                       }}/>
      </div>
    );
  }
})

function mapStateToProps(state) {
  return {
    state
  };
}

export const ConnectedRegister = connect(
  mapStateToProps
)(Register);
