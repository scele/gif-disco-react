
const dirty = (sceneId, dirty) => ({
  type: 'SET_DIRTY',
  sceneId,
  dirty
});

export const moveDancer = (sceneId, dancerId, x, y, height) => (dispatch) => {
  dispatch({
    type: 'MOVE_DANCER',
    sceneId,
    dancerId,
    x,
    y,
    height
  });
  dispatch(dirty(sceneId, true));
};

export const addDancer = (sceneId) => (dispatch) => {
  dispatch({
    type: 'ADD_DANCER',
    sceneId,
  });
  dispatch(dirty(sceneId, true));
};

export const saveScene = (sceneId, scene) => (dispatch) => {
  fetch(`/api/scenes/${sceneId}`, {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(scene)
  }).then(checkStatus)
    .then(() => dispatch(dirty(sceneId, false)));
};

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
  fetch('/api/scenes', { headers: { 'Accept': 'application/json' } })
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