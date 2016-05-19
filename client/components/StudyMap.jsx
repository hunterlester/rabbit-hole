import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import MessageForm from './MessageForm.jsx';
import {postBreadcrumb, postLinkBreadcrumb, postMessage, postLinkMessage } from '../state/api/actions';

function compare(a , b) {
  return Date.parse(a.date) - Date.parse(b.date);
}

export const StudyMap = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  getLinkBreadcrumbs: function(link) {
    if (link.breadcrumbs) {
      return Object.keys(link.breadcrumbs).map(key => {
        return (
          <Card key={link.breadcrumbs[key]._id}>
            <CardHeader
              title={link.breadcrumbs[key].content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                <MessageForm linkID={link._id} studyMapID={this.props.study_map._id} breadcrumbID={link.breadcrumbs[key]._id} userID={this.props.user._id} postMessage={ messageObj => {
                  this.props.dispatch(postLinkMessage(messageObj))
                }}/>
                {this.getMessages(link.breadcrumbs[key])}
              </div>
            </CardText>
          </Card>
        );
      }).sort(compare).reverse();
    }
  },
  getMessages: function(breadcrumb) {
    if(breadcrumb.messages) {
      return Object.keys(breadcrumb.messages).map(key => {
        return (
          <div key={breadcrumb.messages[key]._id}>{breadcrumb.messages[key].body} - {breadcrumb.messages[key].user.username}</div>
        )
      }).sort(compare).reverse();
    }
  },
  render: function() {
    const { isAuthenticated, user, study_map, dispatch} = this.props;
    return (
      <div>
        <h3>
          {study_map.subject}
        </h3>
        {Object.keys(study_map.links).map(key =>
          <Card key={study_map.links[key]._id}>
            <CardHeader
              title={<a href={study_map.links[key].uri} target="_blank">{study_map.links[key].title}</a>}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                <TextField
                  hintText="Leave a breadcrump for this link"
                  floatingLabelText="Breadcrumb"
                  multiLine={true}
                  rows={2}
                  ref='content'
                  fullWidth={true}
                />

                <RaisedButton
                  label="Contribute breadcrumb"
                  onTouchTap={() => {
                    let content = this.refs.content.getValue();
                    let breadcrumbObj = {
                      link: study_map.links[key]._id,
                      content: content,
                      user: user._id,
                      study_map: this.props.params.studyMap
                    };
                    dispatch(postLinkBreadcrumb(breadcrumbObj));

                    this.refs.content.clearValue();
                  }}
                />
                {this.getLinkBreadcrumbs(study_map.links[key])}
              </div>
            </CardText>
          </Card>
        ).sort(compare).reverse()}
        <TextField
          hintText="Ask a question, track your thoughts, leave helpful breadcrumbs in the form of resources or constructive guidance"
          floatingLabelText="Breadcrumbs"
          multiLine={true}
          rows={2}
          ref='breadcrumb'
          fullWidth={true}
        />

        <RaisedButton
          label="Contribute breadcrumb"
          onTouchTap={() => {
            let content = this.refs.breadcrumb.getValue();
            let breadcrumbObj = {
              study_map: study_map._id,
              content: content,
              user: user._id
            };

            dispatch(postBreadcrumb(breadcrumbObj));

            this.refs.breadcrumb.clearValue();
          }}
        />

        <h3>Breadcrumbs</h3>
        {Object.keys(study_map.breadcrumbs).map(key =>
          <Card key={study_map.breadcrumbs[key]._id}>
            <CardHeader
              title={study_map.breadcrumbs[key].content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                {this.getMessages(study_map.breadcrumbs[key])}
              </div>
              <MessageForm studyMapID={study_map._id} breadcrumbID={study_map.breadcrumbs[key]._id} userID={user._id} postMessage={ messageObj => {
                dispatch(postMessage(messageObj))
              }}/>
            </CardText>
          </Card>

        ).sort(compare).reverse()}
      </div>
    );
  }
});

function mapStateToProps(state, ownProps) {
  const { isAuthenticated, user } = state.auth.toJS();

  let studyMap = state.study_maps.toJS().study_maps[ownProps.params.studyMap];

  return {
    isAuthenticated,
    user,
    study_map: studyMap
  }

}

export const ConnectedSingleStudyMap = connect(mapStateToProps)(StudyMap);
