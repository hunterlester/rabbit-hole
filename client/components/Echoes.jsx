import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/lib/card';
import FlatButton from 'material-ui/lib/flat-button';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';

import {getProfile} from '../state/profile_actions/core';
import {
  postBreadcrumb,
  postLinkBreadcrumb,
  postMessage,
  postLinkMessage } from '../state/api/actions';


export const Echoes = React.createClass({
  parseEchoes: function(echoes) {
    return echoes.map(echo => {
      if(echo.studymap) {
        echo.body = `Studying ${echo.studymap.subject}`;

        echo.quickreply = <div>
          <TextField
            hintText="Quickly leave helpful breadcrumb"
            floatingLabelText="Breadcrumb"
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
      } else if (echo.breadcrumb) {
        echo.action = <FlatButton label='Go to breadcrumb' onTouchTap={() => {
          hashHistory.push(`/profile/study_map/${echo.breadcrumb.study_map}/${echo.breadcrumb.link}/${echo.breadcrumb._id}`)
        }} />
        echo.body = `left breadcrumb: ${echo.breadcrumb.content}`;
        return echo;
      } else if (echo.message) {
        echo.body = `replied: ${echo.message.body}`;
        return echo;
      } else if (echo.link) {
        echo.body = `link added: ${echo.link.uri} - ${echo.link.title}`
        return echo;
      } else {
        return echo;
      }
    }).reverse();
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
               subtitle={<FlatButton label={echo.user.displayName} onTouchTap={() => {
                 this.props.dispatch(getProfile(echo.user._id))
               }}/>}
               actAsExpander={true}
               showExpandableButton={true}
             />
             <CardText expandable={true}>
              {echo.quickreply}
             </CardText>
             <CardActions expandable={true}>
              {echo.action}
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
