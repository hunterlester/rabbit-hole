import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Select from 'react-select';
import { green500, white } from 'material-ui/styles/colors';

export default React.createClass({
  getInitialState() {
    return {
      value: ''
    }
  },
  handleSelectChange(value) {
    this.setState({value});
  },
  render: function() {
    let subjects = Object.values(this.props.studyMaps).map(obj => {
      return Object.assign({}, {value: obj._id, label: obj.subject});
    });
    return <div>
      <Select
        className="selectInput"
        ref='study_map'
        options={subjects}
        value={this.state.value}
        onChange={this.handleSelectChange}
        placeholder="Choose subject"
        noResultsText='First create new subject by clicking on orange folder icon.'
      />

      <TextField
        ref='uri'
        hintText='Copy & paste link url here'
        floatingLabelText="URL"
        fullWidth={true}
      />

      <TextField
        ref='title'
        hintText="Link title"
        floatingLabelText="Title"
        fullWidth={true}
      />

      <RaisedButton
        label="Add Link"
        backgroundColor={green500}
        labelColor={white}
        onTouchTap={() => {
          let linkObj = {
            user: this.props.userID,
            study_map: this.state.value.value
          };

          Object.keys(this.refs).map((key) => {
            if(this.refs[key].input) {
              linkObj = Object.assign(linkObj, { [key]: this.refs[key].input.value });
            }
          });

          this.props.postLink(linkObj);

          Object.keys(this.refs).map(key => {
            if(this.refs[key].input && this.refs[key].input.value) {
              this.refs[key].input.value = '';
            } else if(this.refs[key].state.searchText) {
              this.refs[key].state.searchText = '';
            }
            this.setState({value: ''})
          });
        }}
      />

    </div>;
  }
});
