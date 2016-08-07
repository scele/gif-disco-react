
const defaultDancer = {
  position: {
    left: 0.5,
    top: 0.1
  },
  height: 0.2
};

function dancer(state = defaultDancer, action) {
  switch (action.type) {
    case 'MOVE_DANCER':
      return {
        position: { left: action.x, top: action.y },
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
              ...state.gifs.slice(0, action.dancerId),
              dancer(state.gifs[action.dancerId], action),
              ...state.gifs.slice(action.dancerId + 1)
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
    case 'SET_DIRTY':
      return {
        ...state,
        dirty: action.dirty
      };
    default:
      return state;
  }
}

export default function scenes(state = [], action) {
  switch (action.type) {
    case 'MOVE_DANCER':
    case 'ADD_DANCER':
    case 'SET_DIRTY':
      return state.map((s, i) => i.toString() === action.sceneId ? scene(s, action) : s);
    case 'LOAD_SCENES_SUCCESS':
      return action.response;
    default:
      return state;
  }
}