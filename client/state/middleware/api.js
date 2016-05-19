import fetch from 'isomorphic-fetch'
import { fromJS } from 'immutable';
import cleanest from 'cleanest';
const BASE_URL = `${location.protocol}//${location.hostname}:${location.port}/`;

const parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));

export const initialStudyMaps = fromJS({
  isFetching: false,
  study_maps: parsedStudyMaps || [],
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
      console.log(json);
      let cleaned_json = cleanest(json);

      if(endpoint == 'studymaps') {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps.push(JSON.parse(text));
        let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
        localStorage.setItem('study_maps', JSONstudyMaps);
      } else if ( endpoint == 'links/studymap') {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps.find(study_map => {
          if (JSON.parse(text).study_map == study_map._id) {
            study_map.links.push(JSON.parse(text));
          }
        });
        let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
        localStorage.setItem('study_maps', JSONstudyMaps);
      } else if ( endpoint == 'breadcrumbs/studymap') {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps.find(study_map => {
          if (JSON.parse(text).study_map == study_map._id) {
            study_map.breadcrumbs.push(JSON.parse(text));
          }
        });
        let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
        localStorage.setItem('study_maps', JSONstudyMaps);
      } else if ( endpoint == 'messages' && !obj.link ) {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps.find(study_map => {
          if (JSON.parse(text).study_map == study_map._id) {
            study_map.breadcrumbs.find(breadcrumb => {
              if(JSON.parse(text).breadcrumb == breadcrumb._id) {
                breadcrumb.messages.push(JSON.parse(text));
              }
            })
          }
        });
        let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
        localStorage.setItem('study_maps', JSONstudyMaps);
      } else if ( endpoint == 'breadcrumbs/link') {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps.find(study_map => {
          if (JSON.parse(text).study_map == study_map._id) {
            study_map.links.find(link => {
              if(JSON.parse(text).link == link._id) {
                link.breadcrumbs.push(JSON.parse(text));
              }
            })
          }
        });
        let JSONstudyMaps = JSON.stringify(parsedStudyMaps);
        localStorage.setItem('study_maps', JSONstudyMaps);
      } else if ( endpoint == 'messages' && obj.link) {
        let parsedStudyMaps = JSON.parse(localStorage.getItem('study_maps'));
        parsedStudyMaps.find(study_map => {
          if (JSON.parse(text).study_map == study_map._id) {
            study_map.links.find(link => {
              if(JSON.parse(text).link == link._id) {
                link.breadcrumbs.find(breadcrumb => {
                  if(JSON.parse(text).breadcrumb == breadcrumb._id) {
                    breadcrumb.messages.push(JSON.parse(text));
                  }
                })
              }
            })
          }
        });
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
