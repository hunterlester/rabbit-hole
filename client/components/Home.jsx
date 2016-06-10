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
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import { loginUser, logoutUser } from '../state/user_login/login_actions_core';
import {getProfile} from '../state/profile_actions/core';

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
    const { dispatch, isAuthenticated, errorMessage, user } = this.props;
    return (
      <div>

        {!isAuthenticated &&
          <Login onLoginClick={ creds => dispatch(loginUser(creds)) }/>
        }

        {isAuthenticated &&
          <div>
            <div className='container-fluid'>
              <div className="row">
                <Toolbar >
                  <ToolbarGroup float='right'>
                    <ToolbarTitle style={{
                      color: '#263238',
                      fontSize: '18px'
                    }} text="Rabbit Hole Help" />

                      <IconMenu
                        iconButtonElement={
                          <IconButton touch={true}>
                            <Badge primary={true} badgeContent={0}>
                            </Badge>
                          </IconButton>
                        }
                      >
                        <MenuItem primaryText="notification 1" />
                        <MenuItem primaryText="notification 2" />
                        <MenuItem primaryText="notification 3" />
                      </IconMenu>

                      <IconMenu
                        iconButtonElement={
                          <IconButton touch={true}>
                            <MoreVertIcon />
                          </IconButton>
                        }
                      >
                        <MenuItem primaryText="Settings" />
                        <MenuItem primaryText="Profile" onTouchTap={() => {
                          dispatch(getProfile(user._id))
                        }} />
                        <MenuItem primaryText="Logout" onTouchTap={() => {
                          dispatch(logoutUser());
                        }}/>
                      </IconMenu>
                  </ToolbarGroup>
                </Toolbar>
                <Tabs value={this.state.value} onChange={this.handleChange}>
                  <Tab value='/' label="Study" onActive={() => {
                    hashHistory.push('/')
                  }}>
                  </Tab>
                  <Tab value='/echoes' label="Activity" onActive={() => {
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
  const { isAuthenticated, user } = state.auth.toJS();
  return {
    isAuthenticated,
    user
  };

}

export const ConnectedHome = connect(mapStateToProps)(Home);
