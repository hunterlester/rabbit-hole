import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

export default React.createClass({
  render: function() {
    const { userID, breadcrumbID, postMessage, studyMapID, linkID } = this.props;
    return (
      <div>
        <TextField
          ref='body'
          floatingLabelText="Ask for or give further clarity"
          fullWidth={true}/>

        <RaisedButton
          label="Reply"
          onTouchTap={() => {
            let body = this.refs.body.input.value;
            let messageObj = {
              study_map: studyMapID,
              breadcrumb: breadcrumbID,
              body: body,
              user: userID
            };
            if(linkID) {
              messageObj.link = linkID;
            }
            postMessage(messageObj);
            this.refs.body.input.value = '';
          }}
        />
      </div>
    );
  }
})
