import React from 'react';
import {hashHistory} from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {postStudyMap, postSubject} from '../state/api/actions';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import Paper from 'material-ui/Paper';


export const StudyMapForm = React.createClass({
  getInitialState () {
    return {
      value: [],
      createNewSubject: false
    }
  },
  handleInput: function(input) {
    let bool = Object.values(this.props.subjects).some(obj => obj.keyword == input);
    if(bool) {
      this.setState({createNewSubject: false});
    } else {
      this.setState({createNewSubject: true});
    }
  },
  handleSelectChange(value) {
    this.setState({value});
  },
  render: function() {
    const { dispatch } = this.props;

    let keywords = Object.values(this.props.subjects).map(obj => {
      return Object.assign({}, {value: obj._id, label: obj.keyword});
    });

    const style = {
      padding: 20,
      textAlign: 'center',
      margin: 20
    };

    return (
      <div>
        <h3>Create New Subject</h3>
        <form id="subjectForm">
          <TextField
            ref='subject'
            hintText='What are you studying? i.e. "Rust"'
            floatingLabelText="Subject"
            fullWidth={true}
          />

          <Select
            ref='keywords'
            value={this.state.value}
            options={keywords}
            multi={true}
            placeholder="Choose keywords to help community find you"
            onChange={this.handleSelectChange}
            noResultsText={false}
            onInputChange={this.handleInput}
          />
          {
            this.state.createNewSubject &&
            <Paper style={style} zDepth={5}>
              No results found.
              <TextField
                ref='newSubject'
                floatingLabelText="Contribute New Keyword"
                fullWidth={true}
              />
              <RaisedButton
                label="Save"
                onTouchTap={() => {
                  let subjectObj = {
                    keyword: this.refs.newSubject.input.value
                  };
                  dispatch(postSubject(subjectObj));
                  this.setState({createNewSubject: false})
                }}
              />
            </Paper>
          }


          <RaisedButton
            label="Save"
            onTouchTap={() => {
              let studyMapObj = {
                user: this.props.user._id,
                subject: this.refs.subject.input.value,

              };
              studyMapObj.keywords = this.state.value.map(obj => obj.value);
              dispatch(postStudyMap(studyMapObj));
              hashHistory.push('/');
            }}
          />
        </form>
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { user, isAuthenticated } = state.auth.toJS();
  const subjects = state.subjects.toJS().subjects;
  return {
    state,
    user,
    subjects
  };
};

export const ConnectedStudyMapForm = connect(mapStateToProps)(StudyMapForm);
