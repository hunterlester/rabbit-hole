import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import {setEchoes, postEcho, setSubjects, postSubject} from '../../server/state/core';

describe('application logic', () => {

  describe('postSubject', () => {
    it('adds new subject object to subjects array', () => {
      const state = fromJS({
        echoes: [{echo: 'echo1'}, {echo: 'echo2'}],
        subjects: [{subject: 'rust'}, {subject: 'redux'}]
      });
      const subject = {subject: 'posix'};
      const nextState = postSubject(state, subject);
      expect(nextState).to.equal(fromJS({
        echoes: [{echo: 'echo1'}, {echo: 'echo2'}],
        subjects: [{subject: 'rust'}, {subject: 'redux'}, {subject: 'posix'}]
      }));
    })
  })

  describe('setSubjects', () => {
    it('merges fetched subjects to the state', () => {
      const state = fromJS({
        echoes: [{echo: 'echo1'}, {echo: 'echo2'}]
      });
      const subjects = [{subject: 'rust'}, {subject: 'redux'}];
      const nextState = setSubjects(state, subjects);
      expect(nextState).to.equal(fromJS({
        echoes: [{echo: 'echo1'}, {echo: 'echo2'}],
        subjects: [{subject: 'rust'}, {subject: 'redux'}]
      }));
    });
  });

  describe('setEchoes', () => {
    it('merges fetched echoes to the state', () => {});

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
