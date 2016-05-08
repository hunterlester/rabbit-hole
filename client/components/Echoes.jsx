import React from 'react';
import {connect} from 'react-redux';

export const Echoes = React.createClass({
 render: function() {
   return (
     <div>Echoes</div>
   );
 }
});

function mapStateToProps(state) {
  return {
    state
  };
}

export const ConnectedEchoes = connect(mapStateToProps)(Echoes);
