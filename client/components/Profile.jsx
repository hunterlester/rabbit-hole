import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

export const Profile = React.createClass({
  getLinks: function(study_map) {
    if(study_map.links) {
      return Object.keys(study_map.links).map(key => {
        return (
          <div key={study_map.links[key]._id}>
            <a href={study_map.links[key].uri} target="_blank">
              <h5>{study_map.links[key].title}</h5>
            </a>
            <h6>{study_map.links[key].uri}</h6>
          </div>
        );
      });
    }
  },
  getStudyMaps: function(studymaps) {
    if(studymaps) {
      return Object.keys(studymaps).map(key => {
        return (
          <Card key={studymaps[key]._id}>
            <CardHeader
              title={studymaps[key].subject}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <RaisedButton label="Open" className='pull-xs-right' onTouchTap={() => {
                hashHistory.push(`/profile/study_map/${studymaps[key]._id}`)
              }}/>
              <div>
                {this.getLinks(studymaps[key])}
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
