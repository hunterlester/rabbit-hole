const BASE_URL = `${location.protocol}//${location.hostname}:${location.port}/`;

function callApi(study_map, endpoint, authenticated, method) {
  let token = localStorage.getItem('token') || null;
  let userId = localStorage.getItem('_id');
  let config = {};

  function configFactory(formObject, method, token) {
    let body = Object.keys(formObject).map(key => {
      return key + '=' + formObject[key];
    }).join('&');
    
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
      config = configFactory(study_map, method, token);
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

      return text;
    }).catch(err => console.log(err))
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];

  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint, types, authenticated, study_map, method } = callAPI;

  const [ requestType, successType, errorType ] = types;

  return callApi(study_map, endpoint, authenticated, method).then(
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
