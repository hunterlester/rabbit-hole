import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LinkForm from './LinkForm';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';
import {orange500, green500, blue500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

import { postLink } from '../state/api/actions';

const style = {
  padding: 20,
  textAlign: 'center',
  margin: 20,
  backgroundColor: green500
};

export const StudyMaps = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  newUser: function() {
    if(!Object.values(this.props.study_maps).length) {
      return (
        <Paper style={style} zDepth={5}>
          <h3>Get started by creating a new subject</h3>
          <h3>(click the orange folder)</h3>
        </Paper>
      );
    }
  },
  linkTour: function(studyMapCount, linkCount) {
    if(studyMapCount == 1 && linkCount == 0) {
      return (
        <Paper style={style} zDepth={5}>
          <h3 style={{color: '#ffffff'}}>Now start adding links to your subject with the form below</h3>
        </Paper>
      );
    }
  },
  getStudyMaps: function() {
    return this.props.study_maps || [];
  },
  getLinks: function(study_map) {
    if(study_map.links) {
      return Object.keys(study_map.links).map(key => {
        return (
          <div key={study_map.links[key]._id} className='row clearfix'>
            <div className='col-xs-1'>
              <Avatar size={15} backgroundColor={green500}/>
            </div>
            <div className='col-xs-8'>
              <a href={study_map.links[key].uri} target="_blank">
                {study_map.links[key].title}
              </a>
              <h6>{study_map.links[key].uri}</h6>
            </div>
          </div>
        );
      });
    }
  },
  render: function() {
    const { dispatch, isAuthenticated, errorMessage, user, study_maps, studyMapCount, linkCount } = this.props;
    return (
      <div>
        {isAuthenticated &&
          <div className="row">

              <div style={{borderLeft: '1px solid #E0E0E0'}} className="col-sm-4 col-sm-push-8">
                {this.linkTour(studyMapCount, linkCount)}
                <LinkForm userID={user._id} studyMaps={study_maps} postLink={(linkObj) => dispatch(postLink(linkObj))} />
              </div>

              <div className="col-sm-8 col-sm-pull-4">
                  {this.newUser()}
                <IconButton className="pull-right" iconStyle={{height: 36, width: 36}} touch={true} onTouchTap={() => {
                  hashHistory.push('/studyMapForm')
                }}>
                  <CreateNewFolder style={{margin: '3%'}} color={orange500} />
                </IconButton>

                {Object.values(study_maps).map(study_map => {
                  const seen = 'seen';
                  let linkNotify = Object.values(study_map.links).some(link => {
                    return Object.values(link.breadcrumbs).some(brdcrmb => {
                      return brdcrmb.seen == false;
                    })
                  });
                  let notify = Object.values(study_map.breadcrumbs).some(brdcrmb => {
                    return brdcrmb.seen == false;
                  });
                  let avatarColor = orange500;
                  if(notify) {
                    avatarColor = blue500;
                  } else if(linkNotify) {
                    avatarColor = green500;
                  }
                  return (
                    <Card style={{clear: 'both'}} key={study_map._id}>
                      <CardHeader
                        avatar={<Avatar size={30} backgroundColor={avatarColor}/>}
                        title={study_map.subject}
                        actAsExpander={true}
                        showExpandableButton={true}
                      />
                      <CardText className="clearfix" expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                        <RaisedButton label="Open" className='pull-right clearfix' onTouchTap={() => {
                          hashHistory.push(`/studymaps/${study_map._id}`)
                        }}/>
                        <div>
                          {this.getLinks(study_map)}
                        </div>
                      </CardText>
                    </Card>
                  )
                }
              )}
              </div>
          </div>
        }
      </div>
    );
  }
});

function mapStateToProps(state) {
  const { isAuthenticated, user } = state.auth.toJS();
  const study_maps = state.study_maps.toJS().study_maps;
  const count = Object.values(study_maps).length;
  let linkCount;
  if(count == 1) {
    Object.values(study_maps).map(study_map => {
      if(!Object.values(study_map.links).length) {
        linkCount = 0;
      }
    })
  }
  return {
    isAuthenticated,
    user,
    study_maps: study_maps,
    studyMapCount: count,
    linkCount: linkCount
  };
}

export const ConnectedStudyMaps = connect(mapStateToProps)(StudyMaps);
