import React from 'react';
import {hashHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { ConnectedEchoes } from './Echoes';

export default React.createClass({
  render: function() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-6'>
            <ConnectedEchoes />
          </div>
          <div className='col-sm-2'>
            <h3>Welcome to Rabbit Hole!</h3>
            <h3>Organize your studies and get help from community.</h3>
            <h4>Here's how it works:</h4>
            <List>
              <ListItem primaryText="Organize subjects of study" />
              <Divider inset={true} />
              <ListItem primaryText="Quickly add links" />
              <Divider inset={true} />
              <ListItem primaryText="Pose questions and record thoughts" />
              <Divider inset={true} />
              <ListItem primaryText="Your activities are echoed on community feed" />
              <Divider inset={true} />
              <ListItem primaryText="Let community focus your path, so you don't waste time" />
            </List>

            <h2>Experts:</h2>
            <List>
              <ListItem primaryText="Help others to focus on the right resources" />
              <Divider inset={true} />
              <ListItem primaryText="Provide mentorship without major commitments" />
              <Divider inset={true} />
              <ListItem primaryText="Organize your studies so that other can learn from your process" />
            </List>
          </div>
          <div className='col-sm-4'>

            <TextField hintText="Email"
                       fullWidth={true}
                       ref='username'
                       floatingLabelText="Email" />

            <TextField hintText="Password"
                       fullWidth={true}
                       type='password'
                       ref='password'
                       floatingLabelText="Password" />

            <RaisedButton label="Login"
                          onTouchTap={() => {
                            let loginObj = {};

                            Object.keys(this.refs).map((key) => {
                              loginObj = Object.assign(loginObj, {[key]: this.refs[key].input.value});
                            });

                            this.props.onLoginClick(loginObj);

                          }}/>

            <FlatButton label="Register"
                        primary={true}
                        onTouchTap={() => {
                          hashHistory.push('/register');
                        }} />

            <Card>
              <CardHeader
                title="About"
                actAsExpander={true} />

              <CardText expandable={true}>
                <blockquote>"What exactly should I study? How do I best use my time?"</blockquote>

                <p>
                  These are questions I'm asking myself several times a day.
                  I'm building this app for myself and people like myself whom
                  crave knowledge with a fire in their belly, however, that also
                  worry about how little time on this Earth that we have to learn.
                </p>

                <p>
                  I, <a href="https://github.com/hunterlester" target="_blank">Hunter Lester</a>,
                  am a former farm, dairy, and warehouse worker, turned lover of computer science
                  and programming.
                </p>

                <blockquote>So much to learn yet life is so short. Down the rabbit hole together...</blockquote>

              </CardText>
            </Card>
          </div>
        </div>
      </div>
  );
  }
});
