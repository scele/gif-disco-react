
const defaultDancer = {
  position: {
    left: 100,
    bottom: 100
  },
  height: 100
};

function dancer(state = defaultDancer, action) {
  switch (action.type) {
    case 'MOVE_DANCER':
      return {
        position: { left: action.x, bottom: action.y },
        height: action.height,
      };
    default:
      return state;
  }
}

function scene(state, action) {
  switch (action.type) {
    case 'MOVE_DANCER':
      return {
          ...state,
          gifs: [
              ...state.gifs.slice(0, action.id),
              dancer(state.gifs[action.id], action),
              ...state.gifs.slice(action.id + 1)
          ]
      };
    case 'ADD_DANCER':
      return {
        ...state,
        gifs: [
          ...state.gifs,
          defaultDancer
        ]
      };
    default:
      return state;
  }
}

export default function scenes(state = [], action) {
  switch (action.type) {
    case 'MOVE_DANCER':
    case 'ADD_DANCER':
      console.log('dragDancer action', action);
      return state.map(s => scene(s, action));
    case 'LOAD_SCENES_SUCCESS':
      return action.response;
    default:
      return state;
  }
}