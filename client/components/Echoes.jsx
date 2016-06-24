import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import moment from 'moment';
import MessageForm from './MessageForm';
import BreadcrumbForm from './BreadCrumbForm';
import Select from 'react-select';
import { white, orange500, green500, blue500, blueGrey500 } from 'material-ui/styles/colors';
import Avatar from 'material-ui/Avatar';

import { getProfile } from '../state/reducer_components/profile/core';
import {
  postBreadcrumb,
  postLinkBreadcrumb,
  postMessage,
  postLinkMessage } from '../state/api/actions';

function compare(a , b) {
  return Date.parse(a.date) - Date.parse(b.date);
}

export const Echoes = React.createClass({
  getInitialState () {
    let keywords, keyList;
    if(this.props.user_subscriptions) {
      keywords = Object.values(this.props.user_subscriptions).map(obj => {
        return Object.assign({}, {value: obj._id, label: obj.keyword});
      });
      keyList = Object.values(this.props.user_subscriptions).map(obj => {
        return obj._id;
      });
    }

    return {
      value: keywords || [],
      keyIDs: keyList || []
    }
  },
  handleSelectChange(value) {
    this.refs.filter.closeMenu();
    this.setState({value});
    this.setState({keyIDs: value.map(val => val.value)});
  },
  parseEchoes: function(echoes) {
    return Object.values(echoes).map(echo => {
      if(echo.studymap) {
        echo.body = `${echo.studymap.subject}`;
        echo.quickreply = <BreadcrumbForm
          study_map={echo.studymap}
          user={this.props.user._id}
          postBreadcrumb={ breadcrumbObj => {
          this.props.dispatch(postBreadcrumb(breadcrumbObj)) }} />;
        return echo;
      } else if (echo.breadcrumb && echo.breadcrumb.link) {
        echo.quickreply = <MessageForm
          linkID={echo.breadcrumb.link}
          studyMapID={echo.breadcrumb.study_map._id}
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
        echo.body = `${echo.breadcrumb.content}`;
        echo.subtitle = `${echo.breadcrumb.study_map.subject}`
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
        echo.body = `${echo.breadcrumb.content}`;
        echo.subtitle = `${echo.breadcrumb.study_map.subject}`
        return echo;
      } else if (echo.message && echo.message.link) {
        echo.subtitle = `${echo.message.breadcrumb.content}`
        echo.body = `${echo.message.body}`;
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
        echo.subtitle = `${echo.message.breadcrumb.content}`
        echo.body = `${echo.message.body}`;
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
        echo.body = `${echo.link.title}`
        echo.subtitle = `${echo.link.study_map.subject}`
        echo.linkuri = <a href={echo.link.uri} target="_blank">{echo.link.uri}</a>
        echo.quickreply = <BreadcrumbForm
          disabled={!this.props.isAuthenticated}
          study_map={echo.link.study_map}
          user={this.props.user._id}
          link={echo.link._id}
          postLinkBreadcrumb={ breadcrumbObj => {
          this.props.dispatch(postLinkBreadcrumb(breadcrumbObj))
        }} />;
        echo.action = <FlatButton label='go to link post' onTouchTap={() => {
          this.props.dispatch(getProfile(
            echo.user._id,
            `/profile/link/${echo.link.study_map._id}/${echo.link._id}`
          ))
        }} />
        return echo;
      } else {
        return echo;
      }
    }).filter(echo => {
      if(!this.state.value.length) {
        return echo;
      } else {
        if(echo.link) {
          let filterBool = Object.keys(echo.link.study_map.keywords).some(key => {
            return this.state.keyIDs.some(id => key == id);
          });
          if(filterBool) {
            return echo;
          }
        } else if (echo.breadcrumb) {
          let filterBool = Object.keys(echo.breadcrumb.study_map.keywords).some(key => {
            return this.state.keyIDs.some(id => key == id);
          });
          if(filterBool) {
            return echo;
          }
        } else if (echo.message) {
          let filterBool = Object.keys(echo.message.study_map.keywords).some(key => {
            return this.state.keyIDs.some(id => key == id);
          });
          if(filterBool) {
            return echo;
          }
        } else if (echo.studymap) {
          let filterBool = Object.keys(echo.studymap.keywords).some(key => {
            return this.state.keyIDs.some(id => key == id);
          });
          if(filterBool) {
            return echo;
          }
        }
      }
    }).sort(compare).reverse();
  },
 render: function() {

   const {echoes, isAuthenticated} = this.props;

   let keywords = Object.values(this.props.subjects).map(obj => {
     return Object.assign({}, {value: obj._id, label: obj.keyword});
   });

   return (
     <div>
       <Select
         ref='filter'
         className="selectInput"
         value={this.state.value}
         options={keywords}
         multi={true}
         placeholder="Start typing to find your favorite subjects"
         onChange={this.handleSelectChange}
         noResultsText='Subject not found. Be the first to contribute!'
       />
       {this.parseEchoes(echoes).map(echo => {
         let avatarColor = '';
         let subtitle = echo.subtitle || '';
         if(echo.studymap) {
           avatarColor = orange500;
         } else if(echo.link) {
           avatarColor = green500;
         } else if(echo.breadcrumb) {
           avatarColor = blue500;
         } else if(echo.message) {
           avatarColor = blueGrey500;
         }
         return (
           <Card key={echo._id}>
             <CardHeader
               title={`${echo.body}`}
               avatar={<Avatar size={30} backgroundColor={avatarColor}/>}
               titleStyle={{fontSize: '1.25em'}}
               subtitle={`@${echo.user.displayName} ${subtitle}`}
               actAsExpander={true}
               showExpandableButton={false}/>

             <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
              <div className='pull-right'>
                {moment(echo.date).fromNow()}
              </div>
              {echo.linkuri}
              {echo.quickreply}
             </CardText>
             <CardActions expandable={true} style={{backgroundColor: '#ECEFF1'}}>
              {echo.action}
            </CardActions>
            <CardActions expandable={true} style={{backgroundColor: '#ECEFF1'}}>
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
  const subjects = state.subjects.toJS().subjects;
  return {
    user,
    isAuthenticated,
    subjects,
    user_subscriptions: user.subscribed_subjects,
    echoes: state.echoes.toJS().echoes
  };
}

export const ConnectedEchoes = connect(mapStateToProps)(Echoes);
