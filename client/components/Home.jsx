import React from 'react';
import {hashHistory} from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Login from './Login';

import {Tabs, Tab} from 'material-ui/Tabs';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Info from 'material-ui/svg-icons/action/info';
import Snackbar from 'material-ui/Snackbar';
import { red500 } from 'material-ui/styles/colors';


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
      open: false,
      value: this.props.location.pathname
    };
  },
  handleSnackbar: function() {
    if(this.props.errorMessage) {
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
  handleClose: function() {
    this.setState({
      open: false
    })
  },
  handleOpen: function() {
    this.setState({
      open: true
    })
  },
  render: function () {
    const { dispatch, isAuthenticated, errorMessage, user, isFetching } = this.props;
    return (
      <div>
        <Snackbar
          bodyStyle={{backgroundColor: red500}}
          open={this.handleSnackbar()}
          message={errorMessage || ''}
          autoHideDuration={4000}
        />

        {!isAuthenticated &&
          <Login onLoginClick={ creds => dispatch(loginUser(creds)) }/>
        }

        {isAuthenticated &&
          <div>
            <div className='container-fluid'>
              <div className="row">
                <Toolbar style={{backgroundColor: '#FF9800'}}>
                  <ToolbarGroup firstChild={true}>
                    <IconMenu
                      iconButtonElement={
                        <IconButton touch={true}>
                          <MoreVertIcon />
                        </IconButton>
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
                    <ToolbarTitle text="Learnimus" />
                    <ToolbarTitle text={user.displayName} />
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
  return {
    isAuthenticated,
    user,
    isFetching,
    errorMessage
  };

}

export const ConnectedHome = connect(mapStateToProps)(Home);
