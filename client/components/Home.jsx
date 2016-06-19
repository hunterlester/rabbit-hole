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
import {Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import Info from 'material-ui/svg-icons/action/info';
import Dialog from 'material-ui/Dialog';

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
                <Dialog
                  modal={false}
                  open={this.state.open}
                  onRequestClose={() => {
                    this.handleClose()
                  }}
                >
                  <h4>Learnimus is a play on the Latin verb, discimus, meaning 'We learn.'</h4>
                </Dialog>
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
                      <MenuItem primaryText="About" />
                      <MenuItem primaryText="Logout" onTouchTap={() => {
                        dispatch(logoutUser());
                      }}/>
                    </IconMenu>
                    <ToolbarTitle style={{color: '#263238'}} text="Learnimus" />
                    <IconButton touch={true} onTouchTap={() => {
                      this.handleOpen();
                    }}>
                      <Info />
                    </IconButton>
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
  const { isAuthenticated, user } = state.auth.toJS();
  return {
    isAuthenticated,
    user
  };

}

export const ConnectedHome = connect(mapStateToProps)(Home);
