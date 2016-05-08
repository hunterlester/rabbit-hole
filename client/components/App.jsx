import React from 'react';

export default React.createClass({
  render: function() {
    console.log(this.props);
    return this.props.children;
  }
});
