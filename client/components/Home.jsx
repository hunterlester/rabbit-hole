import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import ReactSwipe from 'react-swipe';
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

const swipeOptions = {
  startSlide: 0,
  continuous: false
};

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
            <IconButton bsStyle="warning" bsSize="large" block onClick={() => this.refs.ReactSwipe.swipe.prev()}><AvBack /></IconButton>
            <IconButton bsStyle="warning" bsSize="large" block onClick={() => this.refs.ReactSwipe.swipe.next()}><AvForward /></IconButton>

            <ReactSwipe ref='ReactSwipe' id='mySwipe' swipeOptions={swipeOptions}>
              <div key={0}>
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

              <div key={1}>
                <EntryForm postEntry={(entry) => dispatch(postEntry(entry))} />
              </div>

            </ReactSwipe>
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
