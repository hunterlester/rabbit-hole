import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {deepPurple500, orange500, blue500, white, green500, red500, red900, blueGrey500, darkBlack, yellow500} from 'material-ui/styles/colors';
import { List, ListItem } from 'material-ui/List';

export default React.createClass({
  render: function() {
    return (
      <div>
        <Card style={{backgroundColor: orange500, marginTop: '15px'}}>
          <CardHeader
            title='GRATITUDE TO'
            titleColor={white}
            actAsExpander={true}
          />
          <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
            <Card style={{backgroundColor: orange500}}>
              <CardHeader
                title='Call-Em-All for Material UI'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                The design components for this app were created using
                <a href="http://www.material-ui.com/#/" target="_blank"> Material UI</a>.
              </CardText>
            </Card>
            <Card style={{backgroundColor: red500}}>
              <CardHeader
                title='Google for Material Design'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                This UI would be lost without Google's <a href="https://material.google.com/" target="_blank">Material Design</a>.
              </CardText>
            </Card>
            <Card style={{backgroundColor: blue500}}>
              <CardHeader
                title='Facebook for React'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                <a href="https://facebook.github.io/react/" target='_blank'>React</a> components are speedy and such a pleasure.
              </CardText>
            </Card>
            <Card style={{backgroundColor: deepPurple500}}>
              <CardHeader
                title='Dan Abramov for Redux'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                Thanks to <a href="http://redux.js.org/" target="_blank">Redux</a> for simple structure and for making me a better developer.
              </CardText>
            </Card>
            <Card style={{backgroundColor: yellow500}}>
              <CardHeader
                title='Eric Elliott and Kyle Simpson'
                titleColor={darkBlack}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                <a href="https://ericelliottjs.com/" target="_blank">Eric Elliott</a> and <a href="http://getify.com/" target="_blank">Kyle Simpson</a> for making me a better JS developer and overall better thinker. Love you two. Composition over inheritance.

              </CardText>
            </Card>
            <Card style={{backgroundColor: green500}}>
              <CardHeader
                title='Thank you'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                If this app is successful, it's because of the hard work of so many people that I don't even know.
                Thank you for my life and for my son. Thank you for my insatiable love for learning.
              </CardText>
            </Card>
          </CardText>
        </Card>

        <Card style={{backgroundColor: blue500}}>
          <CardHeader
            title='POLICIES'
            titleColor={white}
            actAsExpander={true}
          />
          <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
          <List>
            <ListItem primaryText="We love to learn and to help each other learn." />
            <ListItem primaryText="Be grateful for differences of opinon in discussion. This leads to deeper learning." />
            <ListItem primaryText="When altercations arise, keep it constructive and logical." />
            <ListItem primaryText="Refrain from wasting resources and time with trolling, flaming, spamming, or any malicious behavior" />
          </List>
          </CardText>
        </Card>

        <Card style={{backgroundColor: green500}}>
          <CardHeader
            title='BACKGROUND'
            titleColor={white}
            actAsExpander={true}
          />
          <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
          </CardText>
        </Card>
      </div>
    );
  }
});
