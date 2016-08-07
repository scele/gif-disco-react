export const moveDancer = (id, x, y, height) => {
  return {
    type: 'MOVE_DANCER',
    id, x, y, height
  }
}