import React from 'react';
import { connect } from 'react-redux';
import { Card, CardHeader, CardText } from 'material-ui/Card';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {orange500, green500, blue500, blueGrey500} from 'material-ui/styles/colors';

import MessageForm from './MessageForm.jsx';
import BreadcrumbForm from './BreadCrumbForm';
import { updateBLinkSeen,updateSeen, postBreadcrumb, postLinkBreadcrumb, postMessage, postLinkMessage } from '../state/api/actions';

function compare(a , b) {
  return Date.parse(a.date) - Date.parse(b.date);
}

export const StudyMap = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  getLinkBreadcrumbs: function(link) {
    if (link.breadcrumbs) {
      return Object.values(link.breadcrumbs).map(brdcrmb => {
        let style = {};
        let avatarColor = blue500;
        let seen = 'seen';
        if(seen in brdcrmb && brdcrmb.seen == false) {
          style.backgroundColor = '#2196F3';
        }
        return (
          <Card key={brdcrmb._id}>
            <CardHeader
              avatar={<Avatar size={30} backgroundColor={avatarColor}/>}
              title={brdcrmb.content}
              style={style}
              onClick={() => {
                if( seen in brdcrmb && brdcrmb.seen == false) {
                  let newObj = Object.assign({}, brdcrmb, {seen: true});
                  this.props.dispatch(updateBLinkSeen(JSON.stringify(newObj), newObj._id));
                }
              }}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
              <div>
                {this.getMessages(brdcrmb)}
                <MessageForm linkID={link._id} studyMapID={this.props.study_map._id} breadcrumbID={brdcrmb._id} userID={this.props.user._id} postMessage={ messageObj => {
                  this.props.dispatch(postLinkMessage(messageObj))
                }}/>

              </div>
            </CardText>
          </Card>
        );
      }).sort(compare);
    }
  },
  getMessages: function(breadcrumb) {
    if(breadcrumb.messages) {
      return Object.keys(breadcrumb.messages).map(key => {
        return (
          <div key={breadcrumb.messages[key]._id}><Avatar size={15} backgroundColor={blueGrey500}/> {breadcrumb.messages[key].body} - {breadcrumb.messages[key].user.displayName}</div>
        )
      }).sort(compare);
    }
  },
  render: function() {
    const { isAuthenticated, user, study_map, dispatch} = this.props;
    return (
      <div>
        <h3>
          {study_map.subject}
        </h3>
        {Object.values(study_map.links).map(link => {
          let style = {};
          let avatarColor = green500
          const seen = 'seen';
          let notify = Object.values(link.breadcrumbs).some(brdcrmb => {
              return brdcrmb.seen == false;
          });
          if(notify) {
            style.backgroundColor = blue500;
            style.color = '#ffffff';
          }
          return (
            <Card key={link._id}>
              <CardHeader
                avatar={<Avatar size={30} backgroundColor={avatarColor}/>}
                title={<a href={link.uri} style={style} target="_blank">{link.title}</a>}
                subtitle={link.uri}
                actAsExpander={true}
                showExpandableButton={true}
                style={style}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                <div>
                  {this.getLinkBreadcrumbs(link)}
                </div>
                <BreadcrumbForm
                  study_map={study_map}
                  user={user._id}
                  link={link._id}
                  postLinkBreadcrumb={ breadcrumbObj => {
                  this.props.dispatch(postLinkBreadcrumb(breadcrumbObj))
                }} />
              </CardText>
            </Card>
          )
        }
        ).sort(compare)}

        <h3>Breadcrumbs</h3>

        {Object.keys(study_map.breadcrumbs).map(key => {
          let style = {};
          let avatarColor = blue500;
          let seen = 'seen';
          if('seen' in study_map.breadcrumbs[key] && study_map.breadcrumbs[key].seen == false) {
            style.backgroundColor = blue500;
          }
          return (
            <Card key={study_map.breadcrumbs[key]._id}>
              <CardHeader
                avatar={<Avatar size={30} backgroundColor={avatarColor}/>}
                title={study_map.breadcrumbs[key].content}
                actAsExpander={true}
                showExpandableButton={true}
                onClick={(event) => {
                  if( seen in study_map.breadcrumbs[key] && study_map.breadcrumbs[key].seen == false) {
                    let newObj = Object.assign({}, study_map.breadcrumbs[key], {seen: true});
                    dispatch(updateSeen(JSON.stringify(newObj), newObj._id));
                  }
                }}
                style={style}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                <div>
                  {this.getMessages(study_map.breadcrumbs[key])}
                </div>
                <MessageForm studyMapID={study_map._id} breadcrumbID={study_map.breadcrumbs[key]._id} userID={user._id} postMessage={ messageObj => {
                  dispatch(postMessage(messageObj))
                }}/>
              </CardText>
            </Card>
          );
        }
        ).sort(compare)}
        <BreadcrumbForm
          study_map={study_map}
          user={user._id}
          postBreadcrumb={ breadcrumbObj => {
          this.props.dispatch(postBreadcrumb(breadcrumbObj))
        }} />
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
