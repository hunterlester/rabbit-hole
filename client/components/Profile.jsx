import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import { subjectSubscription } from '../state/profile_actions/core';

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
  getInitialState () {
    let keywords = Object.values(this.props.profile.subscribed_subjects).map(obj => {
      return Object.assign({}, {value: obj._id, label: obj.keyword});
    });
    return {
      value: keywords || []
    }
  },
  handleSelectChange(value) {
    let keyArray = value.map(obj => obj.value);
    this.props.dispatch(subjectSubscription(this.props.user._id, keyArray));
    this.setState({value});
  },
  render: function() {
    const { dispatch, isAuthenticated, user, profile } = this.props;
    let keywords = Object.values(this.props.subjects).map(obj => {
      return Object.assign({}, {value: obj._id, label: obj.keyword});
    });
    const profile_id = localStorage.getItem('profile_id');

    const selectIsDisabled = profile_id == user._id;

    return (
      <div>
        <h5>
          Profile: {profile.displayName}
        </h5>
        <h5>
          Points: {profile.points}
        </h5>
        <h4>
          Watching subjects:
        </h4>
        <Select
          ref='filter'
          value={this.state.value}
          options={keywords}
          multi={true}
          disabled={!selectIsDisabled}
          placeholder="Subscribe to your favorite subjects"
          onChange={this.handleSelectChange}
          noResultsText='Subject not found. Be the first to contribute!'
        />

        {this.getStudyMaps(profile.study_maps)}
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.auth.toJS();
  const subjects = state.subjects.toJS().subjects;
  return {
    isAuthenticated,
    user,
    profile: state.profile.toJS(),
    subjects
  };
}

export const ConnectedProfile = connect(mapStateToProps)(Profile);
