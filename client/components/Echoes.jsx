import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import moment from 'moment';
import MessageForm from './MessageForm';


import {getProfile} from '../state/profile_actions/core';
import {
  postBreadcrumb,
  postLinkBreadcrumb,
  postMessage,
  postLinkMessage } from '../state/api/actions';

function compare(a , b) {
  return Date.parse(a.date) - Date.parse(b.date);
}


export const Echoes = React.createClass({
  parseEchoes: function(echoes) {
    return Object.values(echoes).map(echo => {
      if(echo.studymap) {
        echo.body = `Studying ${echo.studymap.subject}`;

        echo.quickreply = <div>
          <TextField
            hintText="Quickly leave helpful breadcrumb"
            floatingLabelText="Breadcrumb"
            multiLine={true}
            rows={2}
            ref='content'
            fullWidth={true}/>

          <RaisedButton
            label="Contribute breadcrumb"
            onTouchTap={() => {
              const content = this.refs.content.getValue();
              let breadcrumbObj = {
                study_map: echo.studymap._id,
                content: content,
                user: this.props.user._id
              };

              this.props.dispatch(postBreadcrumb(breadcrumbObj));

              this.refs.content.clearValue();
            }}
          />
        </div>;
        return echo;
      } else if (echo.breadcrumb && echo.breadcrumb.link) {
        echo.quickreply = <MessageForm
          linkID={echo.breadcrumb.link}
          studyMapID={echo.breadcrumb.study_map}
          breadcrumbID={echo.breadcrumb._id}
          userID={this.props.user._id}
          postMessage={ messageObj => {
          this.props.dispatch(postLinkMessage(messageObj))
        }}/>
        echo.action = <FlatButton label='go to breadcrumb' onTouchTap={() => {
          this.props.dispatch(getProfile(
            echo.breadcrumb.study_map.user,
            `/profile/study_map/${echo.breadcrumb.study_map._id}/${echo.breadcrumb.link}/${echo.breadcrumb._id}`
          ))
        }} />
        echo.body = `left breadcrumb: ${echo.breadcrumb.content}`;
        echo.subtitle = `regarding: ${echo.breadcrumb.study_map.subject}`
        return echo;
      } else if (echo.breadcrumb && !echo.breadcrumb.link) {
        echo.quickreply = <MessageForm
          studyMapID={echo.breadcrumb.study_map._id}
          breadcrumbID={echo.breadcrumb._id}
          userID={this.props.user._id}
          postMessage={ messageObj => {
          this.props.dispatch(postLinkMessage(messageObj))
        }}/>
        echo.action = <FlatButton label='go to breadcrumb' onTouchTap={() => {
          this.props.dispatch(getProfile(
            echo.breadcrumb.study_map.user,
            `/profile/study_map/${echo.breadcrumb.study_map._id}/${echo.breadcrumb._id}`
          ))
        }} />
        echo.body = `left breadcrumb: ${echo.breadcrumb.content}`;
        echo.subtitle = `regarding: ${echo.breadcrumb.study_map.subject}`
        return echo;
      } else if (echo.message && echo.message.link) {
        echo.subtitle = `regarding: ${echo.message.breadcrumb.content}`
        echo.body = <div>
          <div>replied: {echo.message.body}</div>
        </div>;
        echo.quickreply = <MessageForm
          linkID={echo.message.link}
          studyMapID={echo.message.study_map._id}
          breadcrumbID={echo.message.breadcrumb._id}
          userID={this.props.user._id}
          postMessage={ messageObj => {
          this.props.dispatch(postLinkMessage(messageObj))
        }}/>
        echo.action = <FlatButton label='go to message' onTouchTap={() => {
          this.props.dispatch(getProfile(
            echo.message.study_map.user,
            `/profile/link/${echo.message.study_map._id}/${echo.message.link}/${echo.message.breadcrumb._id}/${echo.message._id}`
          ))

        }} />

        return echo;
      } else if (echo.message && !echo.message.link) {
        echo.subtitle = `regarding: ${echo.message.breadcrumb.content}`
        echo.body = <div>
          <div>replied: {echo.message.body}</div>
        </div>;
        echo.quickreply = <MessageForm
          studyMapID={echo.message.study_map._id}
          breadcrumbID={echo.message.breadcrumb._id}
          userID={this.props.user._id}
          postMessage={ messageObj => {
          this.props.dispatch(postLinkMessage(messageObj))
        }}/>
        echo.action = <FlatButton label='go to message' onTouchTap={() => {
          this.props.dispatch(getProfile(
            echo.message.study_map.user,
            `/profile/study_map/${echo.message.study_map._id}/${echo.message.breadcrumb._id}/${echo.message._id}`
          ))
        }} />

        return echo;
      } else if (echo.link) {
        echo.body = `link added: ${echo.link.title}`
        echo.linkuri = <a href={echo.link.uri} target="_blank">{echo.link.uri}</a>
        echo.action = <FlatButton label='go to link post' onTouchTap={() => {
          this.props.dispatch(getProfile(
            echo.user._id,
            `/profile/link/${echo.link.study_map}/${echo.link._id}`
          ))
        }} />
        return echo;
      } else {
        return echo;
      }
    }).sort(compare).reverse();
  },
 render: function() {
   const {echoes} = this.props;
   return (
     <div>
       <h3>
        Activity Echoes
       </h3>
       {this.parseEchoes(echoes).map(echo => {
         return (
           <Card key={echo._id}>
             <CardHeader
               title={echo.body}
               subtitle={echo.subtitle}
               actAsExpander={true}
               showExpandableButton={true}/>

             <CardText expandable={true}>
              {moment(`${echo.date}`, "YYYYMMDD").fromNow()}
              {echo.linkuri}
              {echo.quickreply}
             </CardText>
             <CardActions expandable={true}>
              {echo.action}
            </CardActions>
            <CardActions expandable={true}>
             {<FlatButton label={echo.user.displayName} onTouchTap={() => {
               this.props.dispatch(getProfile(echo.user._id))
             }}/>}
           </CardActions>
           </Card>
         );
       })}
     </div>
   );
 }
});

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.auth.toJS();
  return {
    user,
    isAuthenticated,
    echoes: state.echoes.toJS().echoes
  };
}

export const ConnectedEchoes = connect(mapStateToProps)(Echoes);
