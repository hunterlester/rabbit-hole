import React from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import LinkForm from './LinkForm';

import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import CreateNewFolder from 'material-ui/lib/svg-icons/file/create-new-folder';

import { postLink } from '../state/api/actions';

export const StudyMaps = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  getStudyMaps: function() {
    return this.props.study_maps || [];
  },
  getLinks: function(study_map) {
    if(study_map.links.length) {
      return study_map.links.map(link => {
        return (
          <Card key={link._id}>
            <CardHeader
              title={<a href={link.uri} target="_blank">{link.title} ~ {link.uri}</a>}
              actAsExpander={true}
              showExpandableButton={true}
            />
            <CardText expandable={true}>
              <div>

              </div>
            </CardText>
          </Card>
        );
      });
    }
  },
  render: function() {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div>
        {isAuthenticated &&
          <div>

              <div>
                <h5>Link Entry</h5>
                <LinkForm studyMaps={this.props.study_maps} postLink={(linkObj) => dispatch(postLink(linkObj))} />
              </div>

              <div>
                <h3>
                  Subjects
                  <CreateNewFolder onClick={() => {
                    hashHistory.push('/studyMapForm')
                  }}/>
                </h3>

                {this.getStudyMaps().map(study_map =>
                  <Card key={study_map._id}>
                    <CardHeader
                      title={study_map.subject}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      <div>
                        {this.getLinks(study_map)}
                      </div>
                    </CardText>
                  </Card>
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
