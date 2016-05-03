import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import EntryForm from './EntryForm';
import Login from './Login';
import IconButton from 'material-ui/lib/icon-button';
import AvForward from 'material-ui/lib/svg-icons/av/fast-forward';
import AvBack from 'material-ui/lib/svg-icons/av/fast-rewind';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';
import { loginUser } from '../state/user_login/login_actions_core';
import { postEntry } from '../state/api/actions';
import moment from 'moment';

export const Home = React.createClass({
  mixins: [PureRenderMixin],
  getEntries: function() {
    return this.props.entries || [];
  },
  render: function () {
    const { dispatch, isAuthenticated, errorMessage } = this.props;
    return (
      <div>

        {!isAuthenticated &&
          <Login onLoginClick={ creds => dispatch(loginUser(creds)) }/>
        }

        {isAuthenticated &&
          <div>

              <div>
                <h1>Entries</h1>
                {this.getEntries().reverse().map(entry =>
                  <Card>
                    <CardHeader
                      title={moment(entry['date']).format('MMMM Do YYYY, h:mm:ss a')}
                      actAsExpander={true}
                      showExpandableButton={true}
                    />
                    <CardText expandable={true}>
                      <div id="card_text"><span id="card">{entry['completely_awake'] && 'Baby Woke up Completely'}</span> </div>
                      <div id="card_text">Number of wake ups: <span id="card">{entry['times_baby_awake']}</span> </div>
                      <div id="card_text">Foods and drinks:</div>
                      <span id="card">{entry['foods_drinks_consumed']}</span>
                      <div id="card_text">Supplements:</div>
                      <span id="card">{entry['supplements']}</span>
                    </CardText>
                  </Card>
                )}

              </div>

              <div>
                <EntryForm postEntry={(entry) => dispatch(postEntry(entry))} />
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
    entries: state.entries.toJS().entries
  }
}

export const ConnectedHome = connect(mapStateToProps)(Home);
