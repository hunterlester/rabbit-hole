import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {blue500, white} from 'material-ui/styles/colors';


export default React.createClass({
  render: function() {
    const { user, study_map, link, postBreadcrumb, postLinkBreadcrumb, disabled } = this.props;
    return (
      <div>
        <TextField
          disabled={disabled}
          hintText="Question, insight, or helpful tip"
          floatingLabelText="Breadcrumb"
          ref='content'
          fullWidth={true}/>

        <RaisedButton
          disabled={disabled}
          label="Contribute"
          backgroundColor={blue500}
          labelColor={white}
          onTouchTap={() => {
            const content = this.refs.content.input.value;
            let breadcrumbObj = {
              study_map: study_map._id,
              content: content,
              user: user
            };

            if(link) {
              breadcrumbObj.link = link;
            }

            if(study_map.user != user) {
              breadcrumbObj.seen = false;
            }

            if(postBreadcrumb) {
              postBreadcrumb(breadcrumbObj)
            } else if(postLinkBreadcrumb) {
              postLinkBreadcrumb(breadcrumbObj)
            }
            this.refs.content.input.value = '';
          }}
        />
      </div>
    );
  }
});
