import React from 'react';
import { connect } from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export const StudyMap = React.createClass({
  shouldComponentUpdate: function(nextProps, nextState) {
    return true;
  },
  render: function() {
    const { isAuthenticated, user, study_map} = this.props;
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

              </div>
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
    if (study_map._id = ownProps.params.studyMap) {
      return study_map;
    }
  });

  return {
    isAuthenticated,
    user,
    study_map: studyMap
  };
}

export const ConnectedSingleStudyMap = connect(mapStateToProps)(StudyMap);
