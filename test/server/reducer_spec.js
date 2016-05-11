import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../server/state/reducer';

describe('reducer', () => {

  it('has an initial state in the case that state is undefined', () => {
    const echoes = JSON.stringify([{echo: 'echo1'}, {echo: 'echo2'}]);
    const action = {type: 'SET_ECHOES', echoes: echoes};
    const nextState = reducer(undefined, action);
    expect(nextState).to.equal(fromJS({
      echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
    }))
  });

  it('handles SET_ECHOES', () => {
    const initialState = Map();
    const echoes = JSON.stringify([{echo: 'echo1'}, {echo: 'echo2'}]);
    const action = {type: 'SET_ECHOES', echoes: echoes};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
    }));
  });

  it('handles POST_ECHO', () => {
    const initialState = fromJS({
      echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
    });
    const echo = JSON.stringify({echo: 'echo3'});
    const action = {type: 'POST_ECHO', echo: echo};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      echoes: [{echo: 'echo1'}, {echo: 'echo2'}, {echo: 'echo3'}]
    }))
  })
});
