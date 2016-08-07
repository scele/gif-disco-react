
function gif(state, action) {
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
              gif(state.gifs[action.id], action),
              ...state.gifs.slice(action.id + 1)
          ]
      };
    default:
      return state;
  }
}

export default function scenes(state = [], action) {
  switch (action.type) {
    case 'MOVE_DANCER':
      console.log('dragDancer action', action);
      return state.map(s => scene(s, action));
    default:
      return state;
  }
}