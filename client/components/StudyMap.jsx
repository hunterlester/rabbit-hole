import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import MessageForm from './MessageForm.jsx';
import {postBreadcrumb, postLinkBreadcrumb, postMessage, postLinkMessage, getStudyMap } from '../state/api/actions';


export const StudyMap = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  getLinkBreadcrumbs: function(link) {
    if (link.breadcrumbs.length) {
      return link.breadcrumbs.map(breadcrumb => {
        return (
          <Card key={breadcrumb._id}>
            <CardHeader
              title={breadcrumb.content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>
                <MessageForm linkID={link._id} studyMapID={this.props.study_map._id} breadcrumbID={breadcrumb._id} userID={this.props.user._id} postMessage={ messageObj => {
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

            console.log(breadcrumbObj);
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
                {this.getMessages(breadcrumb)}
              </div>
              <MessageForm studyMapID={study_map._id} breadcrumbID={breadcrumb._id} userID={user._id} postMessage={ messageObj => {
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

  let studyMap = state.study_maps.toJS().study_maps.find(study_map => {
    if (study_map._id == ownProps.params.studyMap) {
      return study_map;
    }
  });

  return {
    isAuthenticated,
    user,
    study_map: studyMap
  }

  // THE FOLLOWING IS COMMENTED OUT WHILE I TRY TO FIGURE OUT HOW TO FETCH SINGLE
  // STUDY MAPS TO TAKE WEIGHT OUT OF INITAL DB QUERY


    // let studyMapPromise = new Promise((reject, resolve) => {
    //   resolve(
    //     ownProps.dispatch(getStudyMap(ownProps.params.studyMap))
    //   )
    // })
    //
    // studyMapPromise.then(res => {
    //   console.log(res);
    // })


  // function *returnState() {
  //   return {
  //     isAuthenticated,
  //     user,
  //     study_map: yield
  //   }
  // }
  //
  // let stateWaiting = returnState();
  //
  // studyMapPromise.then(res => {
  //   console.log(res);
  //   stateWaiting.next(res);
  // })

}

export const ConnectedSingleStudyMap = connect(mapStateToProps)(StudyMap);
