import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEchoes, postEcho} from '../../server/state/core';

describe('application logic', () => {

  describe('setEchoes', () => {
    it('adds fetched echoes to the state', () => {});

    it('converts to immutable from JS', () => {
      const state = Map();
      const echoes = [{echo: 'echo1'}, {echo: 'echo2'}];
      const nextState = setEchoes(state, echoes);
      expect(nextState).to.equal(fromJS({
        echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
      }));
    });
  });

  describe('postEcho', () => {
    it('adds a newly created echo to the echoes feed', () => {});

    it('converts to immutable from JS', () => {
      const state = fromJS({
        echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
      });
      const echo = {echo: 'echo3'};
      const nextState = postEcho(state, echo);

      expect(nextState).to.equal(fromJS({
        echoes: [{echo: 'echo1'}, {echo: 'echo2'}, {echo: 'echo3'}]
      }));
    })
  })
});
