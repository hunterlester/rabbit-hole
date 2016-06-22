import fetch from 'isomorphic-fetch'
import { fromJS } from 'immutable';
import cleanest from 'cleanest';
const BASE_URL = `${location.protocol}//${location.hostname}:${location.port}/`;

function callApi(endpoint, authenticated, method, obj) {
  let token = localStorage.getItem('token') || null;
  let userId = localStorage.getItem('_id');
  let config = {};

  function configFactory(method, token, formObject) {
    let body;
    if (formObject) {
      body = Object.keys(formObject).map(key => {
        if(key == 'keywords') {
          return formObject[key].map(keyword => {
            return key + '=' + keyword;
          }).join('&')
        }
        return key + '=' + formObject[key];
      }).join('&');
    }

    switch (method) {
      case 'POST':
        return {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type':'application/x-www-form-urlencoded'
          },
          body: body
        };

      case 'GET':
        return {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };

      case 'PUT':
        return {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type':'application/x-www-form-urlencoded'
          },
          body: body
        };

    }
  };

  config = configFactory(method, token, obj);

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      let cleaned_json = cleanest(json);

      let localStudyMaps = JSON.parse(localStorage.getItem('study_maps'));

      if(json.study_map && json.study_map in localStudyMaps ) {
        if ( endpoint == 'breadcrumbs/studymap') {
         let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
         parsedStudyMaps[cleaned_json.study_map].breadcrumbs[cleaned_json._id] = cleaned_json;
         let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
         localStorage.setItem('study_maps', JSONstudyMaps);
       } else if ( endpoint == 'messages' && !obj.link ) {
         let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
         parsedStudyMaps[cleaned_json.study_map]
           .breadcrumbs[cleaned_json.breadcrumb]
           .messages[cleaned_json._id] = cleaned_json;

         let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
         localStorage.setItem('study_maps', JSONstudyMaps);
       } else if ( endpoint == 'breadcrumbs/link') {
         let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
         parsedStudyMaps[cleaned_json.study_map]
           .links[cleaned_json.link]
           .breadcrumbs[cleaned_json._id] = cleaned_json;

         let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
         localStorage.setItem('study_maps', JSONstudyMaps);
       } else if ( endpoint == 'messages' && obj.link) {
         let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
         parsedStudyMaps[cleaned_json.study_map]
           .links[cleaned_json.link]
           .breadcrumbs[cleaned_json.breadcrumb]
           .messages[cleaned_json._id] = cleaned_json;

         let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
         localStorage.setItem('study_maps', JSONstudyMaps);
       }
      }

      if(endpoint == 'studymaps') {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps[cleaned_json._id] = cleaned_json;
        let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
        localStorage.setItem('study_maps', JSONstudyMaps);
      } else if ( endpoint == 'links/studymap') {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps[cleaned_json.study_map].links[cleaned_json._id] = cleaned_json;
        let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
        localStorage.setItem('study_maps', JSONstudyMaps);
      } else if ( endpoint == 'subjects' ) {
        let parsedSubjects = JSON.parse(localStorage.getItem('subjects'));
        parsedSubjects[cleaned_json._id] = cleaned_json;
        let JSONsubjects = JSON.stringify(parsedSubjects);
        localStorage.setItem('subjects', JSONsubjects);
      }

      return cleaned_json;
    }).catch(err => {throw err})
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated, method, formObj } = callAPI;

  const [ requestType, successType, errorType ] = types;
  store.dispatch(
    {
      type: requestType,
      method,
      datum: formObj
    }
);
  return callApi(endpoint, authenticated, method, formObj).then(
    response =>
      next({
        response,
        authenticated,
        type: successType,
        meta: {remote: true}
      }),
    error => next({
      error: error.error || 'There was an error.',
      type: errorType
    })
  )
}
