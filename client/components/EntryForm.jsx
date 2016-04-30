import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import GridList from 'material-ui/lib/grid-list/grid-list';
import GridTile from 'material-ui/lib/grid-list/grid-tile';
import AppBar from 'material-ui/lib/app-bar';
import Checkbox from 'material-ui/lib/checkbox';
import Divider from 'material-ui/lib/divider';
import PureRenderMixin from 'react-addons-pure-render-mixin';

const styles = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  },
  gridList: {
    width: 500,
    overflowY: 'auto',
    height: 400,
  }
};

export default React.createClass({
  mixins: [PureRenderMixin],
  render: function() {
    return <div>
      <TextField
        ref='foods_drinks_consumed'
        hintText="Separate items with a comma"
        floatingLabelText="Which foods and drinks did you enjoy today?"
        multiLine={true}
        rows={1}
        style = {{width: 1000}}
      />

      <TextField
        ref='supplements'
        hintText="Separate items with a comma"
        floatingLabelText="Which supplements did you take?"
        multiLine={true}
        rows={1}
        style = {{width: 1000}}
      />

      <TextField
        ref='times_baby_awake'
        hintText="Please enter a number"
        floatingLabelText="How many times did baby wake up?"
        rows={1}
        style = {{width: 1000}}
      />

      <Checkbox style={{
                  marginTop: 40,
                  marginBottom: 40
                }}
                ref="completely_awake"
                label="Check the box if baby completely woke up at any time (otherwise leave unchecked)" />

      <RaisedButton
        label="Save"
        onTouchTap={() => {
          let entry = {};
          let result = Object.keys(this.refs).map((key) => {
            if (this.refs[key].getValue) {
              if (Number.isNaN(Number.parseInt(this.refs[key].getValue()))) {
                entry = Object.assign(entry, { [key]: this.refs[key].getValue().split(",") });
              } else {
                entry = Object.assign(entry, { [key]: Number.parseInt(this.refs[key].getValue()) });
              }
            } else if (this.refs[key].isChecked) {
              entry = Object.assign(entry, { [key]: this.refs[key].isChecked() });
            }
          });
          this.props.postEntry(entry);
          Object.keys(this.refs).map(key => {
            if (this.refs[key].clearValue) {
              this.refs[key].clearValue();
            } else {
              this.refs[key].setChecked();
            }
          });
        }}
      />

    </div>;
  }
});
