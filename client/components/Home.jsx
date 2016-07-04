import React from 'react';
import {hashHistory} from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Login from './Login';

import {Tabs, Tab} from 'material-ui/Tabs';

import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Info from 'material-ui/svg-icons/action/info';
import Snackbar from 'material-ui/Snackbar';
import { red500, green500 } from 'material-ui/styles/colors';


import { loginUser, logoutUser } from '../state/reducer_components/auth/user_login/login_actions_core';
import { getProfile } from '../state/reducer_components/profile/core';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
};

export const Home = React.createClass({
  getInitialState() {
    return {
      value: this.props.location.pathname
    };
  },
  handleSnackbar: function() {
    if(this.props.errorMessage || this.props.confirmMessage) {
      return true;
    } else {
      return false;
    }
  },
  componentWillReceiveProps(nextProps) {
    this.setState({
      value: nextProps.location.pathname
    });
  },
  handleChange: function(value) {
    this.setState({
      value: value
    })
  },
  render: function () {
    const { dispatch, isAuthenticated, errorMessage, user, isFetching, confirmMessage } = this.props;
    let snackbarColor;
    if(errorMessage) {
      snackbarColor = red500;
    } else if(confirmMessage) {
      snackbarColor = green500;
    }
    return (
      <div>
        <Snackbar
          bodyStyle={{backgroundColor: snackbarColor}}
          open={this.handleSnackbar()}
          message={errorMessage || confirmMessage || ''}
          autoHideDuration={4000}
        />

        {!isAuthenticated &&
          <Login location={this.props.location.pathname} dispatch={dispatch} onLoginClick={ creds => dispatch(loginUser(creds)) }/>
        }

        {isAuthenticated &&
          <div>
            <div className='container-fluid'>
              <div className="row">
                <Toolbar style={{backgroundColor: '#FF9800'}}>
                  <ToolbarGroup>
                    <ToolbarTitle style={{color: '#ffffff'}} text="Learnimus" />
                  </ToolbarGroup>
                  <ToolbarGroup lastChild={true} float='right'>
                    <IconMenu
                      iconButtonElement={
                        <FlatButton labelStyle={{color: '#ffffff'}} hoverColor='#FF9800' label={user.displayName}/>
                      }
                    >
                      <MenuItem primaryText="Profile & Settings" onTouchTap={() => {
                        dispatch(getProfile(user._id))
                      }} />
                      <MenuItem primaryText="About" onTouchTap={() => {
                        hashHistory.push('/about');
                      }} />
                      <MenuItem primaryText="Logout" onTouchTap={() => {
                        dispatch(logoutUser());
                      }}/>
                    </IconMenu>
                  </ToolbarGroup>
                </Toolbar>

                <Tabs value={this.state.value} onChange={this.handleChange}>
                  <Tab style={{
                    fontSize: '1.2em'
                  }} value='/' label="Subjects" onActive={() => {
                    hashHistory.push('/')
                  }}>
                  </Tab>
                  <Tab style={{
                    fontSize: '1.2em'
                  }} value='/echoes' label="Community" onActive={() => {
                    hashHistory.push('/echoes')
                  }}>

                  </Tab>
                </Tabs>
                </div>
            </div>
            <div className="container">
              {this.props.children}
            </div>
          </div>
        }
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { isAuthenticated, user, isFetching, errorMessage } = state.auth.toJS();
  const { message } = state.notify.toJS();
  let confirmMessage;
  if(message) {
    if(typeof message != 'string') {
      confirmMessage = 'A confirmation has been sent to your email address';
    } else {
      confirmMessage = message;
    }
  }
  return {
    isAuthenticated,
    user,
    isFetching,
    errorMessage,
    confirmMessage: confirmMessage
  };

}

export const ConnectedHome = connect(mapStateToProps)(Home);
