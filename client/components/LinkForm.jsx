import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';
import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>
      <TextField
        ref='uri'
        hintText='Copy & Paste link uri here'
        floatingLabelText="URI"
        style = {{width: 1000}}
      />

      <TextField
        ref='title'
        hintText="Helpful to describe link for future reference"
        floatingLabelText="Title"
        rows={1}
        style = {{width: 1000}}
      />

      <AutoComplete
        ref='study_map'
        hintText="Start typing subject"
        floatingLabelText="Subject"
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={this.props.studyMaps}
        rows={1}
        style = {{width: 1000}}
      />

      <RaisedButton
        label="Save"
        onTouchTap={() => {
          let linkObj = {};
           Object.keys(this.refs).map((key) => {
            linkObj = Object.assign(linkObj, { [key]: this.refs[key].getValue() });
          });
          this.props.postLink(linkObj);
          Object.keys(this.refs).map(key => {
            this.refs[key].clearValue();
          });
        }}
      />

    </div>;
  }
});
