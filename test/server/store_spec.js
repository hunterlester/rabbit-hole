import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import makeStore from '../../server/state/store';

describe('server store', () => {

  it('is a Redux store configured with the correct reducer', () => {
    const store = makeStore();
    expect(store.getState()).to.equal(Map());

    const echoes = JSON.stringify([{echo: 'echo1'}, {echo: 'echo2'}]);
    store.dispatch({
      type: 'SET_ECHOES',
      echoes: echoes
    });
    expect(store.getState()).to.equal(fromJS({
      echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
    }));
  });
});
