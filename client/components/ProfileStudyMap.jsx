import React from 'react';
import { connect } from 'react-redux';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import {orange500, green500, blue500, blueGrey500} from 'material-ui/styles/colors';
import BreadcrumbForm from './BreadCrumbForm';
import MessageForm from './MessageForm.jsx';
import {
  postBreadcrumb,
  postLinkBreadcrumb,
  postMessage,
  postLinkMessage
} from '../state/api/actions';

function compare(a , b) {
  return Date.parse(a.date) - Date.parse(b.date);
}

export const ProfileStudyMap = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  getLinkBreadcrumbs: function(link, params) {
    if (link.breadcrumbs) {
      return Object.keys(link.breadcrumbs).map(key => {
        return (
          <Card ref={function(input) {
            if(params.breadcrumb && input) {
              input.setState({expanded: true});
            }
          }} key={link.breadcrumbs[key]._id}>
            <CardHeader
              avatar={<Avatar size={30} backgroundColor={blue500}/>}
              title={link.breadcrumbs[key].content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
              <div>
                {this.getMessages(link.breadcrumbs[key])}
                <MessageForm
                  linkID={link._id}
                  studyMapID={this.props.study_map._id}
                  breadcrumbID={link.breadcrumbs[key]._id}
                  userID={this.props.user._id}
                  postMessage={ messageObj => {
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
          <div key={breadcrumb.messages[key]._id}> <Avatar size={15} backgroundColor={blueGrey500}/> {breadcrumb.messages[key].body} - {breadcrumb.messages[key].user.username}</div>
        )
      }).sort(compare);
    }
  },
  render: function() {
    const { isAuthenticated, user, study_map, dispatch, profile, params} = this.props;
    return (
      <div>
        <h3>{profile.displayName}'s study map:</h3>
        <h3>
          {study_map.subject}
        </h3>
        {Object.values(study_map.links).map(link =>
          <Card ref={function(input) {
            if(params.link && input) {
              input.setState({expanded: true});
            }
          }} key={link._id}>
            <CardHeader
              avatar={<Avatar size={30} backgroundColor={green500}/>}
              title={<a href={link.uri} target="_blank">{link.title}</a>}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
              <div>
                {this.getLinkBreadcrumbs(link, params)}
                <BreadcrumbForm
                  study_map={study_map}
                  user={user._id}
                  link={link._id}
                  postLinkBreadcrumb={ breadcrumbObj => {
                  this.props.dispatch(postLinkBreadcrumb(breadcrumbObj))
                }} />
              </div>
            </CardText>
          </Card>
        ).sort(compare).reverse()}

        <h3>Breadcrumbs</h3>
        {Object.keys(study_map.breadcrumbs).map(key =>
          <Card ref={function(input) {
            if(params.breadcrumb && input && !params.link) {
              input.setState({expanded: true});
            }
          }}
                id={study_map.breadcrumbs[key]._id}
                key={study_map.breadcrumbs[key]._id}>

            <CardHeader
              avatar={<Avatar size={30} backgroundColor={blue500}/>}
              title={study_map.breadcrumbs[key].content}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
              <div>
                {this.getMessages(study_map.breadcrumbs[key])}
              </div>
              <MessageForm
                studyMapID={study_map._id}
                breadcrumbID={study_map.breadcrumbs[key]._id}
                userID={user._id}
                postMessage={ messageObj => {
                dispatch(postMessage(messageObj))
              }}/>
            </CardText>
          </Card>

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
  let studyMap = state.profile.toJS().study_maps[ownProps.params.studyMap];

  return {
    isAuthenticated,
    user,
    study_map: studyMap,
    profile: state.profile.toJS()
  }

}

export const ConnectedProfileStudyMap = connect(mapStateToProps)(ProfileStudyMap);
