const BASE_URL = `${location.protocol}//${location.hostname}:${location.port}/`;

function callApi(entry, endpoint, authenticated) {
  let token = localStorage.getItem('token') || null;
  let userId = localStorage.getItem('_id');
  let config = {};

  if (authenticated) {
    if (token) {
      config = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type':'application/x-www-form-urlencoded'
        },
        body: `times_baby_awake=${entry.times_baby_awake}&completely_awake=${entry.completely_awake}&foods_drinks_consumed=${entry.foods_drinks_consumed}&supplements=${entry.supplements}&user=${userId}`
      };
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

  let { endpoint, types, authenticated, entry } = callAPI;

  const [ requestType, successType, errorType ] = types;

  return callApi(entry, endpoint, authenticated).then(
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
