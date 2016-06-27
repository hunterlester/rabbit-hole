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
import Dialog from 'material-ui/Dialog';
import Info from 'material-ui/svg-icons/action/info';

import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import {Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import {blue500, white, green500, orange500, blueGrey900} from 'material-ui/styles/colors';

import { confirmEmail } from '../state/reducer_components/notifications/core';


export default React.createClass({
  getInitialState() {
    return {
      open: false
    };
  },
  handleClose: function() {
    this.setState({
      open: false
    })
  },
  handleOpen: function() {
    this.setState({
      open: true
    })
  },
  componentDidMount() {
    if(this.props.location.split('/')[1] == 'confirm') {
      this.props.dispatch(confirmEmail(this.props.location.split('/')[2]));
    }
  },
  render: function() {
    const listItemStyles = {
      color: white
    };
    return (
      <div>
      <Toolbar style={{backgroundColor: orange500}}>
        <ToolbarGroup>
          <ToolbarTitle style={{color: '#ffffff'}} text="Learnimus. Community for avid learners."/>
          <IconButton touch={true} onTouchTap={() => {
            this.handleOpen();
          }}>
            <Info color={blueGrey900}/>
          </IconButton>
        </ToolbarGroup>
      </Toolbar>
      <Dialog
        modal={false}
        bodyStyle={{textAlign: 'center', backgroundColor: orange500}}
        open={this.state.open}
        onRequestClose={() => {
          this.handleClose()
        }}
      >
        <h4 style={{color: '#000000'}}>Learnimus is a play on the Latin verb, discimus, meaning 'We learn.' Welcome and have fun!</h4>
      </Dialog>

      <Tabs>
        <Tab style={{
          fontSize: '1.2em'
        }} label="Explore">
          <div className='container'>
            <div className='row'>
              <div className='col-sm-4 col-sm-push-8'>
                <div class='row'>
                  <div class='col-xs-12'>
                    <Card style={{marginTop: '15px'}}>
                      <CardHeader
                        title="How it works"
                        titleColor={white}
                        style={{backgroundColor: blue500}}
                        actAsExpander={true} />

                      <CardText expandable={true} style={{backgroundColor: green500}}>
                        <List style={{backgroundColor: green500}}>
                          <ListItem style={listItemStyles} primaryText="Organize your subjects of study" />
                          <ListItem style={listItemStyles} primaryText="Collect resource links" />
                          <ListItem style={listItemStyles} primaryText="Pose questions and record thoughts" />
                          <ListItem style={listItemStyles} primaryText="Your activities are echoed on community feed" />
                          <ListItem style={listItemStyles} primaryText="Discover more helpful resources" />
                          <ListItem style={listItemStyles} primaryText="Let community focus your path, so you don't become lost in information" />
                        </List>

                        <h4 style={{color: white}}>Give back:</h4>
                        <Divider />

                        <List>
                          <ListItem style={listItemStyles} primaryText="Help others to discover and to focus on relevant resources" />
                          <ListItem style={listItemStyles} primaryText="Provide mentorship without great time commitments" />
                          <ListItem style={listItemStyles} primaryText="Organize your studies so that others can learn and discover from your process" />
                        </List>
                      </CardText>
                    </Card>
                  </div>
                </div>
              </div>
              <div className='col-sm-8 col-sm-pull-4'>
                <ConnectedEchoes />
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
                              backgroundColor={blue500}
                              labelColor={white}
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
