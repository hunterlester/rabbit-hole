import React from 'react';
import {hashHistory} from 'react-router';
// import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import {postStudyMap, postSubject} from '../state/api/actions';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import Paper from 'material-ui/Paper';


export const StudyMapForm = React.createClass({
  getInitialState () {
    return {
      value: [],
      createNewSubject: false,
      input: null
    }
  },
  handleInput: function(input) {
    this.setState({input});
    let bool = Object.values(this.props.subjects).some(obj => {
      let pattern = new RegExp(input);
      return pattern.test(obj.keyword);
    });
    if(bool) {
      this.setState({createNewSubject: false});
    } else {
      this.setState({createNewSubject: true});
    }
  },
  handleSelectChange(value) {
    this.setState({value});
  },
  componentWillReceiveProps: function(nextProps) {
    if(Object.keys(this.props.subjects).length != Object.keys(nextProps.subjects).length) {
      Object.keys(nextProps.subjects).map(key1 => {
        if(Object.keys(this.props.subjects).some(key2 => {
          return key2 == key1;
        })) {
          return;
        } else {
          let value = this.state.value;
          value.push({value: nextProps.subjects[key1]._id, label: nextProps.subjects[key1].keyword});
          this.setState({value})
        }
      })
    }
  },
  render: function() {
    const { dispatch } = this.props;

    let selectStyle = {
      margin: 20
    };

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
        <form id="subjectForm">
          <TextField
            ref='subject'
            hintText='Type in whatever is most helpful to you'
            floatingLabelText="What are you studying?"
            fullWidth={true}
          />

          {
            this.state.createNewSubject &&
            <Paper style={style} zDepth={5}>
              No results found.
              <TextField
                ref='newSubject'
                floatingLabelText="Contribute a new keyword"
                fullWidth={true}
                value={this.state.input}
                onChange={() => {
                  this.setState({input: this.refs.newSubject.input.value})
                }}
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
              <FlatButton
                label="Cancel"
                onTouchTap={() => {
                  this.setState({createNewSubject: false})
                }}
              />
            </Paper>
          }

          <Select
            style={selectStyle}
            ref='keywords'
            value={this.state.value}
            options={keywords}
            multi={true}
            placeholder="Start typing or choose keywords to help community find you"
            onChange={this.handleSelectChange}
            noResultsText={false}
            onInputChange={this.handleInput}
          />

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
