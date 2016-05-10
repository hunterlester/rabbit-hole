import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import AutoComplete from 'material-ui/lib/auto-complete';
// import PureRenderMixin from 'react-addons-pure-render-mixin';

export default React.createClass({
  // mixins: [PureRenderMixin],
  render: function() {
    return <div>
      <TextField
        ref='uri'
        hintText='Copy & Paste link uri here'
        floatingLabelText="URI"
        fullWidth={true}
      />

      <TextField
        ref='title'
        hintText="Helpful to describe link for future reference"
        floatingLabelText="Title"
        fullWidth={true}
      />

      <AutoComplete
        ref='study_map'
        hintText="Start typing subject"
        floatingLabelText="Subject"
        filter={AutoComplete.caseInsensitiveFilter}
        dataSource={this.props.studyMaps.map(study_map => {
          return study_map.subject;
        })}
        fullWidth={true}
      />

      <RaisedButton
        label="Enter Link"
        onTouchTap={() => {
          let linkObj = {
            user: this.props.userID
          };
          let linkObjPromise = new Promise((resolve, reject) => {
            resolve(
              Object.keys(this.refs).map((key) => {
                if(key === 'study_map') {
                  this.props.studyMaps.map(study_map => {
                    if(study_map.subject === this.refs[key].getValue()) {
                      linkObj = Object.assign(linkObj, { [key]: study_map._id});
                    }
                  });
                } else {
                  linkObj = Object.assign(linkObj, { [key]: this.refs[key].getValue() });
                }
             })
            )
          });

          linkObjPromise.then(res => {
            this.props.postLink(linkObj);
          });

          Object.keys(this.refs).map(key => {
            if(this.refs[key].clearValue) {
              this.refs[key].clearValue();
            }
          });
        }}
      />

    </div>;
  }
});
