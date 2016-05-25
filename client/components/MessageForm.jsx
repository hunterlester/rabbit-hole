import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

export default React.createClass({
  render: function() {
    const { userID, breadcrumbID, postMessage, studyMapID, linkID } = this.props;
    return (
      <div>
        <TextField
          ref='body'
          hintText='Reply to breadcrumb'
          floatingLabelText="Reply"
          fullWidth={true}/>

        <RaisedButton
          label="Reply"
          onTouchTap={() => {
            let body = this.refs.body.getValue();
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
            this.refs.body.clearValue();
          }}
        />
      </div>
    );
  }
})
