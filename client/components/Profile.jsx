import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import RaisedButton from 'material-ui/lib/raised-button';

export const Profile = React.createClass({
  getLinks: function(study_map) {
    if(study_map.links.length) {
      return study_map.links.map(link => {
        return (
          <div key={link._id}>
            <a href={link.uri} target="_blank">
              <h5>{link.title}</h5>
            </a>
            <h6>{link.uri}</h6>
          </div>
        );
      });
    }
  },
  getStudyMaps: function(studymaps) {
    if(studymaps) {
      return studymaps.map(studymap => {
        return (
          <Card key={studymap._id}>
            <CardHeader
              title={studymap.subject}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <RaisedButton label="Open" className='pull-xs-right' onTouchTap={() => {
                hashHistory.push(`/profile/study_map/${studymap._id}`)
              }}/>
              <div>
                {this.getLinks(studymap)}
              </div>
            </CardText>
          </Card>
        );
      })
    }
  },
  render: function() {
    const { dispatch, isAuthenticated, user, profile } = this.props;
    return (
      <div>
        <h5>
          Profile: {profile.displayName}
        </h5>
        <h5>
          Points: {profile.points}
        </h5>

        {this.getStudyMaps(profile.study_maps)}
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.auth.toJS();
  return {
    isAuthenticated,
    user,
    profile: state.profile.toJS()
  };
}

export const ConnectedProfile = connect(mapStateToProps)(Profile);
