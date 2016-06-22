import React from 'react';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import {orange500, blue500, white, green500, red500, red900, blueGrey500, darkBlack, yellow500} from 'material-ui/styles/colors';


export default React.createClass({
  render: function() {
    return (
      <div>
        <Card style={{backgroundColor: orange500, marginTop: '15px'}}>
          <CardHeader
            title='GRATITUDE & DUES'
            titleColor={white}
            actAsExpander={true}
          />
          <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
            <Card style={{backgroundColor: orange500}}>
              <CardHeader
                title='call-em-all for Material UI'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                The design components for this app were created created using
                <a href="http://www.material-ui.com/#/" target="_blank"> Material UI</a>.
                Thank you so much for creating these beautiful React components!
              </CardText>
            </Card>
            <Card style={{backgroundColor: red500}}>
              <CardHeader
                title='Google for Material Design'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                This app would be lost and ugly without Google's Material Design. Thank you <a href="https://material.google.com/" target="_blank">Material Design</a>.
              </CardText>
            </Card>
            <Card style={{backgroundColor: blue500}}>
              <CardHeader
                title='Facebook for React'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                React is such a pleasure. How can I describe how lovely it is to develop this app. Thank you.
              </CardText>
            </Card>
            <Card style={{backgroundColor: blueGrey500}}>
              <CardHeader
                title='Dan Abramov for Redux'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                I become a better developer just by reading the Redux documentation. Testing, development, and organization has become so simple and pleasurable due to Redux. Thank you.
              </CardText>
            </Card>
            <Card style={{backgroundColor: red900}}>
              <CardHeader
                title='Geekwise, Bitwise, and Greg Goforth'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                Thank you to the Fresno tech hub that is Geekwise and Bitwise. Thank you Greg for helping me to make that great leap into learning full stack development.
              </CardText>
            </Card>
            <Card style={{backgroundColor: yellow500}}>
              <CardHeader
                title='Eric Elliott and Kyle Simpson'
                titleColor={darkBlack}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                Thank you for making me a better JS developer. Love you two. Composition over inheritance.
              </CardText>
            </Card>
            <Card style={{backgroundColor: green500}}>
              <CardHeader
                title='Thank you'
                titleColor={white}
                actAsExpander={true}
              />
              <CardText expandable={true} style={{backgroundColor: '#ECEFF1'}}>
                Thank you to all that missed. If this app is successful, it's because of the hard work of so many people that I don't even know.
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
