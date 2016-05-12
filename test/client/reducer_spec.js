import {fromJS, Map} from 'immutable';
import {expect} from 'chai';

import echoes from '../../client/state/reducer_components/echoes';

describe('client reducer', () => {

  it('handles SET_ECHOES', () => {
    const initialState = fromJS({
      study_maps: { study_maps: {_id: 1}},
      auth: {user: 'user3'},
      echoes: {echoes: []}
    });
    const action = {
      type: 'SET_ECHOES',
      state: {echoes: [{echo: "echo1"}, {echo: "echo2"}]}
    };
    const nextState = echoes(initialState, action);
    expect(nextState).to.equal(fromJS({
      study_maps: { study_maps: {_id: 1}},
      auth: {user: 'user3'},
      echoes: {echoes: [{echo: "echo1"}, {echo: "echo2"}]}
    }))
  })
})
