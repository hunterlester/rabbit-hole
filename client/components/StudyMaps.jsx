import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LinkForm from './LinkForm';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import CreateNewFolder from 'material-ui/svg-icons/file/create-new-folder';

import { postLink } from '../state/api/actions';

export const StudyMaps = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
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
    const { dispatch, isAuthenticated, errorMessage, user, study_maps } = this.props;
    return (
      <div>
        {isAuthenticated &&
          <div className="row">

              <div style={{borderLeft: '1px solid #E0E0E0'}} className="col-sm-4 col-sm-push-8">
                <LinkForm userID={user._id} studyMaps={study_maps} postLink={(linkObj) => dispatch(postLink(linkObj))} />
              </div>

              <div className="col-sm-8 col-sm-pull-4">

                <CreateNewFolder className="pull-right" style={{margin: '3%'}} onClick={() => {
                  hashHistory.push('/studyMapForm')
                }}/>

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
                      <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
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
  return {
    isAuthenticated,
    user,
    study_maps: state.study_maps.toJS().study_maps
  };
}

export const ConnectedStudyMaps = connect(mapStateToProps)(StudyMaps);
