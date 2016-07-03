import React from 'react';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import Select from 'react-select';
import { subjectSubscription } from '../state/reducer_components/profile/core';
import Avatar from 'material-ui/Avatar';
import {orange500, green500} from 'material-ui/styles/colors';

export const Profile = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  getLinks: function(study_map) {
    if(study_map.links) {
      return Object.keys(study_map.links).map(key => {
        return (
          <div key={study_map.links[key]._id} className='row'>
            <div className='col-xs-1'>
              <Avatar size={15} backgroundColor={green500}/>
            </div>
            <div className='col-xs-10'>
              <a href={study_map.links[key].uri} target="_blank">
                {study_map.links[key].title}
              </a>
              <h6>{study_map.links[key].uri}</h6>
            </div>
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
              avatar={<Avatar size={30} backgroundColor={orange500}/>}
              title={studymaps[key].subject}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText className='clearfix' expandable={true} style={{backgroundColor: '#ECEFF1'}}>
              <RaisedButton label="Open" className='pull-right' onTouchTap={() => {
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
    let keywords = Object.values(this.props.profile.profile_subjects).map(obj => {
      return Object.assign({}, {value: obj._id, label: obj.keyword});
    });
    return {
      value: keywords || []
    }
  },
  handleSelectChange(value) {
    this.refs.filter.closeMenu();
    let keyArray = value.map(obj => obj.value);
    this.props.dispatch(subjectSubscription(this.props.user._id, keyArray));
    this.setState({value});
  },
  render: function() {
    const { dispatch, isAuthenticated, user, profile, isFetching } = this.props;
    let keywords = Object.values(this.props.subjects).map(obj => {
      return Object.assign({}, {value: obj._id, label: obj.keyword});
    });
    const profile_id = localStorage.getItem('profile_id');

    const selectIsDisabled = profile_id == user._id;

    return (
      <div>
        <h4>
          {profile.displayName}
        </h4>
        <h5>
          Watching:
        </h5>
        <Select
          ref='filter'
          value={this.state.value}
          options={keywords}
          multi={true}
          disabled={!selectIsDisabled || isFetching}
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
  const { isAuthenticated, user, isFetching } = state.auth.toJS();
  const subjects = state.subjects.toJS().subjects;
  return {
    isAuthenticated,
    user,
    profile: state.profile.toJS(),
    subjects,
    isFetching
  };
}

export const ConnectedProfile = connect(mapStateToProps)(Profile);
