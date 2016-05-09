import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import {postBreadcrumb} from '../state/api/actions';


export const StudyMap = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  render: function() {
    const { isAuthenticated, user, study_map, dispatch} = this.props;
    return (
      <div>
        <h3>
          {study_map.subject}
        </h3>
        {study_map.links.map(link =>
          <Card key={link._id}>
            <CardHeader
              title={<a href={link.uri} target="_blank">{link.title}</a>}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>

              </div>
            </CardText>
          </Card>
        )}
        <TextField
          hintText="Ask a question, track your thoughts, leave helpful breadcrumbs in the form of resources or constructive guidance"
          floatingLabelText="Breadcrumbs"
          multiLine={true}
          rows={2}
          ref='content'
          fullWidth={true}
        />

        <RaisedButton
          label="Contribute breadcrumb"
          onTouchTap={() => {
            let breadcrumbObj = {
              study_map: study_map._id,
              content: this.refs.content.getValue(),
              user: user._id
            };
            dispatch(postBreadcrumb(breadcrumbObj));

            this.refs.content.clearValue();
          }}
        />

        <h3>Breadcrumbs</h3>
        {study_map.breadcrumbs.map(breadcrumb =>
          <Card key={breadcrumb._id}>
            <CardHeader
              title={breadcrumb.content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>

              </div>
            </CardText>
          </Card>

        )}
      </div>
    );
  }
});

function mapStateToProps(state, ownProps) {
  const { isAuthenticated, user } = state.auth.toJS();

  let studyMap = state.study_maps.toJS().study_maps.find(study_map => {
    if (study_map._id == ownProps.params.studyMap) {
      return study_map;
    }
  });

  return {
    isAuthenticated,
    user,
    study_map: studyMap
  };
}

export const ConnectedSingleStudyMap = connect(mapStateToProps)(StudyMap);
