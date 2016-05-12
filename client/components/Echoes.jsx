import React from 'react';
import {connect} from 'react-redux';
import Card from 'material-ui/lib/card/card';
import CardHeader from 'material-ui/lib/card/card-header';
import CardText from 'material-ui/lib/card/card-text';

export const Echoes = React.createClass({
  parseEchoes: function(echoes) {
    return echoes.filter(echo => {
      if(echo.breadcrumb || echo.link || echo.message || echo.studymap) {
        return echo;
      }
    }).map(echo => {
      if(echo.studymap) {
        echo.body = `${echo.user.username} is studying ${echo.studymap.subject}`;
        return echo;
      } else if (echo.breadcrumb) {
        echo.body = `Breadcrumb: ${echo.breadcrumb.content}`;
        return echo;
      } else if (echo.message) {
        echo.body = `Message: ${echo.message.body}`;
        return echo;
      } else if (echo.link) {
        echo.body = `${echo.link.uri} - ${echo.link.title}`
        return echo;
      } else {
        return echo;
      }
    }).reverse();
  },
 render: function() {
   const {echoes} = this.props;
   return (
     <div>
       <h3>
        Activity Echoes
       </h3>
       {this.parseEchoes(echoes).map(echo => {
         return (
           <Card key={echo._id}>
             <CardHeader
               title={echo.body}
               actAsExpander={true}
               showExpandableButton={true}
             />
             <CardText expandable={true}>
               <div>

               </div>
             </CardText>
           </Card>
         );
       })}
     </div>
   );
 }
});

function mapStateToProps(state) {
  return {
    echoes: state.echoes.toJS().echoes
  };
}

export const ConnectedEchoes = connect(mapStateToProps)(Echoes);
