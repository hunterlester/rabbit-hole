import React from 'react';
import {hashHistory} from 'react-router';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {postStudyMap} from '../state/api/actions';

import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

export const StudyMapForm = React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    const { dispatch } = this.props;

    return (
      <div>
        <h3>Create New Subject</h3>
        <TextField
          ref='subject'
          hintText='What are you studying? i.e. "Rust"'
          floatingLabelText="Subject"
          fullWidth={true}
        />

        <TextField
          ref='keywords'
          hintText="Keywords separated by comma, including subject i.e. 'rust,computer science,systems'"
          floatingLabelText="Keywords"
          fullWidth={true}
        />

        <RaisedButton
          label="Save"
          onTouchTap={() => {
            let studyMapObj = {
              user: this.props.user._id
            };
             Object.keys(this.refs).map((key) => {
              studyMapObj = Object.assign(studyMapObj, { [key]: this.refs[key].getValue() });
            });
            dispatch(postStudyMap(studyMapObj));
            hashHistory.push('/');
          }}
        />
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { user, isAuthenticated } = state.auth.toJS();
  return {
    state,
    user
  };
};

export const ConnectedStudyMapForm = connect(mapStateToProps)(StudyMapForm);
