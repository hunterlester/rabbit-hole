const BASE_URL = `${location.protocol}//${location.hostname}:${location.port}/`;

function callApi(endpoint, authenticated, method, obj) {
  let token = localStorage.getItem('token') || null;
  let userId = localStorage.getItem('_id');
  let config = {};

  function configFactory(method, token, formObject) {
    if (formObject) {
      let body = Object.keys(formObject).map(key => {
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
      response.text().then(text => ({ text, response }))
    ).then(({ text, response }) => {
      if (!response.ok) {
        return Promise.reject(text)
      }
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
      } else if ( endpoint == 'messages' ) {
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
      }

      return text;
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
