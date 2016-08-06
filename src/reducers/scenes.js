const initialState = [];

export default function scenes(state = initialState, action) {
  switch (action.type) {
    case 'MOVE_DANCER':
      console.log('dragDancer action', action);
      return state;
    default:
      return state;
  }
}