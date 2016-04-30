import React from 'react';
import {hashHistory} from 'react-router';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import FlatButton from 'material-ui/lib/flat-button';

export default React.createClass({
  render: function() {
    return (<div>
      <TextField hintText="Email"
                 fullWidth={true}
                 ref='username'
                 floatingLabelText="Email" />

      <TextField hintText="Password"
                 fullWidth={true}
                 type='password'
                 ref='password'
                 floatingLabelText="Password" />

      <RaisedButton label="Login"
                    onTouchTap={() => {
                      let loginObj = {};

                      Object.keys(this.refs).map((key) => {
                        loginObj = Object.assign(loginObj, {[key]: this.refs[key].getValue()});
                      });

                      this.props.onLoginClick(loginObj);

                    }}/>

      <FlatButton label="Register"
                  primary={true}
                  onTouchTap={() => {
                    hashHistory.push('/register');
                  }} />
    </div>);
  }
});
