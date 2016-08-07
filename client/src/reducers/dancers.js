export default function dancers(state = [], action) {
  switch (action.type) {
    case 'LOAD_DANCERS_SUCCESS':
      return action.response;
    default:
      return state;
  }
}