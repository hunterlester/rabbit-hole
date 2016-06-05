import React from 'react';
import {hashHistory} from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Login from './Login';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/FlatButton';
import Badge from 'material-ui/Badge';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

import { loginUser, logoutUser } from '../state/user_login/login_actions_core';
import {getProfile} from '../state/profile_actions/core';

export const Home = React.createClass({
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
                <Toolbar>
                  <ToolbarGroup firstChild={false} >
                    <ToolbarTitle text="Rabbit Hole" />

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

                    <FlatButton
                      label={`${user.displayName} - Points: ${user.points}`}
                      onTouchTap={() => {
                        dispatch(getProfile(user._id))
                      }} />


                  </ToolbarGroup>
                  <ToolbarGroup lastChild={true} float='right'>
                    <IconMenu
                      iconButtonElement={
                        <IconButton touch={true}>
                          <MoreVertIcon />
                        </IconButton>
                      }
                    >
                      <MenuItem primaryText="Settings" />
                      <MenuItem primaryText="Profile" />
                      <MenuItem primaryText="Logout" onTouchTap={() => {
                        dispatch(logoutUser());
                      }}/>
                    </IconMenu>
                    <FlatButton label="Study Maps" onTouchTap={() => {
                      hashHistory.push('/')
                    }} />
                    <ToolbarSeparator />
                    <FlatButton label="Activity Echoes" onTouchTap={() => {
                      hashHistory.push('/echoes')
                    }} />

                  </ToolbarGroup>
                </Toolbar>
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
