import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import MessageForm from './MessageForm.jsx';
import {
  postBreadcrumb,
  postLinkBreadcrumb,
  postMessage,
  postLinkMessage,
  getStudyMap
} from '../state/api/actions';


export const ProfileStudyMap = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  getLinkBreadcrumbs: function(link) {
    if (link.breadcrumbs.length) {
      return link.breadcrumbs.map(breadcrumb => {
        return (
          <Card ref={breadcrumb._id} key={breadcrumb._id}>
            <CardHeader
              title={breadcrumb.content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                <MessageForm
                  linkID={link._id}
                  studyMapID={this.props.study_map._id}
                  breadcrumbID={breadcrumb._id}
                  userID={this.props.user._id}
                  postMessage={ messageObj => {
                  this.props.dispatch(postLinkMessage(messageObj))
                }}/>
                {this.getMessages(breadcrumb)}
              </div>
            </CardText>
          </Card>
        );
      })
    }
  },
  getMessages: function(breadcrumb) {
    if(breadcrumb.messages.length) {
      return breadcrumb.messages.map(message => {
        return (
          <div key={message._id}>{message.body} - {message.user.username}</div>
        )
      })
    }
  },
  componentDidMount: function() {
    if(this.props.params.link) {
      this.refs[this.props.params.link].setState({expanded: true})
      console.log(this.refs);
      Object.keys(this.refs).map(key => {
        console.log(key, this.refs[key]);
      })

    }
  },
  render: function() {
    const { isAuthenticated, user, study_map, dispatch, profile} = this.props;
    return (
      <div>
        <h3>{profile.displayName}'s study map:</h3>
        <h3>
          {study_map.subject}
        </h3>
        {study_map.links.map(link =>
          <Card ref={link._id} key={link._id}>
            <CardHeader
              title={<a href={link.uri} target="_blank">{link.title}</a>}
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
                    let breadcrumbObj = {
                      link: link._id,
                      content: this.refs.content.getValue(),
                      user: user._id,
                      study_map: this.props.params.studyMap
                    };
                    dispatch(postLinkBreadcrumb(breadcrumbObj));

                    this.refs.content.clearValue();
                  }}
                />
                {this.getLinkBreadcrumbs(link)}
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
            const content = this.refs.content.getValue();
            let breadcrumbObj = {
              study_map: study_map._id,
              content: content,
              user: user._id
            };

            dispatch(postBreadcrumb(breadcrumbObj));

            this.refs.content.clearValue();
          }}
        />

        <h3>Breadcrumbs</h3>
        {study_map.breadcrumbs.map(breadcrumb =>
          <Card ref={breadcrumb._id} id={breadcrumb._id} key={breadcrumb._id}>
            <CardHeader
              title={breadcrumb.content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                {this.getMessages(breadcrumb)}
              </div>
              <MessageForm
                studyMapID={study_map._id}
                breadcrumbID={breadcrumb._id}
                userID={user._id}
                postMessage={ messageObj => {
                dispatch(postMessage(messageObj))
              }}/>
            </CardText>
          </Card>

        )}
      </div>
    );
  }
});

function mapStateToProps(state, ownProps) {
  const { isAuthenticated, user } = state.auth.toJS();

  let studyMap = state.profile.toJS().study_maps.find(study_map => {
    if (study_map._id == ownProps.params.studyMap) {
      return study_map;
    }
  });

  return {
    isAuthenticated,
    user,
    study_map: studyMap,
    profile: state.profile.toJS()
  }

}

export const ConnectedProfileStudyMap = connect(mapStateToProps)(ProfileStudyMap);
