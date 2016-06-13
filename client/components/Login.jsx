import React from 'react';
import {hashHistory} from 'react-router';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import { ConnectedEchoes } from './Echoes';
import {Tabs, Tab} from 'material-ui/Tabs';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';


export default React.createClass({
  render: function() {
    return (
      <div>
      <Toolbar style={{backgroundColor: '#FF9800'}}>
        <ToolbarGroup>
          <ToolbarTitle style={{color: '#ffffff', fontSize: '18px'}} text="Community for avid learners"/>
        </ToolbarGroup>
      </Toolbar>

      <Tabs>
        <Tab style={{
          fontSize: '1.2em'
        }} label="Rabbit Hole">
          <div className='container'>
            <div className='row'>
              <div className='col-sm-8'>
                <ConnectedEchoes />
              </div>
              <div className='col-sm-4'>
                <div class='row'>
                  <div class='col-xs-12'>

                    <Card>
                      <CardHeader
                        title="ABOUT"
                        actAsExpander={true} />

                      <CardText expandable={true}>
                        <h4>For learners:</h4>
                        <List>
                          <ListItem primaryText="Organize subjects of study" />
                          <Divider inset={true} />
                          <ListItem primaryText="Collect resource links" />
                          <Divider inset={true} />
                          <ListItem primaryText="Pose questions and record thoughts" />
                          <Divider inset={true} />
                          <ListItem primaryText="Your activities are echoed on community feed" />
                          <Divider inset={true} />
                          <ListItem primaryText="Let community focus your path, so you don't become lost in information" />
                        </List>

                        <h4>For experts:</h4>
                        <List>
                          <ListItem primaryText="Help others to to discover and to focus on the right resources" />
                          <Divider inset={true} />
                          <ListItem primaryText="Provide mentorship without great time commitments" />
                          <Divider inset={true} />
                          <ListItem primaryText="Organize your studies so that others can learn and discover from your process" />
                        </List>
                      </CardText>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Tab>

        <Tab style={{
          fontSize: '1.2em'
        }} label="Login">
          <div className='container'>
            <div class='row'>
              <div class="col-xs-12">
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

              </div>
            </div>
          </div>
        </Tab>
      </Tabs>
      </div>
  );
  }
});
