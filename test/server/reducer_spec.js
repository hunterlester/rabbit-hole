import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../../server/state/reducer';

describe('reducer', () => {

  it('handles SET_ECHOES', () => {
    const initialState = Map();
    const echoes = JSON.stringify([{echo: 'echo1'}, {echo: 'echo2'}]);
    const action = {type: 'SET_ECHOES', echoes: echoes};
    const nextState = reducer(initialState, action);

    expect(nextState).to.equal(fromJS({
      echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
    }))
  })
})
