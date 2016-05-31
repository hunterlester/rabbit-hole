import React from 'react';
import {hashHistory} from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {postStudyMap} from '../state/api/actions';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import AutoComplete from 'material-ui/AutoComplete';

export const StudyMapForm = React.createClass({
  // mixins: [PureRenderMixin],
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

        <AutoComplete
          ref='keyword'
          floatingLabelText="Add keyword"
          hintText="Keyords help community find you"
          filter={AutoComplete.caseInsensitiveFilter}
          dataSource={Object.values(this.props.subjects.subjects).map(obj => {
            return Object.assign({}, {text: obj.keyword, value: obj.keyword})
          })}
        />

        <TextField
          ref='keywords'
          hintText="Keywords separated by comma, including subject i.e. 'rust, computer science, systems'"
          floatingLabelText="Keywords"
          fullWidth={true}
        />

        <RaisedButton
          label="Save"
          onTouchTap={() => {
            let studyMapObj = {
              user: this.props.user._id,
              subject: this.refs.subject.input.value,

            };
            console.log(studyMapObj);
            console.log(this.refs.keyword.state.searchText);
            // studyMapObj.keywords = this.refs.keywords.getValue().split(',');
            // dispatch(postStudyMap(studyMapObj));
            // hashHistory.push('/');
          }}
        />
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { user, isAuthenticated } = state.auth.toJS();
  const subjects = state.subjects.toJS();
  return {
    state,
    user,
    subjects
  };
};

export const ConnectedStudyMapForm = connect(mapStateToProps)(StudyMapForm);
