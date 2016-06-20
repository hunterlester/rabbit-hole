import React from 'react';
import {connect} from 'react-redux';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { registerUser } from '../state/reducer_components/auth/user_registration/register_core';
import {Toolbar } from 'material-ui/Toolbar';
import {blue500, white, red500} from 'material-ui/styles/colors';
import Snackbar from 'material-ui/Snackbar';

export const Register = React.createClass({
  handleOpen: function() {
    if(this.props.errorMessage) {
      return true;
    } else {
      return false;
    }
  },
  render: function() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
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
                            backgroundColor={blue500}
                            labelColor={white}
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
        </div>
      </div>
      </div>
    );
  }
})

function mapStateToProps(state) {
  const { errorMessage } = state.auth.toJS();
  return {
    state,
    errorMessage
  };
}

export const ConnectedRegister = connect(
  mapStateToProps
)(Register);
