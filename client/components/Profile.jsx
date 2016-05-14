import React from 'react';
import {connect} from 'react-redux';

export const Profile = React.createClass({
  render: function() {
    const { dispatch, isAuthenticated, user, profile } = this.props;
    return (
      <div>
        Profile: {profile.displayName}
        Points: {profile.points}
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
