import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LinkForm from './LinkForm';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';
import {green500} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import Paper from 'material-ui/Paper';

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
        <div>
          <h3 style={{textAlign: 'right'}}>Get started by creating a new subject</h3>
          <h3 style={{textAlign: 'right'}}>(click the green folder)</h3>
        </div>
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
          <div key={study_map.links[key]._id}>
            <a href={study_map.links[key].uri} target="_blank">
              <h5>{study_map.links[key].title}</h5>
            </a>
            <h6>{study_map.links[key].uri}</h6>
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
                  <CreateNewFolder style={{margin: '3%'}} color={green500} />
                </IconButton>

                {Object.values(study_maps).map(study_map => {
                  let style = {};
                  const seen = 'seen';
                  let linkNotify = Object.values(study_map.links).some(link => {
                    return Object.values(link.breadcrumbs).some(brdcrmb => {
                      return brdcrmb.seen == false;
                    })
                  });
                  let notify = Object.values(study_map.breadcrumbs).some(brdcrmb => {
                    return brdcrmb.seen == false;
                  });
                  if(notify) {
                    style.backgroundColor = '#2196F3';
                  } else if(linkNotify) {
                    style.backgroundColor = '#2196F3';
                  }
                  return (
                    <Card style={{clear: 'both'}} key={study_map._id}>
                      <CardHeader
                        title={study_map.subject}
                        actAsExpander={true}
                        showExpandableButton={true}
                        style={style}
                      />
                      <CardText className="clearfix" expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                        <RaisedButton label="Open" className='pull-right' onTouchTap={() => {
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
