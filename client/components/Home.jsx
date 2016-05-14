import React from 'react';
import {hashHistory} from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Login from './Login';

import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';
import IconButton from 'material-ui/lib/icon-button';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import FlatButton from 'material-ui/lib/flat-button';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import Badge from 'material-ui/lib/badge';
import NotificationsIcon from 'material-ui/lib/svg-icons/social/notifications';


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
            <Toolbar>
              <ToolbarGroup firstChild={true} float="left">
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
              <ToolbarGroup lastChild={false} float='right'>
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
