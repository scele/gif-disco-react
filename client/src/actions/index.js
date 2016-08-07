
export const moveDancer = (id, x, y, height) => {
  return {
    type: 'MOVE_DANCER',
    id, x, y, height
  }
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.statusText;
    error.response = response;
    console.log(error); // eslint-disable-line no-console
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export const loadScenes = () => (dispatch) => {
  return fetch('/api/scenes', { headers: { 'Accept': 'application/json' } })
    .then(checkStatus)
    .then(parseJSON)
    .then(response => {
      console.log(response);
      return dispatch({
        type: 'LOAD_SCENES_SUCCESS',
        response
      });
    });
};