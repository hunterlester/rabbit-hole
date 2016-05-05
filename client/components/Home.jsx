import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import LinkForm from './LinkForm';
import Login from './Login';

import AppBar from 'material-ui/lib/app-bar';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import CreateNewFolder from 'material-ui/lib/svg-icons/file/create-new-folder';
import MenuItem from 'material-ui/lib/menus/menu-item';
import IconButton from 'material-ui/lib/icon-button';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

import { loginUser } from '../state/user_login/login_actions_core';
import { postStudyMap, postLink } from '../state/api/actions';
import moment from 'moment';

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  getStudyMaps: function() {
    return this.props.study_maps || [];
  },
  getStudyMapLinks: function() {
    return this.props.study_maps
  },
  render: function () {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div>

        {!isAuthenticated &&
          <Login onLoginClick={ creds => dispatch(loginUser(creds)) }/>
        }

        {isAuthenticated &&
          <div>
              <div>
                <AppBar
                  title='Rabbit Hole'
                  onTitleTouchTap={() => {
                    hashHistory.push('/');
                  }}
                  iconElementRight={false}
                  iconElementRight={
                    <IconMenu
                      iconButtonElement={
                        <IconButton><MoreVertIcon /></IconButton>
                      }
                      targetOrigin={{horizontal: 'right', vertical: 'top'}}
                      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                    >
                      <MenuItem primaryText="Settings" />
                      <MenuItem primaryText="Help" />
                      <MenuItem primaryText="Sign out" />
                    </IconMenu>
                  }
                />
              </div>

              <div>
                <h3>Link Quick Entry</h3>
                <LinkForm studyMaps={this.props.study_maps} postLink={(linkObj) => dispatch(postLink(linkObj))} />
              </div>

              <div>
                <h3>
                  Subjects
                  <CreateNewFolder onClick={() => {
                    hashHistory.push('/studyMapForm')
                  }}/>
                </h3>

                {this.getStudyMaps().map(study_map =>
                  <Card key={study_map._id}>
                    <CardHeader
                      title={study_map.subject}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      {study_map.links.map(link => {
                        <div key={link._id}>
                          {link.uri}
                        </div>
                      })}
                    </CardText>
                  </Card>
                )}

              </div>

          </div>
        }
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.auth.toJS();
  console.log(state.study_maps.toJS());
  return {
    isAuthenticated,
    user,
    study_maps: state.study_maps.toJS().study_maps
  }
}

export const ConnectedHome = connect(mapStateToProps)(Home);
