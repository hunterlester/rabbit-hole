import fetch from 'isomorphic-fetch'
import { fromJS } from 'immutable';
import cleanest from 'cleanest';
const BASE_URL = `${location.protocol}//${location.hostname}:${location.port}/`;

const parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));

export const initialStudyMaps = fromJS({
  isFetching: false,
  study_maps: parsedStudyMaps || {},
});

function callApi(endpoint, authenticated, method, obj) {
  let token = localStorage.getItem('token') || null;
  let userId = localStorage.getItem('_id');
  let config = {};

  function configFactory(method, token, formObject) {
    if (formObject) {
      let body = Object.keys(formObject).map(key => {
        if(key == 'keywords') {
          return formObject[key].map(keyword => {
            return key + '=' + keyword.trim();
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
        let body = Object.keys(formObject).map(key => {
          return key + '=' + formObject[key];
        }).join('&');

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

  if (authenticated) {
    if (token) {
      config = configFactory(method, token, obj);
    } else {
      throw "No token saved."
    }
  }

  return fetch(BASE_URL + endpoint, config)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json)
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
      }

      return cleaned_json;
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated, method, formObj } = callAPI;

  const [ requestType, successType, errorType ] = types;

  return callApi(endpoint, authenticated, method, formObj).then(
    response =>
      next({
        response,
        authenticated,
        type: requestType
      }),
    error => next({
      error: error.message || 'There was an error.',
      type: errorType
    })
  )
}
